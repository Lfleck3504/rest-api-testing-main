const fs = require("fs");
const path = require("path");

exports.seed = async function(knex) {
  const filePath = path.join(__dirname, "menu.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const menuData = JSON.parse(fileContents);

  await knex("molloyeats.menu").del();

  return knex("molloyeats.menu")
    .insert(menuData)
    .catch(function(error) {
      console.log(error);
    });
};