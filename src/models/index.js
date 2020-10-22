const User = require("./user.model");
const Budget = require("./budget.model");
const Expense = require("./expense.model");
const Token = require("./token.model");

const userModel = {
  name: "userModel",
  model: User,
};

const budgetModel = {
  name: "budgetModel",
  model: Budget,
};

const expenseModel = {
  name: "expenseModel",
  model: Expense,
};

const tokenModel = {
  name: "tokenModel",
  model: Token,
};

module.exports = { models: [userModel, budgetModel, expenseModel, tokenModel] };
