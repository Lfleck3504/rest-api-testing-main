module.exports = [
  {
    method: "GET",
    path: "/",
    handler: function(request, h) {
      return {
        message: "MolloyEats API is running",
        endpoints: [
          "GET /menu",
          "GET /menu?name=fruit",
          "POST /menu/add",
          "DELETE /menu/remove",
          "PUT /menu/update"
        ]
      };
    }
  }
];