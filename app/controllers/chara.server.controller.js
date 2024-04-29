var Chara = require("../models/characters")
var Contribution = require("../models/contribution")

// 假设上面的 Chara 和 Contribution 模型已经被正确导入

module.exports.show_all_characters = async function (req, res) {
    try {
        const editContributions = await Contribution.find({action: 'EditCharacter', status: 'Pending'});
        // 现在 editContributions 包含所有 action 为 EditCharacter 且状态为 Pending 的条目

        const characters = await Chara.findAllCharacters();
        // 在这里对 characters 进行处理
        res.render("user_show_all_characters.ejs", {characters: characters, editContributions: editContributions});
    } catch (err) {
        console.error("Error retrieving characters or contributions:", err);
        res.status(500).send("Error retrieving information");
    }
};

module.exports.before_change_character = async function (req, res) {
    try {
        const charaId = req.body.edit_chara_id;
        console.log("charaId:", charaId);
        const character = await Chara.findById(charaId);

        if (!character) {
            return res.status(404).send("Character not found");
        }

        res.render("user_edit_character.ejs", {character: character});
    } catch (err) {
        console.error("Error finding character:", err);
        res.status(500).send("Error retrieving character");
    }
};

module.exports.before_add_character = async function (req, res) {
    const characters = await Chara.find({}).exec()
    const All_id = characters.map(key => key.id);
    res.render("user_add_character.ejs", {All_id: All_id});
}