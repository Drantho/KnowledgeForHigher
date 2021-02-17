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
        }
    });

    User.associate = (models) => {
        User.hasMany(models.Comment);
        User.hasMany(models.Question);
        User.hasMany(models.Answer);
        User.hasMany(models.Rating);
        User.hasMany(models.Service);
        User.hasMany(models.Purchase);
        User.belongsToMany(models.Tags, { through: 'following' });
    }
    return User;
}