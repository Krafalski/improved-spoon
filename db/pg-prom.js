const pgp               = require ( 'pg-promise' )({});


const cn                =  process.env.DATABASE_URL || {
  host    : process.env.HOST,
  port    : process.env.PORT,
  database: 'todos',
  user    : process.env.USER,
  password: process.env.DB_PASSWORD
}

const db                = pgp(cn)

function showTodos ( req, res, next ){
  db.many ( "SELECT * FROM todo" )
    .then(  ( data ) => {
      res.rows = data;
      next();
    })
    .catch( ( error ) => {
      console.log ( error );
    });
}

function showTodo ( req, res, next ){
  db.query ( "SELECT * FROM todo WHERE task_id=${id}" , req.params )
    .then(  ( data ) => {
      res.row = data;
      next();
    })
    .catch( ( error ) => {
      console.log ( error );
    });
}

function createTodo ( req , res , next ){
  db.none ( 'INSERT INTO todo (task_name, task_desc) VALUES (${task_name}, ${task_desc} )'  , req.body)
    .then ( ( data ) => {
      res.rows = data;
      next ();
    })
    .catch ( ( error ) => {
      console.log( error );
    });
}

function updateTodo ( req , res , next ){

  db.any ('UPDATE todo  SET task_name=$2, task_desc=$3 WHERE task_id=$1',  [req.params.id, req.body.task_name, req.body.task_desc])
  .then ( ( data ) => {
    res.rows = data;
    next ();
  })
  .catch ( ( error ) => {
    console.log( error );
  });
}

function deleteTodo ( req , res , next ){
  db.oneOrNone( 'DELETE FROM todo WHERE task_id=${id}' , req.params )
    .then(  ( data ) => {
      res.row = data;
      next();
    })
    .catch( ( error ) => {
      console.log ( error );
    });
}

module.exports.showTodos = showTodos;
module.exports.showTodo = showTodo;
module.exports.createTodo = createTodo;
module.exports.updateTodo = updateTodo;
module.exports.deleteTodo = deleteTodo;
