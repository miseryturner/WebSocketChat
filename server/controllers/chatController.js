const pool = require('../database/connect');
const md5 = require("md5");

class chatController {
    async createChat(req, res) {
        pool.query(`INSERT INTO chats (date_of_creation, first_id , second_id) VALUES ('${new Date}', '${req.fields.first_id}', '${req.fields.second_id}')`).then(data => {
            res.json(data[0].insertId);
        });
    }
    async getChats(req, res) {
        pool.query(`SELECT * FROM chats WHERE first_id=${req.query.id} OR second_id=${req.query.id}`).then(data => {
            if(data[0].length)
                res.json(data[0]);
            else
                res.send('У вас нет ни одного чата');
        });
    }
    async getChat(req, res) {
        pool.query(`SELECT * FROM chats WHERE first_id=${req.fields.id} OR second_id=${req.fields.id}`).then(data => {
            res.json(data[0]);
        });
    }
}

module.exports = new chatController();