const { Schema, model, Types } = require("mongoose");
const { toJSON, paginate } = require("./plugins");

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

const WeeklyBudgetSchema = new Schema(
  {
    weekly_budget_amount: { type: Number, default: 0 },
    start_date: { type: Date },
    end_date: { type: Date },
    notes: { type: String },
  },
  {
    timestamps: true,
  }
);

const BudgetSchema = new Schema(
  {
    user_id: { type: Types.ObjectId, ref: "User" },
    monthly_income: { type: Number, required: true },
    income_sources: { type: IncomeSourceSchema },
    monthly_fixed_expenses: { type: MonthlyFixedExpenseSchema },
    saving_goal: { type: Number, required: true },
    weekly_budget: { type: [WeeklyBudgetSchema] },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
BudgetSchema.plugin(toJSON);
BudgetSchema.plugin(paginate);

const Budget = model("Budget", BudgetSchema);

module.exports = Budget;
