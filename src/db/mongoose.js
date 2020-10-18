const mongoose = require('mongoose');

// creating  a database and conecting
mongoose.connect('mongodb://127.0.0.1:27017/madam-sauce-api', {
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify: false
})