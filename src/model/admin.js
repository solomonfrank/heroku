// const User = require("./user");
import User from './user';
import { usersAccount } from './database';

class Admin extends User {
  // eslint-disable-next-line class-methods-use-this
  deleteAcc(acc, accArray) {
    // eslint-disable-next-line no-console

    const found = accArray.find(user => user.accNumber === acc);
    // let found = accArray.indexOf(acc)
    /* if(found === -1){
        return false;
    }else{
        let found = accArray.filter(user => user.accNumber !== acc);
        return found;
    }

    */
    if (!found) {
      return false;
    }
    // return accArray.filter(user => user.accNumber !== acc);
    const index = accArray.indexOf(found);
    return accArray.splice(index, 1);
  }

  // eslint-disable-next-line class-methods-use-this
  activateAcc(acc, accountArr) {
    const found = accountArr.find(user => user.accNumber === acc);
    if (!found) return false;

    if (found.status === 'dormant') {
      found.status = 'active';
    } else if (found.status === 'active') {
      found.status = 'dormant';
    }

    return found;
  }

  // eslint-disable-next-line class-methods-use-this
  findOne(acc, accArray) {
    const result = accArray.find(user => user.accNumber === acc);

    if (!result) return false;

    return result;
  }

  // eslint-disable-next-line class-methods-use-this
  findAll() {
    if (!usersAccount) return false;

    return usersAccount;
  }
}

//
// module.exports = Admin;
export default Admin;
