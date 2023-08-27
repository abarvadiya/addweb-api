const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  expiredTime: {
    type: Date,
  },
});

module.exports = mongoose.model("Token", tokenSchema);
