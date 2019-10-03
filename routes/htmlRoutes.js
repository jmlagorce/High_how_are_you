var db = require("../models");
var Sequelize = require("sequelize");

module.exports = function(app) {
  const Op = Sequelize.Op;
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });
  // Loads search page
  app.get("/product", function(req, res) {
    res.render("search");
  });
  // Example Product Route. Will expand once tables have been created with data.
  app.get("/product/:id", function(req, res) {
    res.render("product");
  });
  // Loads checkout page
  app.get("/checkout", function(req, res) {
    res.render("checkout");
  });
  // Loads admin page
  app.get("/admin", function(req, res) {
    db.Product.findAll({}).then(function(results) {
      res.render("admin", { strain: results });
    })
  });
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
  app.get("/blog", function(req, res) {
    res.render("example");
  });
};
