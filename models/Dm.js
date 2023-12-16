const Dm = (Sequelize, DataTypes) => {
    const model = Sequelize.define(
        "dm",
        {
            note_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey:true,
            },
            to_nickname:{
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            dm_content:{
                type: DataTypes.STRING(200),
                allowNull: true
            }
        },
        {
            freezeTableName: true,
            timestamp: false,
        }
    )
    return model;
};

module.exports = Dm;

