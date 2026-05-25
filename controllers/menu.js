const menuService = require("../services/menu");

class MenuController {
  async getMenu(request) {
    const name = request.query.name;

    const result = await menuService.getMenu(name);

    return JSON.stringify(result);
  }

  async addItem(request) {
    const { name, price, description } = request.payload;

    try {
      const result = await menuService.addItem(name, price, description);

      if (result !== false) {
        return JSON.stringify(result);
      }

      return JSON.stringify({
        error: "There is already a menu item with that name."
      });
    } catch (error) {
      return JSON.stringify({
        error: error.message
      });
    }
  }
  async removeItem(request) {
  const { name } = request.payload;

  try {
    const result = await menuService.removeItem(name);

    if (result > 0) {
      return JSON.stringify({
        message: `${result} row(s) removed.`
      });
    }

    return JSON.stringify({
      error: "A menu item with that name does not exist."
    });
  } catch (error) {
    return JSON.stringify({
      error: error.message
    });
  }
}
}

module.exports = new MenuController();