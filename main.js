var express = require('express');
var app = express();
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "13.233.70.194",
  user: "root",
  password: "Root@12345",
  database: "bookstore"
});

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.sendFile(__dirname +'/index.html');
});

app.post('/submit-book', function (req, res) {
    var bookId = String(req.body.bookId);
    var bookName = String(req.body.bookName);
    var bookAuthor = String(req.body.bookAuthor);
    
    res.send(bookName + ' Added successfully to the database');
});

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = `INSERT INTO books (book_id, book_name, book_author) VALUES (${bookId}, ${bookName}, ${bookAuthor})`;
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
//   });
// });

app.listen(5000);

