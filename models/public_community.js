const Public_community = (Sequelize, DataTypes) => {
    const model = Sequelize.define(
        'public_community',{
            post_id: {
                type: DataTypes.INTEGER,
                autoIncrement:true,
                primaryKey:true,
                allowNull: false
            },
            title: {
                type: DataTypes.VARCHAR(100),
                allowNull: false,
            },
            content:{
                type: DataTypes.VARCHAR(200),
                allowNull: false,
            },
            image :{
                type: DataTypes.VARCHAR(100),
                allowNull: true,
            },
            serch: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        },{
            freezeTableName: true,
            timestamps: false
        }
    )
    return model;
}

module.exports = Public_community;