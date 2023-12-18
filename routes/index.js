const express = require("express");
// const controller = require("../controller/Cpublic");
const controllerClub = require("../controller/Cclub");
const router = express.Router();

// const userRouter = require("./userRouter")
// router.use("/auth", userRouter)

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/home", (req, res) => {
  res.render("home");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/register/findSchool", (req, res) => {
  res.render("findSchool");
});

// club
// GET /clubMain : 전체 동아리 조회
router.get("/clubMain", controllerClub.getClubs);

// GET /clubDetail/:club_id : 동아리 하나 상세 조회
router.get("/clubDetail/:club_id", controllerClub.getClub);

// GET /createClub : 동아리 생성 페이지 불러오기
router.get("/createClub", controllerClub.getCreateClub);

// POST /createClub : 동아리 생성
router.post("/createClub", controllerClub.postCreateClub);

router.get("/clubApply", (req, res) => {
  res.render("club/clubApply");
});

// clubAdmin
// GET /clubAdminMain : 동아리 관리페이지 불러오기
router.get("/clubAdminMain", controllerClub.getClubAdminMain);

router.get("/clubAdminApplyList", (req, res) => {
  res.render("clubAdmin/clubAdminApplyList");
});

// GET /clubAdminEdit/:club_id : 동아리 수정페이지 불러오기
router.get("/clubAdminEdit/:club_id", controllerClub.getClubAdminEdit);

// PATCH /clubAdminEdit/:club_id : 동아리 수정
router.patch("/clubAdminEdit/:club_id", controllerClub.patchClub);

// DELETE /clubAdminEdit/:club_id : 동아리 삭제
router.delete("/clubAdminEdit/:club_id", controllerClub.deleteClub);

router.get("/clubAdminMemberList", (req, res) => {
  res.render("clubAdmin/clubAdminMemberList");
});

router.get("/clubAdminApplyDetail", (req, res) => {
  res.render("clubAdmin/clubAdminApplyDetail");
});

router.get("/clubAdminMemberDetail", (req, res) => {
  res.render("clubAdmin/clubAdminMemberDetail");
});
router.get("/clubAdminTransfer", (req, res) => {
  res.render("clubAdmin/clubAdminTransfer");
});

// myclub
// GET /myclubSchedule/:club_id : 동아리 일정 전체 조회
router.get("/myClubSchedule/:club_id", controllerClub.getClubSchedules);

// router.get('/myClubSchedule/:club_id', (req, res) => {
//   res.render('./myclub/myclubSchedule')
// })

// POST /myclubSchedule/:club_id/ : 특정 날짜에 동아리 일정 추가
router.post("/myClubSchedule/:club_id", controllerClub.postClubSchedule);

// DELETE /myclubSchedule/:club_id/:schedule_id : 동아리 일정 삭제
router.delete(
  "/myClubSchedule/:club_id/:schedule_id",
  controllerClub.deleteClubSchedule
);

router.delete(
  "/myClubSchedule/:club_id/:schedule_id",
  controllerClub.deleteClubSchedule
);

// GET /myclubPostMain/:club_id : 동아리 게시글 전체 조회
router.get("/myclubPostMain/:club_id", controllerClub.getClubPosts);

// GET /myclubPostDetail/:club_id/:post_id : 동아리 게시글 하나 조회
router.get("/myclubPostDetail/:club_id/:post_id", controllerClub.getClubPost);

// POST  /myclubPostDetail/:club_id/:post_id : 동아리 게시글 댓글 생성
router.post(
  "/myclubPostDetail/:club_id/:post_id",
  controllerClub.createPostComment
);

// PATCH /myclubPostDetail/:club_id/:post_id/:comment_id : 동아리 게시글 댓글 수정
router.patch(
  "/myclubPostDetail/:club_id/:post_id/:comment_id",
  controllerClub.patchPostComment
);

// DELETE  /myclubPostDetail/:club_id/:post_id/:comment_id : 동아리 게시글 댓글 삭제
router.delete(
  "/myclubPostDetail/:club_id/:post_id/:comment_id",
  controllerClub.deletePostComment
);

// POST /myclubPostDetail/:club_id/:post_id/:comment_id
router.post(
  "/myclubPostDetail/:club_id/:post_id/:comment_id",
  controllerClub.postClubPostCommentLike
);

// DElETE /myclubPostDetail/:club_id/:post_id/:comment_id/:like_id
router.delete(
  "/myclubPostDetail/:club_id/:post_id/:comment_id/:like_id",
  controllerClub.deleteClubPostCommentLike
);

// POST /myclubNewPost/:club_id : 동아리 게시글 생성
router.post("/myclubNewPost/:club_id", controllerClub.createClubPost);

// PATCH /myclubPostDetail/:club_id/:post_id  : 동아리 게시글 수정
router.patch("/myclubPostDetail/:club_id/:post_id", controllerClub.patchPost);

// DELETE /myclubPostDetail/:club_id/:post_id  : 동아리 게시글 삭제
router.delete("/myclubPostDetail/:club_id/:post_id", controllerClub.deletePost);

// mypage
router.get("/mypageMain", (req, res) => {
  res.render("./mypage/mypageMain");
});
router.get("/mypageProfile", (req, res) => {
  res.render("./mypage/mypageProfile");
});

module.exports = router;
