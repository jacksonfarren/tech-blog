const { User, Comment, Post } = require("../models");

const router = require("express").Router();

router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: Comment,
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });
    
        const posts = postData.map((val) => val.get({ plain: true }));

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in,
        })
    } catch (error) {
        res.status(500).json({ message: 'Could not get posts' });
    }
})

router.get("/signup", (req, res) => {
    res.render("signup", { logged_in: req.session.logged_in });
    return;
});

module.exports = router;