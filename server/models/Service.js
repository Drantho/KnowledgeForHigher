
module.exports = (sequelize, DataTypes) => {
    const Service = sequelize.define('Service', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: [1] }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        price: {
            type: DataTypes.DECIMAL,
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