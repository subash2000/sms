const net = require("net");
const { check_recieved_crc } = require("./common/functions");
const currValues = require("./common/currVal");
const {
  settingsPacket,
  dataRequestProtocol,
} = require("./common/requestFunctions");
const connectionCheckInterval = 5000;
const Machine = require("./models/MachinesModel");
const Log = require("./models/LogModel");

class Socket {
  constructor() {
    this.server = net.createServer((socket) => this.handleConnection(socket));
  }
  startServer() {
    this.server.listen(6000, () =>
      console.log("Server Listening at port 6000")
    );
  }
  restartServer() {
    Object.keys(currValues).map((ip) => {
      if (currValues[ip] && currValues[ip].socket) {
        currValues[ip].socket.destroy();
      }
    });
    this.server.close((err) => {
      if (err) console.log("Can't close server");
      else {
        console.log("Server Closed");
        console.log("Restarting Server ... ");
        this.startServer();
      }
    });
  }
  restartModule(ip) {
    if (currValues[ip] && currValues[ip].socket) {
      currValues[ip].socket.destroy();
    }
  }
  restartAll() {
    Object.keys(currValues).map((ip) => {
      if (currValues[ip] && currValues[ip].socket) {
        currValues[ip].socket.destroy();
      }
    });
  }

  handleConnection(socket) {
    let address = this.getAddress(socket);
    console.log("Connected to => ", address);
    this.dbCheck(address, socket);
  }
  getAddress(socket) {
    let address = socket.remoteAddress;
    if (net.isIPv6(address)) return address.substr(7);
    return address;
  }
  dbCheck(address, socket) {
    Machine.findOne({
      ip: address,
    })
      .then((result) => {
        if (!result) {
          console.log("Connected ip not found in db");
          return;
        } else {
          currValues[address] = {
            ...currValues[address],
            ip: result.ip,
            machine: result.machine,
            id: result.id,
          };
          settingsPacket(result.ip, (packet, err) => {
            if (err) {
              console.log(
                "Error in settings  packet " + err.msg + " " + address
              );
              socket.destroy();
              return;
            } else {
              this.dataTransfer(socket, address, packet);
            }
          });
        }
      })
      .catch((err) => {
        console.log("Could not find ip in DB");
        return;
      });
  }
  dataTransfer(socket, address, packet) {
    let obj = {
      socket,
      recieved: Date.now(),
      connection: true,
    };
    currValues[address] = {
      ...currValues[address],
      ...obj,
    };
    let interval = setInterval(() => {
      console.log(currValues[address].connection);
      if (Date.now() - currValues[address].recieved > 3000) {
        currValues[address].socket.destroy();
      }
    }, connectionCheckInterval);
    socket.write(Buffer.from(packet, "hex"), (err) => {
      if (err) {
        console.log(
          "Error at sending settings packet => " + address + " " + err
        );
      } else console.log("settngs sent", packet);
    });
    socket.on("error", () => {
      console.log("Error occured =>", address);
    });
    socket.on("data", (d) => {
      console.log("Recieved =>" + address);
      currValues[address].recieved = Date.now();
      let data = d.toJSON(),
        mode = data.data[3].toString(16);
      if (mode == "22") {
        console.log("Settings set successfully =>" + address);
      }
      if (mode == "22" || mode == "23") {
        socket.write(
          Buffer.from(dataRequestProtocol(currValues[address].id), "hex"),
          (err) => {
            if (err) {
              console.log(
                "Error at sending data packet => " + address + " " + err
              );
            }
          }
        );
      }
      if (mode == "23" && check_recieved_crc(d.toString("hex"))) {
        currValues[address].data = d;
        let shift = data.data[9];
        let dateOnly = new Date().toDateString();
        Log.updateOne(
          {
            ip: address,
            date: dateOnly,
            shift,
          },
          {
            $set: {
              date: dateOnly,
              data: data.data,
              shift,
            },
          },
          {
            upsert: true,
          }
        )
          .then(() => {
            console.log("updated");
          })
          .catch((err) => console.log(err));
      } else if (!check_recieved_crc(d.toString("hex"))) {
        console.log("CRC not matching");
      }
    });
    socket.on("end", () => {
      console.log("Ended " + address);
    });
    socket.on("close", () => {
      clearInterval(interval);
      currValues[address].connection = false;
      console.log("closed ");
    });
  }
}

module.exports = {
  Socket,
};
