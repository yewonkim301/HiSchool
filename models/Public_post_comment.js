const PublicPostComment = (Sequelize, DataTypes) => {
    const model = Sequelize.define(
        "publicPostComment",{
            comment_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            comment:{
                type: DataTypes.STRING(200),
                allowNull: false,
            },
            data:{
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            like_num:{
                type: DataTypes.STRING(20),
                allowNull: false,
            }
        },
        {
            freezeTableName: true,
            timestamps: false
        }
    )
    return model;
}
module.exports = PublicPostComment;