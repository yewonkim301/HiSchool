const {
  Club,
  Club_chat,
  Club_members,
  Club_post,
  Club_post_comment,
  Club_post_comment_like,
  Club_schedule,
} = require("../models/Index");

exports.createClub = async (req, res) => {
  try {
    const { club_name, leader_id, limit, location, field, keyword } = req.body;
    const newClub = await Club.create({
      club_name,
      leader_id,
      limit,
      location,
      field,
      keyword,
    });
    res.send(newClub);
  } catch (err) {
    console.error(err);
    res.send("Internal Server Error!");
  }
};

exports.deleteClub = async (req, res) => {
  try {
    const { club_id } = req.params;
    const isDeleted = await Club.destroy({
      where: { club_id },
    });
    if (isDeleted) {
      res.send({ isDeleted: true });
    } else {
      res.send({ isDeleted: false });
    }
  } catch (err) {
    console.error(err);
    res.send("Internal Server Error!");
  }
};

exports.patchClub = async (req, res) => {
  try {
    const { club_id } = req.params;
    const updateClub = await Club.update(
      {
        club_name,
        leader_id,
        limit,
        location,
        field,
        keyword,
      },
      {
        where: { club_id },
      }
    );
    res.send(updateClub);
  } catch (err) {
    console.error(err);
    res.send("Internal Server Error!");
  }
};

// read
