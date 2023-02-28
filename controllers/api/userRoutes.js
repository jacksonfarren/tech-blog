const { User } = require("../../models");

const router = require("express").Router();

router.post("/login", async (req, res) => {
    try {
        const userData = await User.findOne({
            where: { username: req.body.username },
        });

        if (!userData) {
            res.status(400).json({ message: "Invalid username" });
            return;
        };

        const validPassword = userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: "Invalid password" });
        }

        const user = userData.get({ plain: true });

        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.username = user.username;
            req.session.logged_in = true;

            res.status(200).json({ message: "You are now logged in" });
        });

    } catch (error) {
        res.status(500).json(error);
    }
});

router.post("/logout", async (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.post("/signup", async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        if (!userData) {
            res.status(400).json({ message: "Could not create new user" });
            return;
        };

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.logged_in = true;

            res.status(200).json({ message: "You are now signed up and logged in" });
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put("/changePassword", async (req, res) => {
    try {
        const updateUser = await User.update(
            {
                password: req.body.new_password,
            },
            {
                where: { id: req.session.user_id },
                individualHooks: true,
            }
        );

        if (!updateUser) {
            res.status(400).json({ message: "Could not change password" });
            return;
        };

        res.status(200).end();
    } catch (error) {
        res.status(500).json(error);

    }
});

router.put("/updateUsername", async (req, res) => {
    try {
        const updateUser = await User.update(
            {
                username: req.body.username,
            },
            {
                where: { id: req.session.user_id },
            }
        );

        if (!updateUser) {
            res.status(400).json({ message: "Could not update username" });
            return;
        }

        res.status(200).end();

    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;