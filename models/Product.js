module.exports = (sequelize, dataTypes) => {
  let alias = "Products";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: dataTypes.STRING(100),
    },
    id_color: {
      type: dataTypes.INTEGER,
    },
    id_talle: {
      type: dataTypes.INTEGER,
    },
    id_transaccion: {
      type: dataTypes.INTEGER,
      allowNull: true,
    },
    id_vendedor: {
      type: dataTypes.INTEGER,
    },
    descripcion: {
      type: dataTypes.STRING(500),
    },
    precio: {
      type: dataTypes.DECIMAL(10, 2), //ajuste este campo en la DB
    },
    fecha_creacion: {
      type: dataTypes.DATE,
    },
    ultima_edicion: {
      type: dataTypes.DATE,
    },
    fecha_baja: {
      type: dataTypes.DATE,
      allowNull: true,
    },
    imagen: {
      type: dataTypes.STRING(150),
    }
  };
  let config = {
    tableName: "Producto",
    timestamps: false,
    onDelete: 'CASCADE'
  };
  const Product = sequelize.define(alias, cols, config);
  Product.associate = function (models) {
    Product.belongsTo(models.Colores, {
      as: "color",
      foreignKey: "id_color"
    });
    Product.belongsTo(models.Talles, {
      as: "talle",
      foreignKey: "id_talle"
    });
    Product.belongsTo(models.Transacciones, {
      as: "transaccion",
      foreignKey: "id_transaccion"
    });
    Product.belongsTo(models.Users, {
      as: "vendedor",
      foreignKey: "id_vendedor"
    });
    Product.belongsToMany(models.Categorias, {
      as: "categorias",
      through: "Producto_Categoria",
      foreignKey: "id_Producto",
      otherKey: "id_Categoria",
      timestamps: false
    });
    Product.hasMany(models.imagenProducto, {
      as: "imagenes",
      foreignKey: "id_Producto",
      timestamps: false
    });
  };
  return Product;
};
