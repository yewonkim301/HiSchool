const Club = (Sequelize, DataTypes) => {
  return Sequelize.define(
    "club",
    {
      club_id: {
        // clubPost 테이블과 1:다 연결 -> 동아리 하나에 게시글 여러 개
        // clubSchedule 테이블과 1:다 연결 -> 동아리 하나에 일정 여러 개
        // clubChat 테이블과 1:다 연결 -> 동아리 하나에 채팅글 여러 개
        type: Datatypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      club_name: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      limit: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      field: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      keyword: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    },
    {
      tableName: "club",
      freezeTableName: true,
      timestamp: false,
    }
  );
};

module.exports = Club;
