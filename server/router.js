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
router.get('/chat/:id', chatController.getChat);

//messages
router.post('/send-message', messageController.sendMessage);
router.get('/messages', messageController.getMessages);

module.exports = router;