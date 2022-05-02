const Message = require("../models/message");
const getChat = async (req, res) => {
  try {
    const id = req.uid;
    const { from } = req.params;
    const last30Messages = await Message.find({
      $or: [
        { from: id, to: from },
        { from, to: id },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(30);

    res.status(200).json({
      ok: true,
      msg: "Messages retrieved successfully",
      data: last30Messages,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error in the server",
    });
  }
};
module.exports = { getChat };
