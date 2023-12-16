const ClubMembers = (Sequelize, DataTypes) => {
  return Sequelize.define(
    "clubMembers",
    {
      motivation: {
        type: DataTypes.STRING(400),
        allowNull: false,
      },
      introduction: {
        type: DataTypes.STRING(400),
        allowNull: false,
      },
    },
    {
      tableName: "clubMembers",
      freezeTableName: true,
      timestamp: false,
    }
  );
};

module.exports = ClubMembers;
