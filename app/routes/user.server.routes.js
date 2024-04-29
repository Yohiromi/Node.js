const express = require('express');
const controller = require('../controllers/user.server.controller');
const router = express.Router();

router.get('/show_all_users', controller.show_all_users);
router.post('/login', controller.login);

module.exports = router;