var db = require("../models");

module.exports = function(app) {
  // ======================== Product API Routes ========================
  // Get all products
  app.get("/api/products", function(req, res) {
    db.Product.findAll({}).then(function(results) {
      res.json(results);
    });
  });
  // By Id
  app.get("/api/products/id/:id", function(req, res) {
    db.Product.findOne({ where: { id: req.params.id } }).then(function(
      results
    ) {
      res.json(results);
    });
  });
  // By Name
  app.get("/api/products/name/:name", function(req, res) {
    db.Product.findOne({ where: { name: req.params.name } }).then(function(
      results
    ) {
      res.json(results);
    });
  });
  // Get By Mood
  app.get("/api/products/mood/:mood", function(req, res) {
    db.Product.findAll({ where: { mood: req.params.mood } }).then(function(
      results
    ) {
      res.json(results);
    });
  });
  // Get By Race
  app.get("/api/products/type/:type", function(req, res) {
    db.Product.findAll({ where: { type: req.params.type } }).then(function(
      results
    ) {
      res.json(results);
    });
  });
  // Create a new product
  app.post("/api/products", function(req, res) {
    db.Product.create(req.body).then(function(results) {
      res.json(results);
    });
  });
  // Update product inventory
  app.put("/api/products/update/:id", function(req, res) {
    db.Product.update(
      { stock: req.body.stock },
      { where: { id: req.params.id } }
    ).then(function(results) {
      res.json(results);
    });
  });
  // Delete a product by id
  app.delete("/api/products/remove/:id", function(req, res) {
    db.Product.destroy({ where: { id: req.params.id } }).then(function(
      results
    ) {
      res.json(results);
    });
  });
  // ======================== User API routes ========================
  //Pull user by name
  app.get("/api/users/:username", function(req, res) {
    db.User.findOne({ where: { userName: req.params.username } }).then(function(
      results
    ) {
      res.json(results);
    });
  });
  //Pull all users for user name compairison
  app.get("/api/users", function(req, res) {
    db.User.findAll({ attributes: ["userName"] }).then(function(results) {
      res.json(results);
    });
  });
  // Add New User
  app.post("/api/users", function(req, res) {
    db.User.create(req.body).then(function(results) {
      res.json(results);
    });
  });
  // ======================== Checkout API Routes ========================
  // Get all items in checkout
  app.get("/api/checkout", function(req, res) {
    db.Purchase.findAll({}).then(function(results) {
      res.json(results);
    });
  });
  // Add item to checkout
  app.post("/api/checkout", function(req, res) {
    db.Purchase.create(req.body).then(function(results) {
      res.json(results);
    });
  });
  // Delete all items in checkout
  app.delete("/api/checkout/all", function(req, res) {
    db.Purchase.destroy({
      where: {},
      truncate: true
    }).then(function(results) {
      res.json(results);
    });
  });
  // ======================== Current Orders API Routes ========================
  // See All Orders
  app.get("/api/orders", function(req, res) {
    db.Order.findAll({}).then(function(results) {
      res.json(results);
    });
  });
  // Add New Orders
  app.post("/api/orders", function(req, res) {
    db.Order.create(req.body).then(function(results) {
      res.json(results);
    });
  });
  // Delete Order
  app.delete("/api/orders/:id", function(req, res) {
    db.Order.destroy({ where: { id: req.params.id } }).then(function(results) {
      res.json(results);
    });
  });
};
