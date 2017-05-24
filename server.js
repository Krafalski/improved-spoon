//Dependencies
const bodyParser        = require ( 'body-parser' );
const dotenv            = require ( 'dotenv' );
const express           = require ( 'express' )
const methodOverride    = require( 'method-override' );
const pgp               = require ( 'pg-promise' );
const app               = express();

//Port
const port              = process.env.PORT || 3333;

//Database
const db                = require( './db/pg-prom.js' );

//Middleware
dotenv.load();

app.use ( bodyParser.urlencoded( { extended:false } ) );

app.use ( express.static ( 'public' ) );

app.use (methodOverride ( '_method' ) );


//routes
app.get ( '/' , ( req, res ) => {
  res.sendFile ( 'index.html' );
});

//index
app.get ( '/todos' , db.showTodos, ( req , res ) => {
  res.send ( res.rows );
});

//show one
app.get ('/todos/:id' , db.showTodo, ( req , res ) => {
  res.send ( res.row );
});

//create one
app.post ( '/todos' , db.createTodo, ( req , res ) => {
  res.redirect ( 'back' );
});

//update one
app.put ('/todos/:id' , db.updateTodo, ( req , res ) => {
  res.send ( 'ok' );
});

//delete one
app.delete ('/todos/:id' , db.deleteTodo, ( req , res ) => {
  res.send ( 'ok' );
});

//heroku deployment - check connection - no debugging available for pg-promise yet
// var pg = require('pg');
//
// app.get('/db', function (request, response) {
//   pg.connect(process.env.DATABASE_URL, function(err, client, done) {
//     client.query('SELECT * FROM todos', function(err, result) {
//       done();
//       if (err)
//        { console.error(err); response.send("Error " + err); }
//       else
//        { response.render('pages/db', {results: result.rows} ); }
//     });
//   });
// });

//listen
app.listen ( port , () => console.log( 'Get things done on port' , port , '//' , new Date() ) );
