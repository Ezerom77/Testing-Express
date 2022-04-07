module.exports = (sequelize, dataTypes) => {
  let alias = "Users";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: dataTypes.STRING(45),
    },
    apellido: {
      type: dataTypes.STRING(100),
    },
    email: {
      type: dataTypes.STRING(45),
    },
    avatar: {
      type: dataTypes.STRING(100),
    },
    password: {
      type: dataTypes.STRING(100),
    },
    admin: {
      type: dataTypes.TINYINT,
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
    }
  };
  let config = {
    tableName: "Usuario",
    timestamps: false,
  };
  const User = sequelize.define(alias, cols, config);
  return User;
};