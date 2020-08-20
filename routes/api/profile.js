const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const request = require("request");
const config = require("config");

const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Post = require("../../models/Post");

const { check, validationResult } = require("express-validator");

/**
 * @route    GET api/profile/me
 * @desc     Get current users profile
 * @access   Private
 * *me
 */
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route    POST api/profile
 * @desc     Create and update a user profile
 * @access   Private
 */

//use auth and validation middleware
router.post(
  "/",
  [
    auth,
    [
      check("status", "status is required").not().isEmpty(),
      check("skills", "Skills is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    //checks for errors
    !errors.isEmpty() && res.status(400).json({ errors: errors.array() });

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      instagram,
      linkedin,
      twitter,
    } = req.body;

    //build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }

    //build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (twitter) profileFields.social.twitter = twitter;

    //use async await whenever use a mongoose method because it returns a promisse
    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }
      //create
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

/**
 * @route    GET api/profile
 * @desc     Get all profiles
 * @access   Public
 */

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// the ':' below is used to indicate a place holder in the path

/**
 * @route    GET api/profile/user/:user_id
 * @desc     Get profiles by user ID
 * @access   Public
 * *user
 */

router.get("/user/:user_id", async (req, res) => {
  try {
    // the user id comes from the URL, "req.params.user_id" to access it
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!profile)
      return res.status(400).json({
        msg: `Profile not found for this user: ${req.params.user_id}`,
      });
    res.json(profile);
  } catch (err) {
    // This just prevents the error the be "server error" when the user id is valid but not found
    if (err.kind == "ObjectId") {
      return res.status(400).json({
        msg: `Profile not found for this user: ${req.params.user_id}`,
      });
    }
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route    DELETE api/profile
 * @desc     Delete Profile, user & posts
 * @access   Private
 */

//private means that there is access to the token, but needs to add the auth
router.delete("/", auth, async (req, res) => {
  try {
    //remove user post
    await Post.deleteMany({ user: req.user.id });
    //remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route    PUT api/profile/experience
 * @desc     Add Profile experience
 * @access   Private
 * * experience
 */

router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("company", "Company is required").not().isEmpty(),
      check("from", "From date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      //unshift adds to the left (beggining) and push to the right (end)
      profile.experience.unshift(newExp);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

/**
 * @route    DELETE api/profile/experience/:exp_id
 * @desc     Delete an experience
 * @access   Private
 * * experience
 */

router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    // Get remove index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

/**
 * @route    PUT api/profile/education
 * @desc     Add Profile education
 * @access   Private
 * * education
 */

router.put(
  "/education",
  [
    auth,
    [
      check("school", "School is required").not().isEmpty(),
      check("degree", "Degree is required").not().isEmpty(),
      check("fieldofstudy", "Field of study is required").not().isEmpty(),
      check("from", "From date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      //unshift adds to the left (beggining) and push to the right (end)
      profile.education.unshift(newEdu);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

/**
 * @route    DELETE api/profile/education/:edu_id
 * @desc     Delete an education
 * @access   Private
 * * education
 */

router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);

    profile.education.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

/**
 * @route    GET api/profile/github/:username
 * @desc     Get user repos from github
 * @access   Public
 * * Github
 */

router.get("/github/:username", (req, res) => {
  try {
    const options = {
      //headers must be sent first to avoid errors
      headers: { "user-agent": "node.js" },
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&
      sort=created:asc&client_id=${config.get("githubclientId")}&client_secret=$
      {config.get("githubSecret")}`,
      method: "GET",
    };

    request(options, (error, response, body, next) => {
      if (error) console.error(error);

      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: "No github profile found" });
      }

      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
