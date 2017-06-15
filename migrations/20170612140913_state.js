//setting up DB schema

exports.up = function(knex, Promise) {
  return knex.schema.createTable('state', (table) => {
    table.increments();
    table.text('name');
    table.date('visit_year');
    table.text('capital');
    table.integer('population');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('state');
};
