const pool = require('../database/connect');
const md5 = require('md5');

class userController {
    async registration(req, res) {
        try {
            pool.query(`INSERT INTO users (login, password, profile_picture, phone) VALUES ('${req.fields.login}', '${md5(req.fields.password)}', '', '${req.fields.phone}')`).then(data => {
                res.json(data[0].insertId);
            });
        } catch {
            res.json('hello');
        }
    }
    async login(req, res) {
        pool.query(`SELECT * FROM users WHERE phone='${req.fields.phone}' AND password='${md5(req.fields.password)}'`).then(data => {
            if(data[0].length)
                res.json(data[0][0].id);
            else
                res.json('Введённые вами данные не верны');
        });
    }
    async getUser(req, res) {
        pool.query(`SELECT * FROM users WHERE id='${req.fields.id}'`).then(data => {
            if(data[0].length)
                res.json({
                    name: data[0][0].login,
                    phone: data[0][0].phone
                });
            else
                res.json('Авторизуйтесь');
        });
    }
    async getUsers(req, res) {
        pool.query(`SELECT * FROM users WHERE login LIKE '%${req.fields.login}%' OR phone LIKE '%${req.fields.login}%'`).then(data => {
            if(data[0].length)
                res.json(data[0]);
            else
                res.json('Error');
        });
    }
}

module.exports = new userController();