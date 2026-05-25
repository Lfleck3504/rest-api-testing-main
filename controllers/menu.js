const menuService = require("../services/menu");

class MenuController {
  async getMenu(request) {
    const name = request.query.name;

    const result = await menuService.getMenu(name);

    return JSON.stringify(result);
  }
}

module.exports = new MenuController();