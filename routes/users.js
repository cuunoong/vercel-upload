const express = require("express");
const router = express.Router();

const User = require("../database/schema/User");

/* GET users listing. */
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    return res.json({ message: error });
  }
});

/* GET users listing. */
router.post("/", async (req, res) => {
  const { name, email, username, password } = req.body;

  try {
    const isEmailNotAvailable = await User.findOne({ email });
    if (isEmailNotAvailable)
      return res.json({ message: "Email has been used" });

    const isUsernameNotAvailable = await User.findOne({ username });
    if (isUsernameNotAvailable)
      return res.json({ message: "Username has been used" });

    const user = new User({
      name,
      email,
      username,
      password,
    });

    await user.save();

    return res.json(user);
  } catch (error) {
    return res.json({ message: error });
  }
});

router.get("/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.json({ message: "User not found" });

    return res.json(user);
  } catch (error) {
    return res.json({ message: error });
  }
});

module.exports = router;
