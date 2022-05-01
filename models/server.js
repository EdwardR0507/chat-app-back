const express = require("express");
const { createServer } = require("http");
const socket = require("socket.io");
const path = require("path");
const cors = require("cors");
const Sockets = require("./sockets");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.httpServer = createServer(this.app);
    this.io = new socket.Server(this.httpServer, {
      /* options */
    });
  }
  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, "../public")));
    this.app.use(cors());
  }

  configSockets() {
    new Sockets(this.io);
  }

  execute() {
    // Initialize middlewares
    this.middlewares();

    // Initialize sockets
    this.configSockets();

    // Start the server
    this.httpServer.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

module.exports = Server;
