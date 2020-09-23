'use strict';

const schema = require('./users-schema.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
/**
 * users module
 */
class Users {
  constructor() {
    this.schema = schema;
  }

  /**
   * get a user by atribute
   * @param {*} username
   */
  get(username) {
    let name = username ? { username } : {};
    return this.schema.find(name);
  }

  /**
   * create new user and hash it is password before adding it to database
   * @param {object} record
   */
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

  /**
   * check if the user exist
   * @param {object} record
   */
  async authenticateBasic(record) {
    let result = await this.get(record.username);
    let user = result[0];
    if (user) {
      let valid = await bcrypt.compare(record.password, user.password);
      let returnValue = valid ? user : Promise.reject();
      return returnValue;
    }
    return Promise.reject();
  }

  /**
   * check if the user authenticated
   * @param {string} token
   */
  async authenticateToken(token) {
    try {
      let tokenObject = jwt.verify(token, process.env.SECRET);
      let result = await this.get(tokenObject.username);
      let user = result[0];
      if (user) {
        return Promise.resolve(tokenObject);
      } else {
        return Promise.reject();
      }
    } catch (e) {
      return Promise.reject();
    }
  }
  /**
   * generate a token to be stored in the client side
   * @param {object} record
   */
  generateToken(record) {
    let token = jwt.sign(
      { username: record.username, role: record.role },
      process.env.SECRET,
    );
    return token;
  }

  /**
   * check if the user has the permission
   * @param {string} role 
   * @param {string} action 
   */
  hasPermission(role, action) {
    let actions = {
      regular: ['readOwn'],
      writer: ['read', 'create'],
      editor: ['read', 'create', 'update'],
      admin: ['read','create', 'update', 'delete'],
    };

    return actions[role].includes(action);
  }
}

module.exports = new Users();
