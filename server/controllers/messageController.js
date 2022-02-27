const pool = require('../database/connect');

class messageController {
    async sendMessage(req, res) {
        res.send('...');
    }
    async getMessages(req, res) {
        res.send('...');
    }
}

module.exports = new messageController();