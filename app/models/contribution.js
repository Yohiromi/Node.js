var mongoose = require('mongoose');
const Schema = mongoose.Schema; // 这一行是必须的，它定义了 Schema

var contributionSchema = new mongoose.Schema({
  contribution_id: { type: String, required: true },
  user_id: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User' // 可以根据你的需求调整引用的集合
    }
  },
  action: {
    type: String,
    required: true,
    enum: ['AddCharacter', 'EditCharacter', 'DeleteCharacter'] // 根据你的需求添加行动
  },
  status: {
    type: String,
    required: true,
    enum: ['Approved', 'Pending', 'Rejected'] // 根据你的需求添加状态
  },
  reviewed_by: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // 可以根据你的需求调整引用的集合
      default: null // 如果没有reviewed_by，设置为null
    }
  },
  date: { type: String, required: true },
  data: Schema.Types.Mixed // 定义为混合类型
},{versionKey: false});

contributionSchema.statics.findAllContributions = function() {
    return this.find().exec()
      .then(result => {
        return result;
      })
      .catch(error => {
        console.error("Error", error);
        throw error; // 重新抛出错误以便外部捕获
      });
};

var Contribution = mongoose.model('Contribution', contributionSchema, 'contributions');

module.exports = Contribution;
