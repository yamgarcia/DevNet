const express = require('express');
const router = express.Router();

/**
 * @route    GET api/posts
 * @desc     Test route
 * @access   Public
 *
 * Public routes don't need tokens
 */
router.get('/', (req, res) => res.send('Posts route'));

module.exports = router;
