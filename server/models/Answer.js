module.exports = function(sequelize, Sequelize){
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
        },
        date: {
            type: Sequelize.DATEONLY,
            defaultValue: new Date()
        }
    });
    return Answer;
}