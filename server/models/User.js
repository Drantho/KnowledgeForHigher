module.exports = function(sequelize, Sequelize){
    const User = sequelize.define("user", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        userName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'active'
        }
    });
    return User;
}