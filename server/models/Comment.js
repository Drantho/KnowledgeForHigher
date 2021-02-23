
module.exports = function (sequelize, DataTypes) {
    var Comment = sequelize.define("Comment", {
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM(['question', 'answer', 'service'])
        }
    });

    Comment.associate = (models) => {
        Comment.belongsTo(models.User);
        Comment.belongsTo(models.Question);
        Comment.belongsTo(models.Answer);
        Comment.belongsTo(models.Service);
    };
    return Comment;
};
