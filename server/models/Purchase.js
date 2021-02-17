module.exports = function(sequelize, Sequelize){
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
    return Purchase;
}