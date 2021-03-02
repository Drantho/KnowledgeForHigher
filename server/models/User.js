const bcrypt = require("bcrypt");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
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
            allowNull: false,
            unique: true
        },
        userName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        isProfessional: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        stripeInfo: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'active'
        },
        portrait:{
            type: Sequelize.STRING,
            defaultValue: "/assets/images/profilesample.png"
        }
    });

    User.associate = (models) => {
        User.hasMany(models.Comment);
        User.hasMany(models.Question);
        User.hasMany(models.Answer);
        User.hasMany(models.Rating);
        User.hasMany(models.Service);
        User.hasMany(models.Purchase);
        User.hasMany(models.Message, { as: 'user1' })
        User.hasMany(models.Message, { as: 'user2' });
        User.hasMany(models.Thread, {as: 'threadUser1'});
        User.hasMany(models.Thread, {as: 'threadUser2'});
        User.belongsToMany(models.Tag, { through: 'following' });
    }

    User.beforeCreate(function (user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null)
    })

    return User;
}