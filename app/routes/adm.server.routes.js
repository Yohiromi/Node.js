const express = require('express');
const controller = require('../controllers/adm.server.controller');
const upload = require('../config/multerConfig');
const router = express.Router();

router.get('/adm_show_all_contributions', controller.adm_show_all_contributions);
router.get('/adm_index', controller.adm_index);
router.get('/adm_show_all_characters', controller.adm_show_all_characters)
router.post('/adm_delete_character', controller.adm_delete_character)

router.post('/adm_edit_character', controller.adm_edit_character)
router.post('/adm_before_change_character', controller.adm_before_change_character);


router.get('/adm_before_add_character', controller.adm_before_add_character);
router.post('/adm_add_character', upload.single('image_url') ,controller.adm_add_character);

module.exports = router;