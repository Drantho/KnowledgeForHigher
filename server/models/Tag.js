
module.exports = (sequelize, DataTypes) => {
    const Tag = sequelize.define('Tag', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: { len: [1] }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    });

    Tag.associate = (models) => {
        Tag.belongsToMany( models.User,     { through: 'following' });
        Tag.belongsToMany( models.Service,  { through: 'service_tags' });
        Tag.belongsToMany( models.Question, { through: 'question_tags' })
    }

    return Tag;
}