const express = require("express");
const controllerPublic = require("../controller/Cpublic");
const controllerClub = require("../controller/Cclub");
const router = express.Router();
const { isNotLoggedIn, isLoggedIn } = require("./middlewares");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const { User } = require("../models/Index");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/home", isLoggedIn, async (req, res) => {
  console.log(req.cookies.jwt);
  const { userid, userid_num } = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET)
  console.log('verified : ', userid, userid_num);

  try {
    const user = await User.findOne({
      where: {
        userid: verified
      }
    })
    console.log(user);
  } catch(err) {
    console.log(err);
  }
  
  
  res.render("home");
});

router.get("/login", isNotLoggedIn, (req, res) => {
  res.render("login");
});

router.get("/register", isNotLoggedIn, (req, res) => {
  res.render("register");
});

// router.get("/register/findSchool", (req, res) => {
//   res.render("findSchool");
// });

// club
// GET /clubMain : 전체 동아리 조회
router.get(
  "/clubMain",
  passport.authenticate("jwt", { session: false }),
  controllerClub.getClubs
);

// GET /clubDetail/:club_id : 동아리 하나 상세 조회
router.get("/clubDetail/:club_id", controllerClub.getClub);

// GET /createClub : 동아리 생성 페이지 불러오기
router.get("/createClub", controllerClub.getCreateClub);

// POST /createClub : 동아리 생성
router.post("/createClub", controllerClub.postCreateClub);

//get /clubApply/:club_id
router.get("/clubApply/:club_id", controllerPublic.clubApply);

//post /clubApply/:club_id
router.post("/clubApply/:club_id", controllerPublic.clubApplyinfo);

// clubAdmin
// GET /clubAdminMain : 동아리 관리페이지 불러오기
router.get("/clubAdminMain/:club_id", controllerClub.getClubAdminMain);

// GET /clubAdminApplyList/:club_id : 동아리 지원자 전체 리스트 불러오기
router.get(
  "/clubAdminApplyList/:club_id",
  controllerPublic.getClubMembersApplyList
);

// GET /clubAdminEdit/:club_id : 동아리 수정페이지 불러오기
router.get("/clubAdminEdit/:club_id", controllerClub.getClubAdminEdit);

// PATCH /clubAdminEdit/:club_id : 동아리 수정
router.patch("/clubAdminEdit/:club_id", controllerClub.patchClub);

// DELETE /clubAdminEdit/:club_id : 동아리 삭제
router.delete("/clubAdminEdit/:club_id", controllerClub.deleteClub);

// GET /clubAdminMemberList/:club_id 신청한 회원 전체 조회
router.get("/clubAdminMemberList/:club_id", controllerPublic.getClubMembers);

// GET /clubAdminApplyDetail/:club_id 클럽 신청한 회원정보 상세페이지 불러오기
router.get(
  "/clubAdminApplyDetail/:club_id/:userid_num",
  controllerPublic.getClubAdminApplyDetail
);

// GET /clubAdminMemberDetail/:club_id 클럽 회원정보 상세보기 페이지
router.get("/clubAdminMemberDetail/:club_id", controllerPublic.getClubMember);

// POST /clubAdminApplyDetail/:club_id 동아리 가입 신청 승인
router.post(
  "/clubAdminApplyDetail/:club_id",
  controllerPublic.createClubMembers
);

// DELETE /clubAdminMemberDetail/:club_id 클럽에서 추방
router.delete(
  "/clubAdminMemberDetail/:club_id",
  controllerPublic.deleteMembers
);

// DELETE /clubAdminApplyDetail/:club_id 클럽 가입 거절
router.delete(
  "/clubAdminApplyDetail/:club_id",
  controllerPublic.deleteApplyDetail
);

// GET /clubAdminTransfer 클럽 회장 위임 페이지
router.get("/clubAdminTransfer/", controllerPublic.getClubAdminTransfer);

// GET /clubAdminTransfer/:club_id 클럽 회장 위임페이지 회원 전체 조회
router.get("/clubAdminTransfer/:club_id", controllerPublic.getAllMembers);

// DELETE /clubAdminTransfer/:club_id 회장 신청 거절
router.delete(
  "/clubAdminTransfer/:club_id",
  controllerPublic.deleteClubAdminTransfer
);

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

