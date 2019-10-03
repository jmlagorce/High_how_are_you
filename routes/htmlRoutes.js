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
    db.Product.findAll({}).then(function(results) {
      res.render("search");
    });
  });
  // Filters search page by variable
  // Filter by mood
  app.get("/product/mood/:mood", function(req, res) {
    db.Product.findAll({
      where: {
        mood: req.params.mood
      }
    }).then(function(results) {
      res.render("search");
    });
  });
  // Filter by type
  app.get("/product/type/:type", function(req, res) {
    db.Product.findAll({
      where: {
        race: req.params.type
      }
    }).then(function(results) {
      res.render("search");
    });
  });
  // Filter by name
  app.get("/product/name/:name", function(req, res) {
    db.Product.findAll({
      where: {
        name: req.params.name
      }
    }).then(function(results) {
      res.render("search");
    });
  });

  // Example Product Route. Will expand once tables have been created with data.
  app.get("/product/:id", function(req, res) {
    db.Product.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(results) {
      res.render("product")
    });
  });
  // Loads checkout page
  app.get("/checkout", function(req, res) {
    db.Purchase.findAll({}).then(function(results) {
      res.render("checkout", {purchased: results});
    });
  });
  // Loads admin page
  app.get("/admin", function(req, res) {
    const Op = Sequelize.Op;
    const all_inventory = db.Product.findAll({});
    const low_inventory = db.Product.findAll({
      where: {
        stock: {
          [Op.lte]: 5
        }
      }
    });
    Promise.all([all_inventory, low_inventory]).then(responses => {
      res.render("admin", { strain: responses[0], lowstrain: responses[1]});
    });
  });
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
  app.get("/blog", function(req, res) {
    res.render("example");
  });
};
