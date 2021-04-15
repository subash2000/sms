//import modules and functions
const net = require("net");
const { check_recieved_crc } = require("./common/functions");
const currValues = require("./common/currVal");
const {
  settingsPacket,
  dataRequestProtocol,
} = require("./common/requestFunctions");
const Machine = require("./models/MachinesModel");
const Log = require("./models/LogModel");
const dataRequestInterval = 2000;
const connectionCheckInterval = 10000;
const { log } = require("./common/log");

//Socket Functions to handle induvidual machines
const socketFunc = (socket, address, packet) => {
  let dataInterval;
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
    if (Date.now() - currValues[address].recieved > 10000) {
      currValues[address].socket.destroy();
      if (dataInterval) clearInterval(dataInterval);
    }
  }, connectionCheckInterval);

  socket.write(Buffer.from(packet, "hex"), (err) => {
    if (err) {
      console.log("Error at sending settings packet => " + address + " " + err);
      log("Error at sending settings packet", address);
    } else {
      console.log("settngs sent", packet);
      log(
        "Settngs sent \t" +
          JSON.stringify(Buffer.from(packet, "hex").toJSON().data)
      );
    }
  });
  socket.on("error", () => {
    console.log("Error occured =>", address);
  });
  socket.on("data", (d) => {
    console.log("Recieved =>" + address);
    log(`Packet recieved \t${JSON.stringify(d.toJSON().data)}`, address);

    console.log("Packet recieved : ", d.toJSON());

    let data = d.toJSON(),
      mode = data.data[3].toString(16);
    if (mode == "22") {
      console.log("Settings set successfully =>" + address);
      log(`Settings set \t `, address);
    }
    if (mode == "22" || mode == "23") {
      setTimeout(
        () => {
          dataRequestProtocol(currValues[address].id, (error, dataPacket) => {
            if (!error) {
              log(
                "Data Request packet sent \t" +
                  JSON.stringify(Buffer.from(dataPacket, "hex").toJSON().data),
                address
              );
              socket.write(Buffer.from(dataPacket, "hex"), (err) => {
                if (err) {
                  console.log(
                    "Error at sending data packet => " + address + " " + err
                  );
                  log(`Error Sending  data packet`, address);
                }
              });
            }
          });
        },
        mode === "22" ? 5000 : dataRequestInterval
      );
    }
    if (mode == "23" && check_recieved_crc(d.toString("hex"))) {
      currValues[address].data = d;
      currValues[address].recieved = Date.now();
      let shift = data.data[9];
      let currDate = new Date();
      currDate.setDate(data.data[6]);
      let dateOnly = currDate.toDateString();

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
            ip: address,
            shift,
          },
        },
        {
          upsert: true,
        }
      )
        .then(() => {
          Machine.updateOne(
            {
              ip: address,
            },
            {
              $set: {
                recieved: Date.now(),
                data: data.data,
                shift,
              },
            }
          )
            .then(() => {
              console.log("updated");
              log(`DB updated`, address);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => console.log(err));
    } else if (!check_recieved_crc(d.toString("hex"))) {
      console.log("CRC not matching ", d.toString("hex"));
      log("CRC not matching " + JSON.stringify(d.toJSON().data), address);
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
};

const handleConnection = (socket) => {
  let address;
  if (net.isIPv6(socket.remoteAddress))
    address = socket.remoteAddress.substr(7);
  else address = socket.remoteAddress;
  console.log("Connected to =>", address);
  log("Module Connected", address);
  let id = address.substr(address.lastIndexOf(".") + 1);
  currValues[address] = {
    ...currValues[address],
    ip: address,
    id: id,
  };

  settingsPacket(address, (packet, err) => {
    if (err) {
      console.log("Error in settings  packet " + err.msg + " " + address);
      log("Error in settings  packet " + err.msg, address);
      socket.destroy();
      return;
    } else {
      socketFunc(socket, address, packet);
    }
  });
};

//Start Server
const start = () => {
  let server = net.createServer((socket) => {
    handleConnection(socket);
  });
  server.listen(6000, () => console.log("Server started and listening"));

  server.on("error", () => {
    console.log("Error at server");
  });

  server.on("close", () => {
    console.log("Server Closed");
  });
};

const restartAll = () => {
  Object.keys(currValues).map((ip) => {
    if (currValues[ip] && currValues[ip].socket) {
      currValues[ip].socket.destroy();
    }
  });
};

const restart = (department, machine) => {
  Machine.findOne({
    department,
    machine,
  })
    .then((res) => {
      if (res && res.ip && currValues[res.ip] && currValues[res.ip].socket) {
        currValues[res.ip].socket.destroy();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  start,
  restart,
  restartAll,
};
