module.exports = (sequelize, DataTypes) => {
  const r_task = sequelize.define('r_task', {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Type: {
      type: DataTypes.INTEGER,
    },
    FrameNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "You must enter frameNumber" }
      }
    },
    GutterNumber: {
      type: DataTypes.STRING(50),
    },
    PlateNumber: {
      type: DataTypes.STRING(50),
    },
    Vegetable: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "You must enter vegetable" }
      }
    },
    Status: {
      type: DataTypes.INTEGER,
    },
    CreatedAt: {
      type: DataTypes.INTEGER
    },
    UpdatedAt: {
      type: DataTypes.INTEGER
    },
    Direction: {
      type: DataTypes.INTEGER,
    },
    IsFinished: {
      type: DataTypes.INTEGER,
    },
    IsActive: {
      type: DataTypes.INTEGER,
    },
    TaskGroupId: {
      type: DataTypes.INTEGER,
    }
  });

  r_task.associate = (models) => {
    r_task.belongsTo(models.r_frame, { foreignKey: 'frameNumber', targetKey: 'id' });
  };

  return r_task;
};