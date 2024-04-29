var User = require("../models/users")
var Adm = require("../models/adm")

module.exports.show_all_users = async function (req, res) {
    try {
        const users = await User.findAllUsers();
        console.log("All users:", users);
        // 在这里对 users 进行处理
        res.render("show_all_users.ejs", { users: users });
    } catch (err) {
        console.error("Error retrieving all users:", err);
        res.status(500).send("Error retrieving users");
    }
};

module.exports.login = async function (req, res) {
    try {
        const userEmail = req.body.email; // 从请求体中获取用户的邮箱地址
        const user = await User.findOne({ email: userEmail }); // 根据邮箱地址查找用户

        if (user) {
            var userId = user._id; // 获取用户的 _id
            req.session.userId = userId; // 将用户的 _id 存入 session

            const adms = await Adm.findAllAdms(); // 等待获取所有管理员数据

            if (adms.some(adm => adm._id.equals(userId))) { // 检查是否管理员
                console.log("管理员登录！");
                // 渲染管理员界面（假设你有一个专门的视图）
                res.redirect("/adm/adm_index");
            } else { // 用户不是管理员
                console.log("普通用户登录！");
                res.redirect("/chara/show_all_characters"); // 重定向到所有角色显示页面
            }
        } else {
            res.status(404).render('Error.ejs', { message: 'User not found' }); // 使用EJS模板来显示错误
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).render('Error.ejs', { message: 'Internal server error' }); // 使用EJS模板来显示错误
    }
};
