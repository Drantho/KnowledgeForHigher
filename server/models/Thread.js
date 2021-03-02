module.exports = (sequelize, Sequelize) => {

    const Thread = sequelize.define('Thread', {
        active: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    });

    Thread.associate = (models) => {
        Thread.belongsTo(models.User, { as: 'user1' });
        Thread.belongsTo(models.User, { as: 'user2' });
        Thread.hasMany(models.Message);
    }

    return Thread;
}