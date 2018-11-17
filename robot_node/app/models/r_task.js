module.exports = (sequelize, DataTypes) => {
    const r_task = sequelize.define('r_task', {
        TaskID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        TaskType: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        AGVName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "You must enter AGVName" }
            }
        },
        SourcePort: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "You must enter SourcePort" }
            }
        },
        DestPort: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "You must enter SourcePort" }
            }
        },
        IsRead: {
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

    return r_task;
};