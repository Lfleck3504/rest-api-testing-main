const Menu = require("../models/menu");

class MenuServices {
  async getMenu(name = "") {
    return await Menu.query()
      .select("name", "price", "description")
      .where("name", "ilike", `%${name}%`)
      .orWhere("description", "ilike", `%${name}%`);
  }

  async addItem(name, price, description) {
    const existingItem = await Menu.query()
      .whereRaw("LOWER(name) = LOWER(?)", [name])
      .first();

    if (!existingItem) {
      return await Menu.query().insert({
        name: name,
        price: price,
        description: description
      });
    }

    return false;
  }
  async removeItem(name) {
  return await Menu.query()
    .delete()
    .whereRaw("LOWER(name) = LOWER(?)", [name]);
}
}

module.exports = new MenuServices();
















