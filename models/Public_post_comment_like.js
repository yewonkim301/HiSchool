const PublicPostCommentLike = (Sequelize, DataTypes) => {
    const model = Sequelize.define(
        "publicPostCommentLike",
        {
            is_like: {
                type: DataTypes.STRING(10),
                allowNull: false,
            },
        },
        {
            freezeTableName: true,
            timestamp: false,
        }
    )
    return model;
};

module.exports = PublicPostCommentLike;
