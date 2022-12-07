const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      get: avatarGenerator,
    },
    role: {
      type: String,
      default: "USER",
    },
  },
  { timestamps: true, toJSON: { getters: true } }
);

function avatarGenerator(avatar) {
  if (avatar) return `${process.env.BASE_URL}/avatar`;
  return `https://ui-avatars.com/api/?name=${this._doc.name
    .split(" ")
    .join("+")}?background=random`;
}

module.exports = mongoose.model("User", UserSchema);
