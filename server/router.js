const Router = require('express');
const router = new Router;
const userController = require('./controllers/userController');
const chatController = require('./controllers/chatController');
const messageController = require('./controllers/messageController');

//users
router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.post('/users', userController.getUsers);

//chats
router.post('/create-chat', chatController.createChat);
router.get('/chats', chatController.getChats);

//messages
router.get('/messages', messageController.getMessages);

module.exports = router;