// GET /myclubNewPost/:club_id : 동아리 게시글 생성
router.get("/myclubNewPost/:club_id", controllerClub.getCreateClubPost);

// POST /myclubNewPost/:club_id : 동아리 게시글 생성
router.post("/myclubNewPost/:club_id", controllerClub.createClubPost);

// GET /myclubEditPost/:club_id/:post_id  : 동아리 게시글 수정 페이지 불러오기
router.get("/myclubEditPost/:club_id/:post_id", controllerClub.getClubEditPost);

// PATCH /myclubEditPost/:club_id/:post_id  : 동아리 게시글 수정
router.patch("/myclubEditPost/:club_id/:post_id", controllerClub.patchPost);

// DELETE /myclubEditPost/:club_id/:post_id  : 동아리 게시글 삭제
router.delete("/myclubEditPost/:club_id/:post_id", controllerClub.deletePost);

// mypage
// GET /mypageMain/ 마이페이지 정보 가져오기 ver.동아리
router.get("/mypageMain", controllerPublic.getMyPage);

// DELETE /mypageMain 유저 탈퇴
router.get("/mypageMain", controllerPublic.deleteMyID);

// GET /mypageProfile/:nickname 마이페이지 정보 가져오기 ver.닉네임
router.get("/mypageProfile/:nickname", controllerPublic.getMyPageProfile );

// publicPost
// GET /publicPostMain 익명 게시판 정보 불러오기
router.get("/publicPostMain", controllerPublic.getPost);

// GET /publicNewPost 새로운 포스트 생성 페이지
router.get("/publicNewPost", controllerPublic.getNewPost);

// POST /publicNewPost 새로운 포스트 생성
router.post("/publicNewPost", controllerPublic.createPost);

// GET /publicPostDetail/:post_id 특정 게시물 조회
router.get("/publicPostDetail/:post_id", controllerPublic.getPostDetail);

// POST /publicPostDetail/:post_id 특정 게시글 댓글 작성
router.post("/publicPostDetail/:post_id", controllerPublic.createPostComment);

// POST /publicPostDetail/:post_id/:comment_id 특정 게시글 댓글 좋아요
router.post(
  "/publicPostDetail/:post_id/:comment_id",
  controllerPublic.createPostCommentLike
);

// PATCH /publicPostDetail/:post_id 게시글 수정
router.patch("/publucPostDetail/:post_id", controllerPublic.patchPost);

// PATCH /publicPostDetail/:post_id/:comment_id 게시글 댓글 수정
router.patch(
  "/publucPostDetail/:post_id/:comment_id",
  controllerPublic.patchPostComment
);

// PATCH /publicPostDetail/:post_id/:comment_id 게시글 댓글 라이크 수정
router.patch(
  "/publucPostDetail/:post_id",
  controllerPublic.patchPostCommentLike
);

// DELETE /publicPostDetail/:post_id 특정 게시물 삭제
router.delete("/publucPostDetail/:post_id", controllerPublic.deletePost);

// DELETE /publicPostDetail/:post_id/:comment_id 게시글 댓글 삭제
router.delete(
  "/publucPostDetail/:post_id/:comment_id",
  controllerPublic.deletePostComment
);

// DM
// GET /dm dm 가져오기
router.get("/dm", controllerPublic.dm);

// post /mypageProfile/:nickname Dm 생성
router.post("/mypageProfile/:nickname", controllerPublic.newDm);

// GET /dmDetail/:note_id dmDetail 페이지 가져오기
router.get("/dmDetail/:note_id", controllerPublic.getDmDetail);

// POST //dmDetail/:note_id 데이터 전송
router.post("/dmDetail", controllerPublic.postDm);

// DELETE /dm dm삭제
router.delete("/dm", controllerPublic.deleteDm);

// GET /myclubChat/:club_id 동아리 채팅방 페이지 불러오기
router.get("/myclubChat/:club_id", controllerClub.getClubChat);

// POST /myclubChat/:club_id 동아리 채팅방에서 채팅 보내기
router.post("/myclubChat/:club_id", controllerClub.postClubChat);

module.exports = router;
