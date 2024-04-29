var mongoose = require('./db')

var AdmSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, // 这通常是自动生成的，所以不需要手动添加
});


// 在 Adm 模型文件中添加
AdmSchema.statics.findAllAdms = function() {
    return this.find().exec();  // 使用 exec() 来返回一个 Promise
};

var Adm = mongoose.model('Adm', AdmSchema, 'adminlist')

module.exports = Adm