const express = require('express');
const controller = require('../controllers/chara.server.controller');
const router = express.Router();


router.get('/show_all_characters', controller.show_all_characters);
router.post('/before_change_character', controller.before_change_character);
router.get('/before_add_character', controller.before_add_character);
module.exports = router;