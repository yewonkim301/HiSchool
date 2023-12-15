const ClubPostCommentLike = (Sequelize, DataTypes) => {
  return Sequelize.define(
    "clubPostCommentLike",
    {
      is_like: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
    },
    {
      tableName: "clubPostCommentLike",
      freezeTableName: true,
      timestamp: false,
    }
  );
};

module.exports = ClubPostCommentLike;
