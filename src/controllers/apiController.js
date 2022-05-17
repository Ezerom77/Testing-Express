const db = require("../../models");
const sequelize = require("sequelize");

const apiController = {
  index: (req, res) => {
    res.status(200).json({
      status: 200,
      message: "API funcionando correctamente",
    });
  },
  usersCount: (req, res) => {
    db.Users.findOne({
      attributes: [[sequelize.fn("COUNT", sequelize.col("id")), "count"]],
      raw: true,
    }).then((users) => {
      res.status(200).json({
        status: 200,
        message: "Users count",
        url: "api/usersCount",
        data: users.count,
      });
    });
  },
  lastUser: (req, res) => {
    db.Users.findOne({ order: [["id", "DESC"]] }).then((user) => {
      res.status(200).json({
        status: 200,
        message: "Last user",
        url: "api/lastUser",
        data: user,
      });
    });
  },
  productsCount: (req, res) => {
    db.Products.findOne({
      attributes: [[sequelize.fn("COUNT", sequelize.col("id")), "count"]],
      raw: true,
    })
    .then((products) => {
      res.status(200).json({
        status: 200,
        message: "Products count",
        url: "api/productCount",
        data: products.count,
      });
    });
  },
  lastProduct: (req, res) => {
    db.Products.findOne({ order: [["id", "DESC"]] }).then((products) => {
      res.status(200).json({
        status: 200,
        message: "Last product",
        url: "api/lastProduct",
        data: products,
      });
    });
  },
};

module.exports = apiController;
