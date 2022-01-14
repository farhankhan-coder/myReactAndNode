const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config({ path: "./config.env" });

require('./db/conn');

app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser());
app.use(
	cors({
		credentials: true
	})
);

// adding router to make links and route easy to navigate 
app.use(require('./router/auth'));


//middleware Fucntion with fat arrow func
const myMiddleWare = (req,res,next) => {
    console.log("I am the middleWare");
    next();
}

// to use myMiddleWare we need to call use method 
// app.use(myMiddleWare);

// app.get("/",myMiddleWare, (req, res) => {
//     res.send("Hello Backend Server");
// });

app.get("/about", (req,res) => {
    res.send("Hello to the about us page");
});


const port = process.env.PORT;
app.listen(port, () => {
    console.log(`backend is running at port no ${port}`);
});