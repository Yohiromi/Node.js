var mongoose = require('mongoose');

// 请确保替换成你的完整数据库连接字符串，包含用户名和密码
// 连接字符串应包含数据库名称
const uri = "mongodb+srv://COMP5347lab12:I4LLh79C5EKIQgKF@cluster0.lvt4izh.mongodb.net/Assignment2_Lab12";


mongoose.connect(uri)
  .then(() => console.log('Successfully connected to MongoDB Atlas.'))
  .catch(err => console.error('Connection error', err));

module.exports = mongoose;
