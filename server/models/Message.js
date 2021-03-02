module.exports = (sequelize, Sequelize) => {

    const Message = sequelize.define('Message', {
        body: Sequelize.STRING,
        viewed: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    });

    Message.associate = models => {
        Message.belongsTo(models.User, { as: 'sender' });
        Message.belongsTo(models.User, { as: 'recipient' });
        Message.belongsTo(models.Thread);
    }

    return Message;
}