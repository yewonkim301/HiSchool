const ClubPostComment = (Sequelize, DataTypes) => {
  return Sequelize.define(
    "clubPostComment",
    {
      comment_id: {
        // clubPostCommentLike table  1:다 연결
        // -> 좋아요 누른 사람 아이디 모두 저장해서 테이블에 아이디가 있으면 아이디 지우고 없으면 추가하는 방식
        type: Datatypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      date: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      comment_userid: {
        type: DataTypes.STRING(200),
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
