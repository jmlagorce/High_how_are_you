var db = require("../models");

module.exports = function(app) {
  // Get all products
  app.get("/api/products", function(req, res) {
    db.Product.findAll({}).then(function(results) {
      res.json(results);
    });
  });
  // Get Specific Product
  // By Name
  app.get('/api/products/name/:name', function(req, res) {
    db.Product.findOne({where: {name: req.params.name} }).then(function(results) {
      res.json(results);
    });
  });
  // Get By Mood
  app.get('/api/products/mood/:mood', function(req, res) {
    db.Product.findAll({where: {mood: req.params.mood} }).then(function(results) {
      res.json(results);
    });
  });
  // Get By Race
  app.get('/api/products/race/:race', function(req, res) {
    db.Product.findAll({where: {race: req.params.race}}).then(function(results) {
      res.json(results);
    });
  });
  // Create a new example
  app.post("/api/products", function(req, res) {
    db.Product.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
