const ClubPost = (Sequelize, DataTypes) => {
  return Sequelize.define(
    "clubPost",
    {
      post_id: {
        type: Datatypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
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
