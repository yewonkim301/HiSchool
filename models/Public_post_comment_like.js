const PublicPostCommentLike = (Sequelize, DataTypes) => {
  const model = Sequelize.define(
    "publicPostCommentLike",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      likeid_num: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamp: false,
    }
  );
  return model;
};

module.exports = PublicPostCommentLike;
