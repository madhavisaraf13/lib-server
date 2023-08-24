import express from 'express';
import cors from 'cors';
import session from "express-session";
import mysql from 'mysql2';

const app = express();
app.use(express.json());
app.use(  
    cors({
     // origin: 'https://a5--famous-kheer-8b1fff.netlify.app'
     origin: 'https://majestic-faun-06d727.netlify.app'
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


