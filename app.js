const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const mongoConnect = require('./util/database').mongoConnect;

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const callRecordRouter = require('./routes/callRecordRouter');
const get404 = require('./routes/errorRouter');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {  
  next();
});


app.use(callRecordRouter);

app.use(get404);

mongoConnect(() => {
  app.listen(3000, ()=>{
      console.log("Server is running on 3000 port");
  });
});
