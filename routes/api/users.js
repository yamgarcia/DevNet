const express = require('express');
const router = express.Router();

/**
 * @route    GET api/users
 * @desc     Test route
 * @access   Public
 *
 * Public routes don't need tokens
 */
router.get('/', (req, res) => res.send('User route'));

module.exports = router;
