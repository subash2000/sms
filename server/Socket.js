// //import modules and functions
// const net = require("net");
// const { check_recieved_crc } = require("./common/functions");
const currValues = require("./common/currVal");
// const {
//   settingsPacket,
//   dataRequestProtocol,
// } = require("./common/requestFunctions");
// const connectionCheckInterval = 5000;
// const Machine = require("./models/MachinesModel");
// const Log = require("./models/LogModel");

// //Socket Functions to handle induvidual machines
// const socketFunc = (socket, address, packet) => {
//   let obj = {
//     socket,
//     recieved: Date.now(),
//     connection: true,
//   };
//   currValues[address] = {
//     ...currValues[address],
//     ...obj,
//   };
//   let interval = setInterval(() => {
//     console.log(currValues[address].connection);
//     if (Date.now() - currValues[address].recieved > 3000) {
//       currValues[address].socket.destroy();
//     }
//   }, connectionCheckInterval);
//   socket.write(Buffer.from(packet, "hex"), (err) => {
//     if (err) {
//       console.log("Error at sending settings packet => " + address + " " + err);
//     } else console.log("settngs sent", packet);
//   });
//   socket.on("error", () => {
//     console.log("Error occured =>", address);
//   });
//   socket.on("data", (d) => {
//     console.log("Recieved =>" + address);
//     currValues[address].recieved = Date.now();
//     let data = d.toJSON(),
//       mode = data.data[3].toString(16);
//     if (mode == "22") {
//       console.log("Settings set successfully =>" + address);
//     }
//     if (mode == "22" || mode == "23") {
//       socket.write(
//         Buffer.from(dataRequestProtocol(currValues[address].id), "hex"),
//         (err) => {
//           if (err) {
//             console.log(
//               "Error at sending data packet => " + address + " " + err
//             );
//           }
//         }
//       );
//     }
//     if (mode == "23" && check_recieved_crc(d.toString("hex"))) {
//       currValues[address].data = d;
//       let shift = data.data[9];
//       let dateOnly = new Date().toDateString();
//       Log.updateOne(
//         {
//           ip: address,
//           date: dateOnly,
//           shift,
//         },
//         {
//           $set: {
//             date: dateOnly,
//             data: data.data,
//             shift,
//           },
//         },
//         {
//           upsert: true,
//         }
//       )
//         .then(() => {
//           console.log("updated");
//         })
//         .catch((err) => console.log(err));
//     } else if (!check_recieved_crc(d.toString("hex"))) {
//       console.log("CRC not matching");
//     }
//   });
//   socket.on("end", () => {
//     console.log("Ended " + address);
//   });
//   socket.on("close", () => {
//     clearInterval(interval);
//     currValues[address].connection = false;
//     console.log("closed ");
//   });
// };

// //Start Server
// const start = () => {
//   let server = net.createServer((socket) => {
//     let address;
//     if (net.isIPv6(socket.remoteAddress))
//       address = socket.remoteAddress.substr(7);
//     else address = socket.remoteAddress;
//     console.log("Connected to =>", address);
//     Machine.findOne({
//       ip: address,
//     })
//       .then((result) => {
//         if (!result) {
//           console.log("Connected ip not found in db");
//           return;
//         } else {
//           currValues[address] = {
//             ...currValues[address],
//             ip: result.ip,
//             machine: result.machine,
//             id: result.id,
//           };

//           settingsPacket(result.ip, (packet, err) => {
//             if (err) {
//               console.log(
//                 "Error in settings  packet " + err.msg + " " + address
//               );
//               socket.destroy();
//               return;
//             } else {
//               socketFunc(socket, address, packet);
//             }
//           });
//         }
//       })
//       .catch((err) => {
//         console.log("Could not find ip in DB");
//         return;
//       });
//   });
//   server.listen(6000, () => console.log("Server started and listening"));
//   server.on("error", () => {
//     console.log("Error at server");
//   });
//   server.on("close", () => {
//     console.log("Server Closed");
//   });
// };

const { Socket } = require("./SocketClass");
const socket = new Socket();

const start = () => {
  socket.startServer();
};

const restartAll = () => {
  socket.restartAll();
};

const restart = (ip) => {
  socket.restartModule(ip);
};
const restartServer = () => {
  socket.restartServer();
};
module.exports = {
  start,
  restart,
  restartAll,
  restartServer,
};
