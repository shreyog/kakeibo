const { Schema, model, Types } = require("mongoose");

const IncomeSourceSchema = new Schema(
  {
    income_source: { type: String, required: true, default: "Fixed Source" },
    amount: { type: Number, required: true, default: 0 },
  },
  {
    _id: false,
    id: false,
  }
);

const MonthlyFixedExpenseSchema = new Schema(
  {
    transaction_name: { type: String, required: true },
    amount: { type: Number, required: true, default: 0 },
    transaction_date: { type: Date },
  },
  {
    _id: false,
    id: false,
    timestamps: true,
  }
);

const MonthlyBudgetSchema = new Schema(
  {
    user_id: { type: Types.ObjectId, ref: "User" },
    monthly_income: { type: Number, required: true },
    income_sources: { type: IncomeSourceSchema },
    monthly_fixed_expenses: { type: MonthlyFixedExpenseSchema },
    saving_goal: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const MonthlyBudget = model("MonthlyBudget", MonthlyBudgetSchema);

module.exports = MonthlyBudget;
