module.exports = (sequelize, dataTypes) => {
  let alias = "Talles";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descripcion: {
      type: dataTypes.STRING(45),
    }
  };
  let config = {
    tableName: "Talle",
    timestamps: false,
  };
  const Talle = sequelize.define(alias, cols, config);

  Talle.associate = function (models) {
    Talle.hasMany(models.Products, {
      as: "talle",
      foreignKey: "id_talle",
    });
  };
  return Talle;
};