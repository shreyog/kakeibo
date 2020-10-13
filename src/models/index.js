const User = require("./User");
const MonthlyBudget = require("./MonthlyBudget");

const userModel = {
  name: "userModel",
  model: User,
};

const monthlyBudgetModel = {
  name: "monthlyBudgetModel",
  model: MonthlyBudget,
};

module.exports = { models: [userModel, monthlyBudgetModel] };
