var express = require('express');
var app = express();
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "13.233.70.194",
  user: "root",
  password: "Root@1234",
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
    
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = `INSERT INTO books (book_id, book_name, book_author) VALUES (${bookId}, ${bookName}, ${bookAuthor})`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");
        });
      });

    res.send(bookName + ' Added successfully to the database');
});

app.get('/get-book', function(req, res) {
    var received;
    con.query('SELECT * FROM books', (err,rows) => {
        if(err) throw err;
      
        console.log('Data received from Db:');
        console.log(rows);
        rows = received;
      });
      res.send(`
              <tr>
                <th scope="row">${received.book_id}</th>
                <td>${received.book_name}</td>
                <td>${received.book_author}</td>
              </tr>`);
});

app.listen(5000);

