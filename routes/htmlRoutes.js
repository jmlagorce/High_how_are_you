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
      res.render("search", { strain_card: responses[0], order: responses[1] });
    });
  });
  // Filters search page by variable
  // Filter by mood *not currently used*
  app.get("/product/mood/:mood", function(req, res) {});
  // Filter by type
  app.get("/product/type/:type", function(req, res) {
    const all_products = db.Product.findAll({
      where: {
        type: req.params.type
      }
    });
    const checkout = db.Purchase.findAll({});
    Promise.all([all_products, checkout]).then(responses => {
      res.render("search", { strain_card: responses[0], order: responses[1] });
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
  // Loads checkout page
  app.get("/checkout", function(req, res) {
    const all_checkout = db.Purchase.findAll({});
    const total_price = db.Purchase.sum("total");
    Promise.all([all_checkout, total_price]).then(responses => {
      res.render("checkout", { purchased: responses[0], total: responses[1] });
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
    const current_orders = db.Order.findAll({});
    Promise.all([all_inventory, low_inventory, current_orders]).then(
      responses => {
        res.render("admin", {
          strain: responses[0],
          lowstrain: responses[1],
          order: responses[2]
        });
      }
    );
  });
  
   app.get("/blog", function(req, res) {
    res.render("blog");
  });
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
 
};
