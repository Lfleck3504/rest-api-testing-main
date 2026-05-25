/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.raw("CREATE SCHEMA IF NOT EXISTS molloyeats;");

  return knex.schema
    .withSchema("molloyeats")
    .createTable("menu", function(table) {
      table.increments("id");
      table.string("name").notNullable();
      table.string("description").nullable();
      table.decimal("price", 10, 2).notNullable();
    })
    .catch(function(error) {
      console.log(error);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  return knex.schema
    .withSchema("molloyeats")
    .dropTableIfExists("menu")
    .catch(function(error) {
      console.log(error);
    });
};