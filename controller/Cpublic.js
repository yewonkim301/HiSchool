const{
    Public_post,
    Public_post_comment,
    Public_post_comment_like,
    Dm,
    Club_members,
    User
} = require('../models/Index');

// GET /publicPostMain 익명 게시판 정보 가져오기
exports.getPost() = async (req,res) =>{
    try{
        const Posts = await Public_post.findAll();
        res.render('publicPostMain', Posts);
    }
    catch{
        console.error(err);
        res.sned("Internal Server Error!");
    }
}

// POST /publicNewPost/:userid_num 게시물 생성
exports.createPost() = async (req,res) =>{
    try{
        const {userid_num} = req.params.userid_num;
        const { 
            title,
            content,
            image,
        } = req.body;
        const newPost = await Public_post.create({
            title: title,
            content: content,
            image: image,
            userid_num: userid_num,
        })
        res.send(newPost)
    }
    catch(err){
        console.error(err);
        res.sned("Internal Server Error!");
    }
}

// GET /publicPostDetail/:post_id 특정 게시물 조회
exports.getPostDetail = async (req,res) =>{
    try{
        const {post_id} = req.params.post_id;
        const getPost = await Public_post.findOne({
            where:{post_id: post_id}
        });
        const getPostComment = await Public_post_comment.findAll({
            where:{post_id: post_id}
        });
        const getPostCommentLike = await Public_post_comment_like.findAll({
            where: {post_id: post_id}
        })
        res.send(getPost, getPostComment, getPostCommentLike);
    }
    catch(err){
        console.error(err);
        res.sned("Internal Server Error!");
    }
}

// POST //publicPostDetail/:post_id 특정 게시글 댓글 작성
exports.createPostComment = async (req,res) => {
    try{
        const {post_id} = req.params.post_id;
        const {comment} = req.body;
        // content_nickname은 세션이름으로 받을까요?
        const newPublicPostComment = await Public_post_comment.create({
            comment: comment,
            // include:[{model:User, attributes: 'nickname'}] // User에 있는 nickname값을 가져온다.
            comment_nickname : req.session.nickname,
            post_id: post_id,
            userid_num: req.session.id,
            // userid_num 처리는 어떻게 해야할지
        })
        res.send(newPublicPostComment);
    }
    catch(err){
        console.error(err);
        res.sned("Internal Server Error!");
    }
}

// POST /publicPostDetail/:post_id/:comment_id 특정 댓글 좋아요
exports.createPostCommentLike = async (req,res) =>{
    try{
        const {post_id, comment_id} = req.params;
        const publicPostCommentLike = await Public_post_comment_like.create({
            like_id : like_id,
            post_id: post_id,
            comment_id: comment_id
        })
        res.send(publicPostCommentLike)
    }
    catch(err){
        onsole.error(err);
        res.sned("Internal Server Error!");
    }
}

// ==== 수정 ====
// PATCH /publicPostDetail/:post_id 게시글 수정
exports.patchPost = async (req,res) => {
    try{
        const {post_id} = req.params.post_id;
        const { 
            title,
            content,
            image,
        } = req.body;
        const updatePost = await Public_post.update({
            title: title,
            content: content,
            image:image
        },{
            where:{
                post_id: post_id,
                userid_num: req.session.id
            }
        }
        )
        res.send(updatePost);
    }
    catch(err){
        onsole.error(err);
        res.sned("Internal Server Error!");
    }
}

// PATCH /publicPostDetail/:post_id/:userid_num/:comment_id 특정 게시글 댓글 수정
exports.patchPostComment = async (req,res) =>{
    try{
        const {post_id, userid_num, comment_id} = req.params;
        const {comment} = req.body;
        if(req.session.id === userid_num){
            const updatePostComment = await Public_post_comment.update({
                comment: comment,
            },
            {
                where:{
                    comment_id: comment_id,
                    post_id: post_id
                }
            })
            res.send(updatePostComment)
        }
    }
    catch(err){
        onsole.error(err);
        res.sned("Internal Server Error!");
    }
}

