const WebSocket = require('ws');
const express = require('express');
const app = express();
const PORT = 5000;
const router = require('./router');
const pool = require('./database/connect');
const bodyParser = require('body-parser');
const formidable = require('express-formidable');
const cors=require("cors");
const corsOptions ={
   origin:'*',
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.listen(PORT, () => {
   console.log(`Server start on port: ${PORT}`);
});


app.use(cors(corsOptions)) // Use this after the variable declaration
app.use(formidable());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', router);

app.get('/', (req, res) => {
   pool.query("SELECT * FROM users").then(data => {
      res.json(data[0]);
   });
})

//websocket server
const server = new WebSocket.Server({ port: 3000 });

// получаем с клиента текст сообщения, айди отправителя, айди чата
server.on('connection', ws => {
   ws.on('message', message => {
      console.log(message)

      pool.query(`INSERT INTO messages (text, from_user_id , chat_id) VALUES ('${JSON.parse(message).message}', '${JSON.parse(message).id_user}', '${JSON.parse(message).id_chat}')`);
      server.clients.forEach(client => {
         if(client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
               message: JSON.parse(message).message,
               id_user: JSON.parse(message).id_user,
               id_chat: JSON.parse(message).id_chat,
            }));
         }
      });
   })
   ws.send('You have connected to the websocket server');
   console.log('new-user')
});