const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });
  if (!account) {
    return res.status(411).json({
      message: "No account found",
    });
  }
  res.json({
    balance: account.balance,
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { to, amount } = req.body;

    // Fetch the accounts within the transaction
    const fromAccount = await Account.findOne({ userId: req.userId }).session(
      session
    );

    if (!fromAccount || fromAccount.balance < amount) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        message: "Invalid account",
      });
    }

    // Perform transfer
    await Account.updateOne(
      { userId: req.userId },
      {
        $inc: {
          balance: -amount,
        },
      }
    ).session(session);

    await Account.updateOne(
      { userId: to },
      {
        $inc: {
          balance: amount,
        },
      }
    ).session(session);

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: "Transfer successful",
    });
  } catch (error) {
      await session.abortTransaction();
      session.endSession();
      res.status(500).json({
        message: "Internal server error",
      });
  }
});

module.exports = router;
