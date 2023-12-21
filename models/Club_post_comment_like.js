const ClubPostCommentLike = (Sequelize, DataTypes) => {
  return Sequelize.define(
    "clubPostCommentLike",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      like_id: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      tableName: "clubPostCommentLike",
      freezeTableName: true,
      timestamps: false,
    }
  );
};

module.exports = ClubPostCommentLike;
