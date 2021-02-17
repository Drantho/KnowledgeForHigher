module.exports = function(sequelize, Sequelize){
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
    return Rating;
}