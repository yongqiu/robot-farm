module.exports = (sequelize, DataTypes) => {
  const r_task = sequelize.define('r_task', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: DataTypes.INTEGER,
    },
    frameNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: "You must enter frameNumber" }
      }
    },
    gutterNumber: {
      type: DataTypes.STRING(50),
    },
    plateNumber: {
      type: DataTypes.STRING(50),
    },
    vegetable: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "You must enter vegetable" }
      }
    },
    status: {
      type: DataTypes.INTEGER,
    },
    createdAt: {
      type: DataTypes.INTEGER
    },
    updatedAt: {
      type: DataTypes.INTEGER
    },
    direction: {
      type: DataTypes.INTEGER,
    },
    isFinished: {
      type: DataTypes.INTEGER,
    },
    isActive: {
      type: DataTypes.INTEGER,
    },
    taskGroupId: {
      type: DataTypes.INTEGER,
    }
  });

  r_task.associate = (models) => {
    r_task.belongsTo(models.r_frame, { foreignKey: 'frameNumber', targetKey: 'id' });
  };

  return r_task;
};