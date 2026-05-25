const Menu = require("../models/menu");

class MenuServices {
  async getMenu(name = "") {
    return await Menu.query()
      .select("name", "price", "description")
      .where("name", "ilike", `%${name}%`)
      .orWhere("description", "ilike", `%${name}%`);
  }
}

module.exports = new MenuServices();const Menu = require("../models/menu");

class MenuServices {
  async getMenu(name = "") {
    return await Menu.query()
      .select("name", "price", "description")
      .where("name", "ilike", `%${name}%`)
      .orWhere("description", "ilike", `%${name}%`);
  }
}

module.exports = new MenuServices();