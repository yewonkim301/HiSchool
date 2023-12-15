const Sequelize = require("sequelize");
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

db.user = require("./user")(sequelize, Sequelize);
db.public_community = require("./public-community")(sequelize, Sequelize);
db.public_community_post = require("./public_community_post")(
  sequelize,
  Sequelize
);
db.public_community_like = require("./public_community_like")(
  sequelize,
  Sequelize
);
db.public_community_comment = require("./public_community_comment")(
  sequelize,
  Sequelize
);
db.dm = require("./dm")(sequelize, Sequelize);

db.Club = require("./Club")(sequelize, Sequelize);
db.Club_schedule = require("./Club_schedule")(sequelize, Sequelize);
db.Club_post = require("./Club_post")(sequelize, Sequelize);
db.Club_post_comment = require("./Club_post_comment")(sequelize, Sequelize);
db.Club_post_comment_like = require("./Club_post_comment_like")(
  sequelize,
  Sequelize
);
db.Club_chat = require("./Club_chat")(sequelize, Sequelize);

module.exports = db;
