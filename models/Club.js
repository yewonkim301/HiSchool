const Club = (Sequelize, DataTypes) => {
  return Sequelize.define(
    "club",
    {
      club_id: {
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
