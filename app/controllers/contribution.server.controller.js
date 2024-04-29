var Contribution = require("../models/contribution")
var Chara = require("../models/characters")
var fs = require('fs').promises;
var path = require('path');


//for user

module.exports.Edit_add_to_contributions = async function (req, res) {
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
        id: req.body.chara_name_id
    };

    // 更新 character 对象和 charaData 对象
    for (const [key, value] of Object.entries(updateFields)) {
        if (character[key] !== value) {
            charaData[key] = value;
        }
    }

    console.log("charaData:", charaData);

    const NewContributionData = new Contribution({
        contribution_id: (Number(Last_contribution_id) + 1).toString(),
        user_id: {_id: req.session.userId},
        action: "EditCharacter",
        status: "Pending",
        reviewed_by: null,
        date: formattedDate,
        data: charaData
    });

    try {
        await NewContributionData.save();
        res.redirect('/chara/show_all_characters');
    } catch (err) {
        console.error(err);
        res.status(500).send({message: 'Failed to add character'});
    }
};

module.exports.Add_add_to_contributions = async function (req, res) {
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
    const character_id = name.toString().replace(' ', '').toLowerCase()

    //对contribution处理
    const AllContributions = await Contribution.findAllContributions();
    const Last_contribution_id = AllContributions[AllContributions.length - 1].contribution_id;
    const now = new Date();
    const formattedDate = now.toISOString();


    const NewContributionData = new Contribution({
        contribution_id: (Number(Last_contribution_id) + 1).toString(),
        user_id: {_id: req.session.userId},
        action: "AddCharacter",
        status: "Pending",
        reviewed_by: null,
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
    await NewContributionData.save();
    res.redirect('/chara/show_all_characters')
}


//for adm
module.exports.approve_add_contributions = async function (req, res) {
    const contribution = await Contribution.findById(req.body.contribution_id)
    contribution["status"] = "Approved"
    contribution["reviewed_by"] = {_id: req.session.userId}

    const NewCharacter = new Chara(contribution.data)
    await NewCharacter.save();
    await contribution.save();
    res.redirect('/adm/adm_show_all_contributions')
}


module.exports.approve_edit_contributions = async function (req, res) {
    const contribution = await Contribution.findById(req.body.contribution_id)
    contribution["status"] = "Approved"
    contribution["reviewed_by"] = {_id: req.session.userId}

    const character = await Chara.findOne({id: contribution.data.id})


    for (let key in contribution.data) {
        character[key] = contribution.data[key]
    }
    await contribution.save();
    await character.save();
    res.redirect('/adm/adm_show_all_contributions')
}

module.exports.reject_contribution = async function (req, res) {
    const contribution = await Contribution.findById(req.body.contribution_id)
    contribution["status"] = "Rejected"
    contribution["reviewed_by"] = {_id: req.session.userId}
    if (contribution.action === 'EditCharacter') {
        await contribution.save();
        res.redirect('/adm/adm_show_all_contributions')
    } else {
        //进行删除本地图片
        const image_path = path.join(__dirname, '../../public', contribution.data.image_url);//“../”是退回上一级，这里退回两级
        console.log(image_path);
        await fs.unlink(image_path);
        await contribution.save();
        res.redirect('/adm/adm_show_all_contributions')
    }

}

module.exports.search_contribution = async function (req, res) {
    const search_word = req.body.searching;
    const search_regex = new RegExp(search_word, 'i'); // 'i' 使匹配不区分大小写

    const search_result = await Contribution.find({
        $or: [
            {action: {$regex: search_regex}},
            {status: {$regex: search_regex}},
            {date: {$regex: search_regex}},
            {'data.id': {$regex: search_regex}}
        ]
    });
    console.log(search_word)
    console.log("result:", search_result)
    res.render('adm_show_contributions.ejs',{AllContributions: search_result})
}
