const PublicPost = (Sequelize, DataTypes) => {
    const model = Sequelize.define(
        'publicPost',{
            post_id: {
                type: DataTypes.INTEGER,
                primaryKey:true,
                allowNull: false,
                autoIncrement: true
            },
            date:{
                type: DateTypes.VARCHAR(20),
                allowNull: false,
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
            views: {
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

module.exports = PublicPost;