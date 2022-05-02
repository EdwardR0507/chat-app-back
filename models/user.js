const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  online: {
    type: Boolean,
    default: false,
  },
});

// Return without the version and the password because it's not necessary to show it to the user
UserSchema.methods.toJSON = function () {
  const { __v, _id, password, ...object } = this.toObject();
  // Reassign _id property to uid (user identifier)
  object.uid = _id;
  return object;
};

module.exports = model("User", UserSchema);
