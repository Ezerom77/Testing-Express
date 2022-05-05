module.exports = (sequelize, dataTypes) => {
  let alias = "Transacciones";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fecha_compra: {
      type: dataTypes.DATE,   
    },
    id_comprador: {
      type: dataTypes.INTEGER,
    },
    precio_total: {
      type: dataTypes.DECIMAL(10, 2), //ajuste este campo en la DB
    }
  };
  let config = {
    tableName: "Producto",
    timestamps: false,
  };
  const Transaccion = sequelize.define(alias, cols, config);
  return Transaccion;
};
