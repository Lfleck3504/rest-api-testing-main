const Joi = require("@hapi/joi");
const menuController = require("../controllers/menu");

module.exports = [
  {
    method: "GET",
    path: "/menu",
    options: {
      validate: {
        query: Joi.object({
          name: Joi.string().optional()
        })
      }
    },
    handler: function(request, h) {
      return menuController.getMenu(request);
    }
  }
];