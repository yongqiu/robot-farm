module.exports = (sequelize, DataTypes) => {
  const r_user = sequelize.define('r_user', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "You must enter role" }
      }
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "You must enter userName" }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "You must enter password" }
      }
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.INTEGER
    },
    updatedAt: {
      type: DataTypes.INTEGER
    }
  });

  r_user.associate = (models) => {
    r_user.belongsTo(models.r_role, { foreignKey: 'role', targetKey: 'id' });
  };
  return r_user;
};