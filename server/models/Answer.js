module.exports = (sequelize, Sequelize) => {
    const Answer = sequelize.define("Answer", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        text: {
            type: Sequelize.TEXT
        },
        isAnswer: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    });

    Answer.associate = models => {
        Answer.belongsTo(models.Question);
        Answer.belongsTo(models.User);
        Answer.hasMany(models.Comment);
        Answer.hasMany(models.Rating);
    }
    return Answer;
}