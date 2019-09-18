const express = require('express')

const hbs = require('hbs');
const path = require('path');

const expressSession = require('express-session');

const mongoose = require('mongoose')

const app = express()
const port = 3000;

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + '/views/partials')
app.use(express.static(path.join(__dirname, 'public')));

// authorization
// app.use(expressSession({
//   secret: process.env.SESSION_SECRET ,
//   // cookie: { maxAge: 60 * 60 * 1000 },
//   resave: true,
//   saveUninitialized: false,
//   store: new MongoStore({
//     mongooseConnection: mongoose.connection,
//     ttl: 24 * 60 * 60
//   })
// }));


const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const spotsRouter = require('./routes/map');


app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/spots', spotsRouter);



app.listen(port, () => console.log(`Example app listening on port ${port}!`))


const server = '127.0.0.1:27017'; // REPLACE WITH YOUR DB SERVER
const database = 'fcc-Mail';      // REPLACE WITH YOUR DB NAME

class Database {
  constructor() {
    this._connect()
  }
  
_connect() {
     mongoose.connect(`mongodb://${server}/${database}`)
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })
  }
}

module.exports = new Database()