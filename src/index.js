const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/users');
const adminRouter = require('./routers/admin')


// creating my app
const app = express()

// creating the port for my heroku deployment and local host
const port = process.env.PORT || 3030;

// serving my json files
app.use(express.json())

// serving up the routes
app.use(userRouter);
app.use(adminRouter);



// listening to port for request and sending response
app.listen(port, ()=> {
    console.log('server is up on port', port)
})