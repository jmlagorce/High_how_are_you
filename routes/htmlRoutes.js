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
    const all_products = db.Product.findAll({});
    const checkout = db.Purchase.findAll({});
    Promise.all([all_products, checkout]).then(responses => {
      res.render("search", {strain_card: responses[0], order: responses[1]});
    });
  });
  // Filters search page by variable
  // Filter by mood
  app.get("/product/mood/:mood", function(req, res) {
    
  });
  // Filter by type
  app.get("/product/type/:type", function(req, res) {
    const all_products = db.Product.findAll({
      where: {
        type: req.params.type
      }
    });
    const checkout = db.Purchase.findAll({});
    Promise.all([all_products, checkout]).then(responses => {
      res.render("search", {strain_card: responses[0], order: responses[1]});
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
  // app.get("/product/id/:id", function(req, res) {
  //   db.Product.findOne({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(results) {
  //     res.render("product")
  //   });
  // });
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
          [Op.lte]: 28
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
    res.render("blog");
  });
};
