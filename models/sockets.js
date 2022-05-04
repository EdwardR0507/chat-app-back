const { userLoggedIn, userLoggedOut } = require("../controllers/sockets");
const { checkJWT } = require("../utils/utils");

class Sockets {
  constructor(io) {
    this.io = io;
    this.socketEvents();
  }
  socketEvents() {
    // On connection
    this.io.on("connection", async (socket) => {
      const [valid, uid] = checkJWT(socket.handshake.query.token);
      if (!valid) {
        console.log("Invalid token");
        return socket.disconnect(true);
      }
      await userLoggedIn(uid);

      socket.on("disconnect", async () => {
        await userLoggedOut(uid);
      });
    });
  }
}
module.exports = Sockets;
