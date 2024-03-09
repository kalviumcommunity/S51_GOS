const { startDatabase, stopDatabase, isConnected } = require('./db');
const {getRouter,postRouter,patchRouter,deleteRouter} = require(`./routes/routes`);
const bodyparser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');


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


// app.post('/login', (req, res) => {
//   const { username } = req.body;
//   res.cookie('username', username);
//   res.send('Login successful');
// });

// app.get('/logout', (req, res) => {
//   res.clearCookie('username');
//   res.send('Logout successful');
// });

app.get('/', (req, res) => {
  res.json({
    message: 'o_O',
    database: isConnected() ? 'connected' : 'disconnected'
  })
});

app.post('/auth', (req, res) => {
  const { username, password } = req.body;
  const token = jwt.sign({ username: username },process.env.ACCESS_TOKEN);
  res.send({ token });
  res.cookie('token', token);

});
  
  app.get('/ping', (req, res) => {
    res.send('pong');
  });
  
  app.listen(port, async () => {
    await startDatabase();

    console.log(`🚀 Full Stack Magic Unleashed! Server conquering PORT: 💻✨ ${port}`);
  });




module.exports = app;
