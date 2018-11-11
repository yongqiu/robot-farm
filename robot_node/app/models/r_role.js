module.exports = (sequelize, DataTypes) => {
    const r_role = sequelize.define('r_role', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        roleInfo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        roleName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "You must enter roleInfo" }
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

    r_role.associate = (models) => {
        r_role.hasOne(models.r_user, { foreignKey: 'role' });
    };

    return r_role;
};