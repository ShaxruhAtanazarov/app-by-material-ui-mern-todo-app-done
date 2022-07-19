// importing dependencies
const { Schema, model, Types } = require("mongoose");
// ===------------------------------------------

const schema = new Schema({
  username: { type: "string", required: true },
  email: { type: "string", required: true, unique: true },
  password: { type: "string", required: true },
  todos: [{ type: Types.ObjectId, ref: "Todo" }],
});

module.exports = model("User", schema);
