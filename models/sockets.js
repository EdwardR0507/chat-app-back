const {
  userLoggedIn,
  userLoggedOut,
  getUsers,
} = require("../controllers/sockets");
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
        return socket.disconnect();
      }
      await userLoggedIn(uid);

      // Emit all users include the current user
      this.io.emit("users-list", await getUsers());

      socket.on("disconnect", async () => {
        await userLoggedOut(uid);
        // Refresh users list after logout
        this.io.emit("users-list", await getUsers());
      });
    });
  }
}
module.exports = Sockets;
