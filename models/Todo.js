// importing dependencies
const { Schema, model, Types } = require("mongoose");
// ===------------------------------------------

const schema = new Schema({
  owner: { type: Types.ObjectId, ref: "User" },
  text: { type: String },
  isComplated: false,
  created_at: { type: Date, default: Date.now },
});

module.exports = model("Todo", schema);
