const pool = require('../database/connect');

class messageController {
    async getMessages(req, res) {
        pool.query(`SELECT * FROM messages WHERE chat_id=${req.fields.id}`).then(data => {
            res.json(data[0]);
        });
    }
}

module.exports = new messageController();