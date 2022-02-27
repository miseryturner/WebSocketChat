const WebSocet = require('ws');
const express = require('express');
const app = express();
const PORT = 5000;
const router = require('./router');
const pool = require('./database/connect')

app.listen(PORT, () => {
   console.log(`Server start on port: ${PORT}`);
})

app.use('/api', router);

app.get('/', (req, res) => {
   pool.query("SELECT * FROM users").then(data => {
      res.json(data[0]);
   });
})


//websocket server
const server = new WebSocet.Server({ port: 3000 });

server.on('connection', ws => {
   ws.on('message', message => {
      console.log(message)
      server.clients.forEach(client => {
         if(client.readyState === WebSocet.OPEN) {
            pool.query("SELECT * FROM users").then(data => {
               let idUser = data[0][0].id;

               client.send(JSON.stringify({
                  message: JSON.parse(message).message,
                  id_user: idUser,
                  id_chat: JSON.parse(message).id_chat,
               }));
            });
         }
      });
   })
   ws.send('You have connected to the websocket server');
   console.log('new-user')
});