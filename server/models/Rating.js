module.exports = (sequelize, Sequelize) => {
    const Rating = sequelize.define("Rating", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        type: {
            type: Sequelize.ENUM('Question', 'Answer', 'Service'),
            allowNull: false
        },
        isPositive: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    });

    Rating.associate = models => {
        Rating.belongsTo(models.Question);
        Rating.belongsTo(models.Comment);
        Rating.belongsTo(models.Service);
    }
    return Rating;
}