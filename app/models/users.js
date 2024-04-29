var mongoose = require('./db')

var UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, // 这通常是自动生成的，所以不需要手动添加
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.statics.findAllUsers = function() {
    console.log("findAllUsers method called");
    return this.find().exec()
      .then(result => {
        console.log("Query successful", result);
        return result;
      })
      .catch(error => {
        console.error("Error in findAllUsers query", error);
        throw error; // 重新抛出错误以便外部捕获
      });
};


var User = mongoose.model('User', UserSchema, 'userlist')

module.exports = User
