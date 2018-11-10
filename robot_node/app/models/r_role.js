module.exports = (sequelize, DataTypes) => {
    const r_role = sequelize.define('r_role', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        roleInfo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        roleName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    // TodoItem.associate = (models) => {
    //     TodoItem.belongsTo(models.Todo, {
    //         foreignKey: 'todoId',
    //         onDelete: 'CASCADE',
    //     });
    // };

    return r_role;
};