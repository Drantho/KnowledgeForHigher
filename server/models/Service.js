
module.exports = (sequelize, DataTypes) => {
    const Service = sequelize.define('Service', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: [1] }
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        price: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Service.associate = (models) => {
        Service.belongsTo(models.User);
        Service.belongsToMany(models.Tag, { through: 'service_tags' });
        Service.hasMany(models.Rating);
        Service.hasMany(models.Comment);
        Service.hasMany(models.Purchase);
    }

    return Service;
}