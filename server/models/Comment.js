const { Sequelize } = require(".");

module.exports = function (sequelize, DataTypes) {
    var Comment = sequelize.define("Comment", {
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });

    Comment.associate = (models) => {
        Comment.belongsTo(models.User);
        Comment.belongsTo(models.Question);
    };
    return Comment;
};
