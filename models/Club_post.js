const ClubPost = (Sequelize, DataTypes) => {
  return Sequelize.define(
    "clubPost",
    {
      post_id: {
        // clubPostComment 테이블과 1:다 연결 -> 게시글 하나에 댓글 여러개
        type: Datatypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      post_userid: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    },
    {
      tableName: "clubPost",
      freezeTableName: true,
      timestamp: false,
    }
  );
};

module.exports = ClubPost;
