$(function (){

let $container = $( '.container' );

let $newFormDiv           = $( '<div>' ).addClass('new-form');
let $newForm              = $( '<form>' ).attr( 'method', 'POST' ).attr( 'action' , '/todos' );
let $inputTaskName        = $( '<input>' ).attr( 'type' , 'text' ).attr( 'placeholder' , 'task name').attr('name', 'task_name');
let $inputTaskDesc        = $( '<input>' ).attr( 'type', 'text' ).attr( 'placeholder' , 'task description').attr('name', 'task_desc');
let $inputSubmit         = $( '<input>' ).attr( 'type' , 'submit' ).attr( 'value', 'Add Task' );

$newForm.append( $inputTaskName, $inputTaskDesc, $inputSubmit );
$newFormDiv.append( $newForm );
let $newDiv = $( '.new-div' )
console.log($newDiv);
$newFormDiv.appendTo( $newDiv );

 let seeAllToDos = function (){

   $.ajax({
     url          : '/todos',
     type         : 'GET',
     success      : function ( response ){
       let $todos = $( '<div>' ).addClass( 'todos' );

       response.forEach ( (t)=> {

         //main components of each todo
         let $todo        = $( '<div>' ).addClass( 'todo' );
         let $main        = $( '<div>' ).addClass( 'main' );
         let $moreDetails = $( '<div>' ).addClass ( 'details' ).toggle();
         let $description = $( '<p>' ).text(t.task_desc);
         let $created     = $( '<h4>' ).text('Created: ' + moment(t.task_time_created).format('dddd MMM do YYYY'));
         $moreDetails.append( $created , $description);
         let $actions     = $( '<h3>' ).addClass( 'actions' );
         let $h3          = $( '<h3>' ).text(t.task_name);

         //edit todo
         let $editPencil  = $( '<i>' ).addClass('fa fa-pencil').attr('aria-hidden','true');

         let $updateFormDiv           = $( '<div>' ).addClass('update-div').toggle(false);
         let $updateForm              = $( '<form>' ).attr( 'method', 'POST' ).attr( 'action' , '/todos/' + t.task_id + '?_method=PUT' );
         let $inputTaskName        = $( '<input>' ).attr( 'type' , 'text' ).attr( 'placeholder' , 'task name').attr('name', 'task_name').attr('value', t.task_name);
         let $inputTaskDesc        = $( '<input>' ).attr( 'type', 'text' ).attr( 'placeholder' , 'task description').attr('name', 'task_desc').attr( 'value' , t.task_desc );
         let $inputSubmit         = $( '<input>' ).attr( 'type' , 'submit' ).attr( 'value', 'Update Task' ).attr('id', t.task_id);
         $inputSubmit.on('click', updateTodo);
         $inputSubmit.on('click', function (){
           $updateFormDiv.toggle();
         });
         $updateForm.append( $inputTaskName, $inputTaskDesc, $inputSubmit );
         $updateFormDiv.append( $updateForm );
         //show hide form
         $editPencil.on('click', function (){
           $updateFormDiv.toggle('slow');
         });

         //delete components
         let $trashTask   = $( '<i>' ).addClass('fa fa-trash-o').attr('aria-hidden','true').attr('id', t.task_id);
         $trashTask.on('click', deleteTodo);
         let $diamond     = $( '<i>' ).addClass('fa fa-diamond').attr('aria-hidden','true');
         let $diamondH3   = $( '<h3>' );

         //show more less details of tasks
         $diamond.on('click', function (){
           $moreDetails.toggle('slow');
         });
         $diamondH3.append($diamond);

         //check/uncheck complete/incomplete task UI
         let $checked   = $( '<i>' ).addClass('fa fa-check-square-o').attr('aria-hidden','true');
         let $unchecked = $( '<i>' ).addClass('fa fa-square-o').attr('aria-hidden','true');
         $checked.toggle( false )
         $checked.on('click', function (){
           $checked.toggle();
           $unchecked.toggle();
           $h3.css('color' , '#030202').css('text-shadow' , '1px 1px 2px #F0DCBD');
         });
         $unchecked.on('click', function (){
           $checked.toggle();
           $unchecked.toggle();
           $h3.css('color' , '#6E6367').css('text-shadow' , 'none');
         });

         //put it all together
         $actions.append( $unchecked, $checked,  $editPencil, $trashTask);
         $main.append($diamondH3, $h3 , $actions );
         $todo.append($main, $moreDetails , $updateFormDiv);
         $todos.append($todo);
       }); // closes forEach

       $container.append($todos);
     },
     error        : function ( error ) {
      console.log( 'Sorry, there was a problem' );
     }

   }); // closes ajax request


 } //closes see all todos funtion


 seeAllToDos(); //show immedately on page load

//using form above rather than this request
 let updateTodo = function (e) {
   e.preventDefault();
   let $taskName = $(this).prev().prev().val()
   let $taskDesc = $(this).prev().val()
   let $updateName = $(this).parent().parent().parent().children().first().children().first().next().text($taskName );
   let $updateDesc = $(this).parent().parent().parent().children().first().next().children().first().next();
   let thisID = $(this).attr('id')
   $.ajax({
     url: '/todos/' + thisID,
     type: 'PUT',
     data: {
       task_name: $taskName ,
       task_desc: $taskDesc
     },
     success: function ( response ) {
      console.log('updated!');
      console.log($updateDesc);
      $updateName.text($taskName );
      $updateDesc.text($taskDesc);
      //  $taskDesc
      //change text of description
     },
     error: function ( error ) {
       console.log( error );
     }
   });
 }

 let deleteTodo = function () {
   let $removeIt = $(this)
   let thisID = $(this).attr('id')
   $.ajax({
     url: '/todos/' + thisID,
     type: 'DELETE',
     success: function ( response ) {
      $removeIt.parent().parent().parent().remove();
     },
     error: function ( error ) {
       console.log( error );
     }
   });
 }


}); // closes window on load
