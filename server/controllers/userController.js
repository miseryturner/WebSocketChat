const pool = require('../database/connect');

class userController {
    async registration(req, res) {
        res.send('...');
    }
    async login(req, res) {
        res.send('...');
    }
    async getUsers(req, res) {
        pool.query("SELECT * FROM users").then(data => {
            res.json(data[0]);
        });
    }
}

module.exports = new userController();