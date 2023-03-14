const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const expensesData = require("../expenses-data/expenses.json");

mongoose
  .connect("mongodb://127.0.0.1:27017/expense", {
    useNewUrlParser: true,
  })
  .then(() => console.log("conneted to DB"))
  .catch((err) => console.log(err));

const expenseSchema = new Schema({
  item: String,
  amount: Number,
  date: Date,
  group: String,
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
