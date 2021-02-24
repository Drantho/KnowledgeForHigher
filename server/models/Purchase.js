module.exports = (sequelize, Sequelize) => {
    const Purchase = sequelize.define("Purchase", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        stripeInfo: {
            type: Sequelize.STRING
        }
    });

    Purchase.associate = models => {
        Purchase.belongsToMany(models.User, { through: 'user_purchases' });
        Purchase.hasOne(models.Service);
    }
    return Purchase;
}