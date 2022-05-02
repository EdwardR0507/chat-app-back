const { Schema, model } = require("mongoose");

const MessageSchema = Schema(
  {
    from: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Add createdAt and updatedAt fields
  }
);

// Return without the version  because it's not necessary to show it to the user
MessageSchema.methods.toJSON = function () {
  const { __v, ...object } = this.toObject();
  return object;
};

module.exports = model("Message", MessageSchema);
