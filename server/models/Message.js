module.exports = (sequelize, Sequelize) => {

    const Message = sequelize.define('Message', {
        body: Sequelize.STRING,
        viewed: Sequelize.BOOLEAN
    });

    Message.associate = models => {
        Message.belongsTo(models.User, { as: 'sender' });
        Message.belongsTo(models.User, { as: 'recipient' });
        Message.hasOne(models.Message);
        Message.belongsTo(models.Message, { as: 'replyTo' });
    }

    return Message;
}