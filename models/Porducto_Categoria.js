module.exports = (sequelize, dataTypes) => {
  let alias = "Producto_Categoria";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_Producto: {
      type: dataTypes.INTEGER,
     },
    id_Categoria: {
      type: dataTypes.INTEGER,
    }
  };
  let config = {
    tableName: "Producto_Categoria",
    timestamps: false,
  };
  const Producto_Categoria = sequelize.define(alias, cols, config);
  return Producto_Categoria;
};