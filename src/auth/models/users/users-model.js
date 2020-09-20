'use strict';

const schema = require('./users-schema.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = 'AbdallahSafi';

class Users {
  constructor() {
    this.schema = schema;
  }

  get(username) {
    let name = username ? { username } : {};
    return this.schema.find(name);
  }

  async create(record) {
    let user = await this.get(record.username);
    if (user.length === 0) {
      // Hash the password and save it to the user
      record.password = await bcrypt.hash(record.password, 5);
      // Create a new user
      let newRecord = new this.schema(record);
      return newRecord.save();
    }
    return Promise.reject('user exist!');
  }

  async authenticateBasic(record) {
    if (this.get(record.username)) {
      let valid = await bcrypt.compare(
        record.password,
        this.get(record.username).password,
      );
      let returnValue = valid ? this.get(record.username) : Promise.reject();
      return returnValue;
    }
    return Promise.reject();
  }

  generateToken(record) {
    let token = jwt.sign({ username: record.username }, SECRET);
    return token;
  }
}

module.exports = new Users();
