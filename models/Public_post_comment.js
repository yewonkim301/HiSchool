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
                type: DataTypes.VARCHAR(200),
                allowNull: false,
            },
            data:{
                type: DataTypes.VARCHAR(20),
                allowNull: false,
            },
            like_num:{
                type: DataTypes.VARCHAR(20),
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