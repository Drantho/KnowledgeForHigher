
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
        }
    });

    Service.associate = (models) => {
        Service.belongsTo(models.User);
        Service.belongsToMany(models.Tag, { through: 'service_tags' })
    }

    return Service;
}