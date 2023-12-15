const ClubChat = (Sequelize, DataTypes) => {
  return Sequelize.define(
    "clubChat",
    {
      chats_id: {
        type: Datatypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      date: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      form_id: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    },
    {
      tableName: "clubChat",
      freezeTableName: true,
      timestamp: false,
    }
  );
};

module.exports = ClubChat;
