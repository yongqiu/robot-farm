module.exports = (sequelize, DataTypes) => {
  const r_agvInfo = sequelize.define('r_agvInfo', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    AgvName: {
      type: DataTypes.STRING(50)
    },
    RackNumBer: {
      type: DataTypes.STRING(50)
    },
    Rfid: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    Speed: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    Voltage: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    Status: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    RunStatus: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    BatteryNum: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    Alarm: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    RunTimes: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.INTEGER.UNSIGNED
    }
  });


  return r_agvInfo;
};