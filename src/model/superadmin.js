/* eslint-disable no-else-return */
// const User = require("./user");
import User from "./user";
// const Admin = require("./admin");
import Admin from "./admin";

class Superadmin extends Admin {
  static addStaff(firstName, lastName, password, email, type, isAdmin) {
    const staff = new User(firstName, lastName, password, email, type, isAdmin);
    const lastInserted = staff.save();
    return lastInserted;
  }

  // eslint-disable-next-line class-methods-use-this
  deleteAcc(acc, accArray) {
    const found = accArray.indexOf(acc);
    if (found === -1) {
      return false;
    } else {
      const foundacc = accArray.filter(user => user.accNumber !== acc);
      return foundacc;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  activateAcc(acc, accountArr) {
    const found = accountArr.find(user => user.accNumber === acc);
    if (!found) return false;

    if (found.status === "dormant") {
      found.status = "active";
    } else if (found.status === "active") {
      found.status = "dormant";
    }

    return found;
  }

  // eslint-disable-next-line class-methods-use-this
  findOne(acc, accArray) {
    const found = accArray.indexOf(acc);
    if (found === -1) {
      return false;
    } else {
      const foundacc = accArray.find(user => user.accNumber === acc);
      return foundacc;
    }
  }
}

// module.exports = Superadmin;
export default Superadmin;