// PATCH /publicPostDetail/:post_id/:comment_id
exports.patchPostCommentLike = async (req,res) =>{
    try{
        const {post_id, comment_id} = req.params;
        const updatePostCommentLike = await Public_post_comment_like.update({
            like_id: like_id,
        },{
            where:{
                post_id: post_id,
                comment_id: comment_id
            }
        })
        res.send(updatePostCommentLike)
    }catch(err){
        onsole.error(err);
        res.sned("Internal Server Error!");
    }
}

// ==== 삭제 =====
// DELETE /publicPostDetail/:post_id 특정 게시물 삭제
exports.deletePost = async (req,res) => {
    try{
        const {post_id} = req.params.post_id;
        const deletePost = await Public_post.destroy({
            where:{
                post_id: post_id
            }
        })
        if(deletePost){
            res.send({isDeleted:true});
        }else {
            res.send({isDeleted:false});
        }
    }
    catch(err){
        nsole.error(err);
        res.sned("Internal Server Error!");
    }
}

// DELETE /publicPostDetail/:post_id/:comment_id 특정 게시물 댓글 삭제
exports.deletePostComment = async (req,res) =>{
    try{
        const {post_id, comment_id} = req.params;
        const deletePostComment = await Public_post_comment.destroy({
            where:{
                post_id: post_id,
                comment_id: comment_id
            }
        })
        if(deletePostComment){
            res.send({isDeleted:true});
        }else{
            res.send({isDeleted:false});
        }
    }
    catch(err){
        nsole.error(err);
        res.sned("Internal Server Error!");
    }
}

// DM
// GET /dm/:userid_num
exports.dm = async (req,res) =>{
    try{
        const {userid_num} = req.params.userid_num;
        const getDm = await Dm.findAll({
            where:{
                [Sequelize.Op.or]: [{to_nickname: req.session.nickname}, {userid_num : userid_num}]
            }
        })
        res.send(getDm);
    }
    catch(err){
        nsole.error(err);
        res.sned("Internal Server Error!");
    }
}

// POST /dmDetail/:userid_num
exports.postDm = async (req,res) =>{
    try{
        const {userid_num} = req.params.userid_num;
        const {to_nickname, dm_content} = req.body
        const sendDm = await Dm.create({
            to_nickname: to_nickname,
            dm_content: dm_content,
            userid_num: userid_num
        })
        res.send(sendDm);
    }
    catch(err){
        nsole.error(err);
        res.sned("Internal Server Error!");
    }
}

// DELETE /dm/:userid_num
exports.deleteDm = async (req,res) =>{
    try{
        const {userid_num} = req.params.userid_num;
        const destroyDm = await Dm.destroy({
            where: note_id
        })
        if(destroyDm){
            res.send({isDeleted:true});
        }else {
            res.send({isDeleted:false});
        }
    }
    catch(err){
        nsole.error(err);
        res.sned("Internal Server Error!");
    }
}

// 동아리 회원
// GET /clubMembers 회원 전체 조회
exports.getClubMembers = async (req,res) => {
    try{
        const getMembers = await Club_members.findAll()
        res.send(getMembers);
    }
    catch(err){
        nsole.error(err);
        res.sned("Internal Server Error!");
    }
}

// POST /clubMembers/:userid_num 동아리 가입
exports.createClubMembers = async (req,res) =>{
    try{
        const {userid_num} = req.params.userid_num;
        const {
            club_id,
            motivation,
            introduction
        } = req.body;
        const newMembers = await Club_members.create({
            club_id: club_id,
            motivation: motivation,
            introduction: introduction,
            userid_num: userid_num,
            include:[{model: User, attributes:['name']}]
        })
        res.send(newMembers);
    }
    catch(err){
        nsole.error(err);
        res.sned("Internal Server Error!");
    }
}

// Delete /clubMembers 추방
exports.deleteMembers = async (req,res) =>{
    try{
        // 삭제 버튼클릭시 값이 넘어온다.
        const{userid_num} = req.body;
        const destroyMembers = await Club_members.destroy({
            where: userid_num
        })
        if(destroyMembers){
            res.send({isDeleted:true});
        }else {
            res.send({isDeleted:false});
        }    
    }
    catch(err){
        nsole.error(err);
        res.sned("Internal Server Error!");
    }
}