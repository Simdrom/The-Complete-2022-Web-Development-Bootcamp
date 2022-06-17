// $("h1").css("color", "red");
$("h1").addClass("big-title margin-50");
// $("h1").removeClass("big-title");

if ($("h1").hasClass("big-title")){
  console.log("h1 has class big-title");
}

$("h1").text("Hello World");
// $("button").text("DON'T Click Me");
// $("button").html("<p>DON'T Click Me 2</p>");
// $("button").attr("disabled", true);
$("a").attr("href", "https://www.google.com");

// $("button").on("click",function(){
//   // $("h1").css("color", "blue");
//   $("h1").toggleClass("blue-text");
//   $("h1").slideToggle();
// });

$("input").keypress(function(event){
  // $("h1").text($("input").val(event.key));
  //Change the h1 text to the value of the input
  if (event.key === "Enter"){
    $("h1").text($("input").val());
  }

  console.log(event);
  // if (event.which === 32){ //Si presionamos espacio en el teclado se ejecuta la funcion de abajo
  //   $("h1").toggleClass("blue-text");
  // }
});

$("h1").click(function(){
  $("h1").text("Hello World");
  // $("input").val()="";
  // Set the input value to empty string
  $("input").val("Hello World");
});

$("#animate").on("click", function(){
  $("h1").slideUp().slideDown().animate({opacity: 0.1}, 3000);
})