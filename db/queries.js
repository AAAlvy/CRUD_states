//defining what you want to be queried(to get out of DB)

const knex = require('./knex'); //the connection

module.exports = {
  getAll() {
    return knex('state');
  },
  getOne(id) {                    //returns one row
    return knex('state').where('id', id).first();
   },
  create(state) {
    return knex('state').insert(state, '*');   //returns all the props of a state
  },
  update(id, state) {
    return knex('state').where('id', id).update(state);
  },
  delete(id) {
    return knex('state').where('id', id).del();
  }
};
