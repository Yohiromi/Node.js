var Adm = require("../models/adm")
var Contribution = require("../models/contribution");
var Chara = require("../models/characters");


module.exports.adm_index = async function (req, res) {
    const contributions = await Contribution.findAllContributions()
    res.render("adm_index.ejs",{contributions: contributions});
}

module.exports.adm_show_all_contributions = async function (req, res) {
    const AllContributions = await Contribution.findAllContributions()
    res.render("adm_show_contributions.ejs", {AllContributions: AllContributions});
}

module.exports.adm_show_all_characters = async function (req, res) {
    try {
        const editContributions = await Contribution.find({action: 'EditCharacter', status: 'Pending'});
        // 现在 editContributions 包含所有 action 为 EditCharacter 且状态为 Pending 的条目
        const characters = await Chara.findAllCharacters();
        // 在这里对 characters 进行处理
        res.render("adm_show_all_characters.ejs", {characters: characters, editContributions: editContributions});
    } catch (err) {
        console.error("Error retrieving characters or contributions:", err);
        res.status(500).send("Error retrieving information");
    }
}

module.exports.adm_delete_character = async function (req, res) {
    const Deletecharacter = await Chara.findById(req.body.delete_chara_id);

    const AllContributions = await Contribution.findAllContributions()
    //获取末尾元素实现，contribution_id的自增
    const Last_contribution_id = AllContributions[AllContributions.length - 1].contribution_id

    const now = new Date();
    // 使用 toISOString() 方法格式化日期
    const formattedDate = now.toISOString();

    const NewContributionData = new Contribution({
        contribution_id: (Number(Last_contribution_id) + 1).toString(),
        user_id: {_id: req.session.userId},
        action: "DeleteCharacter",
        status: "Approved",
        reviewed_by: {_id: req.session.userId},
        date: formattedDate.toString(),
        data: {
            id: req.body.chara_name_id,
        },
    });
    try {
        Deletecharacter.active = false; // 假设你有一个表示角色是否活跃的字段
        // 保存修改到数据库
        await Deletecharacter.save();
        // 保存到数据库,
        await NewContributionData.save();
        // 发送成功响应
        res.redirect('/adm/adm_show_all_characters')
    } catch (err) {
        // 错误处理
        console.error(err);
        res.status(500).send({message: 'Failed to add character'});
    }
};

module.exports.adm_before_change_character = async function (req, res) {
    try {
        const charaId = req.body.edit_chara_id;
        console.log("charaId:", charaId);
        const character = await Chara.findById(charaId);

        if (!character) {
            return res.status(404).send("Character not found");
        }

        res.render("adm_edit_character.ejs", {character: character});
    } catch (err) {
        console.error("Error finding character:", err);
        res.status(500).send("Error retrieving character");
    }
};

module.exports.adm_edit_character = async function (req, res) {
    const AllContributions = await Contribution.findAllContributions();
    const Last_contribution_id = AllContributions[AllContributions.length - 1].contribution_id;
    const character = await Chara.findById(req.body.chara_id);
    const now = new Date();
    const formattedDate = now.toISOString();

    const updateFields = {
        name: req.body.chara_name,
        subtitle: req.body.subtitle,
        description: req.body.description,
        image_url: req.body.chara_image_url,
        strength: Number(req.body.strength),
        speed: Number(req.body.speed),
        skill: Number(req.body.skill),
        fear_factor: Number(req.body.fear_factor),
        power: Number(req.body.power),
        intelligence: Number(req.body.intelligence),
        wealth: Number(req.body.wealth)
    };

    const charaData = {
        id: req.body.chara_name_id,
    };

    // 更新 character 对象和 charaData 对象
    for (const [key, value] of Object.entries(updateFields)) {
        if (character[key] !== value) {
            charaData[key] = value;
            character[key] = value;
        }
    }

    console.log("charaData:", charaData);

    const NewContributionData = new Contribution({
        contribution_id: (Number(Last_contribution_id) + 1).toString(),
        user_id: {_id: req.session.userId},
        action: "EditCharacter",
        status: "Approved",
        reviewed_by: {_id: req.session.userId},
        date: formattedDate,
        data: charaData
    });

    try {
        await character.save();
        await NewContributionData.save();
        res.redirect('/adm/adm_show_all_characters');
    } catch (err) {
        console.error(err);
        res.status(500).send({message: 'Failed to add character'});
    }
};


module.exports.adm_before_add_character = async function (req, res) {
    const characters = await Chara.find({}).exec()
    const All_id = characters.map(key => key.id);
    res.render("adm_add_character.ejs", {All_id: All_id});
}

module.exports.adm_add_character = async function (req, res) {
    const name = req.body.name
    const subtitle = req.body.subtitle
    const description = req.body.description
    const image_url = req.file.path.replace('public', '').substring(1);
    const strength = Number(req.body.strength)
    const speed = Number(req.body.speed)
    const skill = Number(req.body.skill)
    const fear_factor = Number(req.body.fear_factor)
    const power = Number(req.body.power)
    const intelligence = Number(req.body.intelligence)
    const wealth = Number(req.body.wealth)

    //对name和id进行处理
    const character_id = name.toString().replace(' ','').toLowerCase()

    //对contribution处理
    const AllContributions = await Contribution.findAllContributions();
    const Last_contribution_id = AllContributions[AllContributions.length - 1].contribution_id;
    const now = new Date();
    const formattedDate = now.toISOString();


    //进行输入对一些检查
    const NewCharacter = new Chara({
        id: character_id,
        active: true,
        name: name,
        subtitle: subtitle,
        description: description,
        image_url: image_url,
        strength: strength,
        skill: skill,
        speed: speed,
        power: power,
        fear_factor: fear_factor,
        intelligence: intelligence,
        wealth: wealth,
    })


    const NewContributionData = new Contribution({
        contribution_id: (Number(Last_contribution_id) + 1).toString(),
        user_id: {_id: req.session.userId},
        action: "AddCharacter",
        status: "Approved",
        reviewed_by: {_id: req.session.userId},
        date: formattedDate,
        data: {
            id: character_id,
            name: name,
            subtitle: subtitle,
            description: description,
            image_url: image_url,
            strength: strength,
            skill: skill,
            speed: speed,
            power: power,
            fear_factor: fear_factor,
            intelligence: intelligence,
            wealth: wealth,
        }
    });
    await NewCharacter.save();
    await NewContributionData.save();
    res.redirect('/adm/adm_show_all_characters')
}
