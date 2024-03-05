const { startDatabase, stopDatabase, isConnected } = require('./db');
const {getRouter,postRouter,patchRouter,deleteRouter} = require(`./routes/routes`);
const bodyparser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser');


require('dotenv').config()
const express = require('express');
const app = express();
const port = 3000;

app.use(cookieParser());
app.use(bodyparser.json())
app.use(cors())
app.use("/",getRouter)
app.use("/",postRouter)
app.use("/",patchRouter)
app.use("/",deleteRouter)

app.post('/login', (req, res) => {
  const { username } = req.body;
  res.cookie('username', username);
  res.send('Login successful');
});

// Logout endpoint
app.get('/logout', (req, res) => {
  res.clearCookie('username');
  res.send('Logout successful');
});

app.get('/', (req, res) => {
  res.json({
    message: 'o_O',
    database: isConnected() ? 'connected' : 'disconnected'
  })
});

  
  app.get('/ping', (req, res) => {
    res.send('pong');
  });
  
  app.listen(port, async () => {
    await startDatabase();

    console.log(`🚀 server running on PORT: ${port}`);
  });



module.exports = app;
