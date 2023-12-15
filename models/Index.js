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

db.club_community = require("./club_community")(sequelize, Sequelize);
db.club_community_post = require("./club_community_post")(sequelize, Sequelize);
db.club_community_like = require("./club_community_like")(sequelize, Sequelize);
db.club_community_comment = require("./club_community_comment")(
  sequelize,
  Sequelize
);

db.dm = require("./dm")(sequelize, Sequelize);
db.schedule = require("./schedule")(sequelize, Sequelize);

module.exports = db;
