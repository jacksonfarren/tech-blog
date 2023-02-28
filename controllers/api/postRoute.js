const { User, Comment, Post } = require("../../models");

const router = require("express").Router();

router.get("/post/:id", async (req, res) => {
    try {
        if (!req.session.logged_in) {
            res.redirect("/");
            return;
        };

        const postData = await Post.findOne({
            where: {
                id: req.params.id,
            },
            include: [
                {
                    model: Comment,
                },
            ],
        });

        if (!postData) {
            res.status(400).json({ message: "Unable to retrieve post" });
        };
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put("/post/:id", async (req, res) => {
    try{
        if (!req.session.logged_in) {
            res.redirect("/");
            return;
        };

        // find comments for post, allow for updating comment if comment was made by user
        const commentData = await Comment.update(
            {
                comment_text: req.body.comment_text
            },
            {
                
            }
        )
        
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;