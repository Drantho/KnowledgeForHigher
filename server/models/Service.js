
module.exports = (sequelize, DataTypes) => {
    const Service = sequelize.define('Service', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: { len: [1] }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        active: {
            type: DataTypes.BOOLEAN,
            default: true
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
    }

    return Service;
}