const controller = require('../controllers/contribution.server.controller');
const express = require("express");
const upload = require('../config/multerConfig');
const router = express.Router();

router.post('/Edit_add_to_contributions',controller.Edit_add_to_contributions)
router.post('/Add_add_to_contributions', upload.single('image_url') ,controller.Add_add_to_contributions);

router.post('/approve_add_contribution',controller.approve_add_contributions)
router.post('/approve_edit_contribution',controller.approve_edit_contributions)

router.post('/reject_contribution',controller.reject_contribution)
router.post('/search_contribution',controller.search_contribution)

module.exports = router;