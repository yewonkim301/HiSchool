const Sequelize = require('sequelize');
const config = require(__dirname + "/../config/config.js")[env];

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./User")(sequelize, Sequelize);
db.Public_post = require("./Public_post")(sequelize, Sequelize);
db.Public_post_comment = require("./Public_post_comment")(sequelize,Sequelize);
db.Public_post_cooment_like = require("./Public_post_comment_like")(sequelize,Sequelize);
db.Dm = require("./Dm")(sequelize, Sequelize);

db.Club = require("./Club")(sequelize, Sequelize);
db.Club_schedule = require("./Club_schedule")(sequelize, Sequelize);
db.Club_post = require("./Club_post")(sequelize, Sequelize);
db.Club_post_comment = require("./Club_post_comment")(sequelize, Sequelize);
db.Club_post_comment_like = require("./Club_post_comment_like")(sequelize,Sequelize);
db.Club_chat = require("./Club_chat")(sequelize, Sequelize);

module.exports = db;
