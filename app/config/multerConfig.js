const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/images'); // 确保这个目录已经存在，否则需要创建
    },
    filename: function(req, file, cb) {
        // 使用 path.extname 获取原始文件的扩展名
        const ext = path.extname(file.originalname);
        // 使用 Date.now() 生成唯一的时间戳，以便于区分不同的上传文件
        const timestamp = Date.now();
        // 清理文件名，移除可能的乱码字符，这里仅示范使用时间戳
        // 可以使用其他逻辑来构造所需的文件名部分
        cb(null, 'image-' + timestamp + ext);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
