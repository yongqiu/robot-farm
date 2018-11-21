module.exports = (sequelize, DataTypes) => {
  const r_frame = sequelize.define('r_frame', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    colNumber: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    colLow: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    colHigh: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    rowNumber: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    rowLow: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    rowHigh: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    stopAgv1: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    stopAgv2: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    stopWait: {
      type: DataTypes.INTEGER,
      allowNull: true
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

  return r_frame;
};