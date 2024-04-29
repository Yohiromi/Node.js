var mongoose = require('./db')

var CharaSchema = new mongoose.Schema({
  id: { type: String, required: true }, // 唯一标识符，例如"batman"
  active: { type: Boolean, default:true }, // 是否活跃
  name: { type: String, required: true }, // 名字，例如"Batman"
  subtitle: { type: String, default:'' }, // 副标题，例如"The Dark Knight"
  description: { type: String, default:'' }, // 描述
  image_url: { type: String, required: true }, // 图像URL
  strength: { type: Number, default:0 }, // 力量值
  speed: { type: Number, default:0  }, // 速度值
  skill: { type: Number, default:0  }, // 技能值
  fear_factor: { type: Number, default:0  }, // 恐惧因素值
  power: { type: Number, default:0  }, // 力量值
  intelligence: { type: Number, default:0  }, // 智力值
  wealth: { type: Number, default:0  } // 财富值
},{versionKey: false});

CharaSchema.statics.findAllCharacters = function() {
    console.log("findAllCharacters method called");
    return this.find().exec()
      .then(result => {
        return result;
      })
      .catch(error => {
        console.error("Error", error);
        throw error; // 重新抛出错误以便外部捕获
      });
};

var Chara = mongoose.model('Chara', CharaSchema, 'characters')

module.exports = Chara
