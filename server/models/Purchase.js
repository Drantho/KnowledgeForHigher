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
        Purchase.belongsTo(models.User);
        Purchase.belongsTo(models.Service);
    }
    return Purchase;
}