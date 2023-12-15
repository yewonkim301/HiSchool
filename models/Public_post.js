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
                type: DateTypes.STRING(20),
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            content:{
                type: DataTypes.STRING(200),
                allowNull: false,
            },
            image :{
                type: DataTypes.STRING(100),
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