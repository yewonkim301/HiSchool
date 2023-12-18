const express = require("express");
const controllerPublic = require("../controller/Cpublic");
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

// GET /clubAdminApplyList/:club_id : 동아리 지원자 전체 리스트 불러오기
router.get("/clubAdminApplyList/:club_id", controllerPublic.getClubMembersApplyList);

// GET /clubAdminEdit/:club_id : 동아리 수정페이지 불러오기
router.get("/clubAdminEdit/:club_id", controllerClub.getClubAdminEdit);

// PATCH /clubAdminEdit/:club_id : 동아리 수정
router.patch("/clubAdminEdit/:club_id", controllerClub.patchClub);

// DELETE /clubAdminEdit/:club_id : 동아리 삭제
router.delete("/clubAdminEdit/:club_id", controllerClub.deleteClub);

// GET /clubAdminMemberList/:club_id 회원 전체 조회
router.get("/clubAdminMemberList", controllerPublic.getClubMembers );

// GET /clubAdminApplyDetail 클럽 신청 페이지 상세 불러오기
router.get("/clubAdminApplyDetail", controllerPublic.getClubAdminApplyDetail );

// GET /clubAdminMemberDetail/:club_id 특정 클럽, 회원정보 상세보기 페이지
router.get("/clubAdminMemberDetail/:club_id", controllerPublic.getClubMember);

// POST /clubAdminApplyDetail/:club_id 동아리 가입 신청
router.post("/clubAdminApplyDetail/:club_id", controllerPublic.createClubMembers);

// DELETE /clubAdminMemberDetail 클럽에서 추방
router.delete("/clubAdminMemberDetail", controllerPublic.deleteMembers);

// DELETE /clubAdminApplyList/:club_id 클럽 가입 거절
router.delete("/clubAdminApplyList/:club_id", controllerPublic.deleteMembersApplyList);

// GET /clubAdminTransfer 클럽 회장 위임 페이지
router.get("/clubAdminTransfer/", controllerPublic.getClubAdminTransfer);

// GET /clubAdminTransfer/:club_id 클럽 회장 위임페이지 회원 전체 조회
router.get("/clubAdminTransfer/:club_id", controllerPublic.getAllMembers);

// DELETE /clubAdminTransfer/:club_id 회장 신청 거절
router.delete("/clubAdminTransfer/:club_id", controllerPublic.deleteClubAdminTransfer);

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

// publicPost
// GET /publicPostMain 익명 게시판 정보 불러오기
router.get('/publicPostMain', controllerPublic.getPost);

// GET /publicNewPost 새로운 포스트 생성 페이지
router.get('/publicNewPost', controllerPublic.getNewPost);

// POST /publicNewPost 새로운 포스트 생성
router.post('/publicNewPost', controllerPublic.createPost);

// GET /publicPostDetail/:post_id 특정 게시물 조회
router.get('/publicPostDetail/:post_id', controllerPublic.getPostDetail);

// POST /publicPostDetail/:post_id 특정 게시글 댓글 작성
router.post("/publicPostDetail/:post_id",controllerPublic.createPostComment);

// POST /publicPostDetail/:post_id/:comment_id 특정 게시글 댓글 좋아요
router.post("/publicPostDetail/:post_id/:comment_id", controllerPublic.createPostCommentLike);

// PATCH /publicPostDetail/:post_id 게시글 수정
router.patch("/publucPostDetail/:post_id", controllerPublic.patchPost);

// PATCH /publicPostDetail/:post_id/:comment_id 게시글 댓글 수정
router.patch("/publucPostDetail/:post_id/:comment_id", controllerPublic.patchPostComment);

// PATCH /publicPostDetail/:post_id/:comment_id 게시글 댓글 라이크 수정
router.patch("/publucPostDetail/:post_id", controllerPublic.patchPostCommentLike);

// DELETE /publicPostDetail/:post_id 특정 게시물 삭제
router.delete("/publucPostDetail/:post_id", controllerPublic.deletePost);

// DELETE /publicPostDetail/:post_id/:comment_id 게시글 댓글 삭제
router.delete("/publucPostDetail/:post_id/:comment_id", controllerPublic.deletePostComment);

// DM
// GET /dm dm 가져오기
router.get("/dm", controllerPublic.dm);

// GET /dmDetail dmDetail 페이지 가져오기
router.get("/dmDetail", controllerPublic.getDmDetail);

// POST // 아직 완성 안됬어요
router.post("/dmDetail", controllerPublic.postDm);

// DELETE /dm dm삭제
router.delete("/dm", controllerPublic.deleteDm);







module.exports = router;
