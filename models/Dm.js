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
            from_id:{
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            to_id:{
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            dm_date:{
                type: Sequelize.DATE,
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

