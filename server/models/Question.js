const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define('Question', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: [1] }
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    });

    Question.associate = (models) => {
        Question.belongsTo(models.User);
        Question.belongsToMany(models.Tag, { through: 'question_tags' });
    }
}