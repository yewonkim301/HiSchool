const ClubPostComment = (Sequelize, DataTypes) => {
  return Sequelize.define(
    "clubPostComment",
    {
      comment_id: {
        type: Datatypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      date: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      like_num: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "clubPostComment",
      freezeTableName: true,
      timestamp: false,
    }
  );
};

module.exports = ClubPostComment;
