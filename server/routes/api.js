const express = require("express");
const router = express.Router();
const Expense = require("../../model/expense");
const moment = require("moment");

router.get("/expenses", function (req, res) {
  let d1 = req.query.d1;
  let d2 = req.query.d2;
  if (d1 && d2) {
    d1 = moment(d1).format("LLLL");
    d2 = moment(d2).format("LLLL");
    Expense.find({
      $and: [{ date: { $gt: d1 } }, { date: { $lt: d2 } }],
    })
      .sort({ date: -1 })
      .then(function (expenses) {
        res.send(expenses);
      });
  } else if (d1 || d2) {
    let d = d1 ? d1 : d2;
    d = moment(d).format("LLLL");
    Expense.find({ date: { $gt: d } })
      .sort({ date: -1 })
      .then(function (expenses) {
        res.send(expenses);
      });
  } else {
    Expense.find({})
      .sort({ date: -1 })
      .then(function (expense) {
        res.send(expense);
      });
  }
});

router.post("/expenses", function (req, res) {
  let item = req.body.item;
  let amount = req.body.amount;
  let date = req.body.date;
  date ? moment(date).format("LLLL") : (date = new moment().format("LLLL"));
  let group = req.body.group;

  let expense = new Expense({
    item: item,
    amount: amount,
    date: date,
    group: group,
  });

  res.send(expense);
  expense.save().then(function (expense) {
    console.log(`I had spent ${amount} ${item} on ${group}`);
  });
});

router.put("/update", function (req, res) {
  Expense.findOneAndUpdate(
    { group: req.body.group1 },
    { group: req.body.group2 },
    { new: true }
  ).then(function (expense) {
    res.send(expense);
  });
});

router.get("/expenses/:group", function (req, res) {
  let group = req.params.group;
  let total = req.query.total;

  //   Expense.find({ group: group }).then(function (expense) {
  //     res.send(expense);
  //   });
  if (total === "true") {
    Expense.aggregate([
      { $match: { group: group } },

      { $group: { _id: "$group", totalmoney: { $sum: "$amount" } } },
    ]).then(function (expense) {
      res.send(expense);
    });
  }
});

module.exports = router;
