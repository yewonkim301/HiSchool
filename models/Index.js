const Sequelize = require("sequelize");
const config = require(__dirname + "/../config/config.js")['development'];

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const User = require("./User")(sequelize, Sequelize);
const Public_post = require("./Public_post")(sequelize, Sequelize);
const Public_post_comment = require("./Public_post_comment")(sequelize, Sequelize);
const Public_post_comment_like = require("./Public_post_comment_like")(
  sequelize,
  Sequelize
);
const Dm = require("./Dm")(sequelize, Sequelize);

const Club = require("./Club")(sequelize, Sequelize);
const Club_members = require("./Club_members")(sequelize, Sequelize);
const Club_members_wait = require("./Club_members_wait")(sequelize, Sequelize);
const Club_schedule = require("./Club_schedule")(sequelize, Sequelize);
const Club_post = require("./Club_post")(sequelize, Sequelize);
const Club_post_comment = require("./Club_post_comment")(sequelize, Sequelize);
const Club_post_comment_like = require("./Club_post_comment_like")(
  sequelize,
  Sequelize
);
const Club_chat = require('./Club_chat')(sequelize, Sequelize);

// User DM = > 1:N
User.hasMany(DM,{
  foreingKey: 'userid_num',

  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
DM.belongsTo(User,{
  foreingKey: 'userid_num'
});

// User Pubic_Post => 1:N
User.hasMany(Public_post, {
  foreingKey: 'userid_num',

  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'

});
Public_post.belongsTo(User,{
  foreingKey: 'userid_num'
});

// User C_members => 1:N
User.hasMany(Club_members_wait,{
  foreingKey: 'userid_num',

  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Club_members_wait.belongsTo(User,{
  foreingKey: 'userid_num'
});

Club_members_wait.hasOne(Club_members,{
  foreingKey: 'club_id',
  foreingKey: 'userid_num',

  onDelete: 'CASCADE'
})
Club_members.belongsTo(Club_members_wait,{
  foreingKey: 'club_id',
  foreingKey: 'userid_num'
})

// Club C_members => 1:N
Club.hasMany(Club_members,{
  foreingKey: 'club_id',

  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Club_members.belongsTo(Club, {
  foreingKey: 'club_id',
});

// Public_post P_Comment => 1:N
Public_post.hasMany(Public_post_comment,{
  foreingKey: 'post_id',
  foreingKey: 'userid_num',

  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Public_post_comment.belongsTo(Public_post,{
  foreingKey: 'post_id',
  foreingKey: 'userid_num',
});

// P_Comment P_Comment_like => 1:N
Public_post_comment.hasMany(Public_post_comment_like, {
  foreingKey: 'comment_id',
  foreingKey: 'post_id',

  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Public_post_comment_like.belongsTo(Public_post_comment, {
  foreingKey: 'comment_id',
  foreingKey: 'post_id',
});


// Club C_post => 1:N
Club.hasMany(Club_post, {
  foreingKey: 'club_id',

  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Club_post.belongsTo(Club,{
  foreingKey: 'club_id',
});

// User C_post => 1:N
User.hasMany(Club_post,{
  foreingKey: 'userid',

  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Club_post.belongsTo(User,{
  foreingKey: 'userid',
});

// C_Post C_P_Comment => 1:N
Club_post.hasMany(Club_post_comment,{
  foreingKey: 'post_id',
  foreingKey: 'club_id',
  foreingKey:'userid',

  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Club_post_comment.belongsTo(Club_post,{
  foreingKey: 'post_id',
  foreingKey: 'club_id',
  foreingKey:'userid'
});

// C_P_comment C_P_C_like => 1:N
Club_post_comment.hasMany(Club_post_comment_like,{
  foreingKey: 'post_id',
  foreingKey: 'club_id',
  foreingKey:'comment_id',

  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Club_post_comment_like.belongsTo(Club_post_comment,{
  foreingKey: 'post_id',
  foreingKey: 'club_id',
  foreingKey:'comment_id'
});

//Club C_Chat => 1:N
Club.hasMany(Club_chat,{
  foreingKey: 'club_id',

  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Club_chat.belongsTo(Club,{
  foreingKey: 'club_id'
});

//Club Club_Schedule => 1:N
Club.hasMany(Club_schedule,{
  foreingKey: 'club_id',
  
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Club_schedule.belongsTo(Club,{
  foreingKey: 'club_id'
})


db.User = User;
db.Public_post = Public_post;
db.Public_post_comment = Public_post_comment;
db.Public_post_comment_like = Public_post_comment_like;

db.Club = Club;
db.Club_chat = Club_chat;
db.Club_members = Club_members;
db.Club_members_wait = Club_members_wait;
db.Club_post = Club_post;
db.Club_post_comment = Club_post_comment;
db.Club_post_comment_like = Club_post_comment_like;
db.Club_schedule = Club_schedule;

db.Dm = Dm;



module.exports = db;
