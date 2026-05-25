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
  },

  {
    method: "POST",
    path: "/menu/add",
    options: {
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          price: Joi.number().required(),
          description: Joi.string().optional().allow(null, "")
        })
      }
    },
    handler: function(request, h) {
      return menuController.addItem(request);
    }
  }
];