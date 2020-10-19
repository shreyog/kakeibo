const { model, Schema } = require("mongoose");
const { v5: uuidv5 } = require("uuid");
const { userTypes, status } = require("../constants");

const { GUEST, USER } = userTypes;
const { ACTIVE } = status;

const UserSchema = new Schema(
  {
    id: { type: String, default: uuidv5 },
    full_name: { type: String },
    user_name: { type: String, required: true, unique: true },
    dob: { type: Date },
    gender: { type: String },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      index: true,
    },
    password: { type: String, minlength: 6, required: true },
    user_type: {
      type: String,
      enum: [GUEST, USER],
      required: true,
      default: USER,
    },
    status: { type: Boolean, default: ACTIVE },
  },
  { timestamps: true }
);

const User = model("User", UserSchema);

module.exports = User;
