// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const app = express();
// const booksModel = require("./models/BooksDB");

// app.use(express.json());
// app.use(cors());


// mongoose.connect("mongodb+srv://madhavi:iwonttell@cluster0.jy6q1m7.mongodb.net/booksDB?retryWrites=true&w=majority",{useNewUrlParser:true});

// app.post("/insert",async(req,res) => {
//     console.log("hello");
//     const bookId = req.body.bookId;
//     const bookName = req.body.bookName;
//     const author = req.body.author;
//     const publisher = req.body.publisher;
//     const editor = req.body.editor;
//     const language = req.body.language;
//     const numCopies = req.body.numCopies;

//     console.log(bookName);
//     console.log(author);

//     const book = new booksModel({bookId:bookId,bookName:bookName,author:author,publisher:publisher,editor:editor,language:language,numCopies:numCopies});
//     try{
//         await book.save();
//         res.send("inserted data");

//     }catch(err){
//         console.log(err);
//     }
// });

// app.get("/getbooks",async(req,res) => {
//    console.log("INRAED");
//     booksModel.find({})
//     .then(booklist=> res.json(booklist))
//     .catch(err=>res.json(err));
// })

// app.listen(3001, ()=>{
//     console.log("server running on port 3001 ... ")
// });     


import express from 'express';
import cors from 'cors';
import session from "express-session";
import mysql from 'mysql2';

const app = express();
app.use(express.json());
app.use(
    cors({
     // origin: 'https://a5--famous-kheer-8b1fff.netlify.app'
     origin: 'http://localhost:3000'
    })
   );
   const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
  };
  // app.use(
  //   session(sessionOptions)
  // );
  app.use(
    session({
      secret: "any string",
      resave: false,
      proxy: true,
      saveUninitialized: false,
      cookie: {
        sameSite: "none",
        secure: true
      }
    })
    
   );

const db = mysql.createConnection({
host: "chaitanya-library.czvm9mknoalm.ap-south-1.rds.amazonaws.com",
user: "admin",
password: "rootroot",
database:"booksDB",
port:3306
})

function query(query) {
    db.query(query, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
      }
      //inquire();
    });
  }
    
  function connect() {
    db.connect((error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Connected to SQL');
        //inquire();
      }
    });
  }
  
  connect();

// Route for creating the post
app.post('/api/insert', (req,res)=> {
console.log("HEREEE");
const bookId = req.body.bookId;
const bookName = req.body.bookName;
const bookRefNo = req.body.bookRefNo;
const author = req.body.author;
const publisher = req.body.publisher;
const numPages = req.body.numPages;
const language = req.body.language;
const volume = req.body.vol;
const extraInfo = req.body.extraInfo;
const keywords = req.body.keywords;
const imgLink = req.body.imgLink;


var sql = `INSERT INTO booksinfo (bookId, bookName, bookRefNo, author, publisher, numPages, bookLanguage, vol, extraInfo, keywords, imgLink) VALUES (?,?,?,?,?,?,?,?,?,?,?)`;
db.query(sql, [bookId,bookName,bookRefNo,author,publisher,numPages,language,volume,extraInfo,keywords,imgLink], function(err,result) {
  if(err) {
    console.log(err)
    } 
    else{
    console.log(result)
    }
});
});


app.listen(4000, ()=>{
  console.log(`Server is running on 4000`);
});


