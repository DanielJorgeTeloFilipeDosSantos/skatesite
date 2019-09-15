const express = require('express')

const hbs = require('hbs');
const path = require('path');


const app = express()

const port = 3000

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + '/views/partials')
app.use(express.static(path.join(__dirname, 'public')));

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const spotsRouter = require('./routes/map');
//const signinRouter = require('./routes/signin');

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/spots', spotsRouter);
//app.use('/signin', signinRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))