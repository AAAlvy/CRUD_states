//filling (seeding) data into migration (which is outline)

const state = require('../states');


exports.seed = function(knex, Promise) {
  return knex('state').del()
    .then(function () {
      return knex('state').insert(state);
    });
};
