const User = require("./User");
const Budget = require("./Budget");
const Expense = require("./Expense");

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

module.exports = { models: [userModel, budgetModel] };
