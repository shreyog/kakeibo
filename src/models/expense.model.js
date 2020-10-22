const { model, Schema, Types } = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const { tags } = require("../constants");

const { WANTS } = tags;

const ExpenseSchema = new Schema(
  {
    transaction_name: { type: String },
    tag: { type: String, default: WANTS },
    date: { type: Date },
    user_id: { type: Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// add plugin that converts mongoose to json
ExpenseSchema.plugin(toJSON);
ExpenseSchema.plugin(paginate);

const Expense = model("Expense", ExpenseSchema);

module.exports = Expense;
