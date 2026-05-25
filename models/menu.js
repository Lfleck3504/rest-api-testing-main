const { Model } = require("objection");
const Knex = require("knex");
const knexConfig = require("../knexfile");

const knex = Knex(knexConfig.development);

Model.knex(knex);

class Menu extends Model {
  static get tableName() {
    return "molloyeats.menu";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "price"],

      properties: {
        id: { type: "integer" },
        name: { type: "string" },
        description: { type: ["string", "null"] },
        price: { type: ["number", "string"] }
      }
    };
  }
}

module.exports = Menu;