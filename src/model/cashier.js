// const User = require("./user").default;
import User from "./user";
// const cashier = require("./cashier");
// const session = require("express-session");

class Cashier extends User {
  // eslint-disable-next-line class-methods-use-this
  debit(accNum, accData, cashier, amount) {
    const found = accData.find(acc => acc.accNumber === accNum);
    // console.log(found);

    if (!found) return false;

    if (found.Balance < amount) {
      found.Balance = found.Balance;
    } else {
      found.Balance -= amount;
    }

    return {
      ...found,
      cashier,
      transactionType: "debit",
      transactionId: Math.floor(Math.random() * 1000000)
    };
  }

  // eslint-disable-next-line class-methods-use-this
  credit(accNum, accData, cashier, amount) {
    const found = accData.find(acc => acc.accNumber === accNum);

    if (!found) return false;

    found.Balance += amount;
    return {
      ...found,
      cashier,
      transactionType: "credit",
      transactionId: Math.floor(Math.random() * 1000000)
    };
  }
}

// module.exports = Cashier;
export default Cashier;
