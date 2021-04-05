var jsarray = []
var scroll = 0 
var searchscroll = 0 
var rescontainer = document.getElementById("restaurantContainer")
console.log($("#searchquery").val())
var n = new Date().getHours()
nodata  = false 
var t = "D"
if(n < 11)
  t = "B" 
else if(n < 15)
  t = "L"
else if(n < 18)
  t = "S"

console.log(t , n)
const sendreqforresdata = (reqdata , reqtime) => {
  $.ajax({
    url: 'http://localhost:3000/api/v1/restaurants',
    method: 'GET',
    dataType: 'json',
    data : {page: scroll  , time : reqtime , data: reqdata }  ,
    success: function(data , status){
            jsarray = data["data"]  
            if(jsarray.length >= 1)
               render(jsarray)
            else{
               nodata = true
               if(scroll == 0){
                $("#restaurantContainer").html("<center><div style='position:relative;left:-40px'><h5>Oh! There’s not much left</h5><br>\
                We can’t find anything related va to your search.<br>\
                Try a different search.</div></center>")
              }
            }
    },
    error: function(status){
      $("#restaurantContainer").html("<center><div style='position:relative;left:-40px'><h5>Oh! There’s not much left</h5><br>\
      We can’t find anything related to your search.<br>\
      Try a different search.</div></center>")
    },
    async : false 
  });
}

const searchingquery = (reqsearch , reqdata , reqtime ) =>{
  $.ajax({
    url: 'http://localhost:3000/api/v1/restaurants/'+ reqsearch,
    method: 'GET',
    dataType: 'json',
    data : {page: searchscroll ,time: reqtime , data: reqdata }  ,
    success: function(data , status){
            jsarray = data["data"]  
            console.log(jsarray.length , searchscroll)
            if(jsarray.length == 0 &&  searchscroll == 0 ){
                $("#restaurantContainer").html("<center><div style='position:relative;left:-40px'><h5>Oh! There’s not much left</h5><br>\
                We can’t find anything related to your search.<br>\
                Try a different search.</div></center>")
            }
            else{
            render(jsarray) }
    },
    async : false 
  });
}




const render = (data) => {
  var component  = " <div   class= \"row\">" ;
  scroll++
  searchscroll++ ;
  for(var i = 0 ; i < data.length ;i++){
   component += "<div id= \"" + data[i].id +"\"    class =\"col col-lg-3 col-md-3 col-sm-4 bg-light\">"  + " <img class = \"imgitems\" src=" + 
      data[i].hotelimg + "/>" + "<h5 class =\"hot-name\">" +  data[i].hotelname + "</h5>" + "<p class=\"hot-cat\">" +
      data[i].hotel_cate + "</p>" + "<p><span class=\"hot-rating\" ><i class=\"far fa-star\"></i>" + 
      data[i].rating + "</span></p> <hr /></a> </div>"
  }
  component += "</div>"
  if(searchscroll != 1){
     rescontainer.insertAdjacentHTML('beforeend' , component  ) 
  }
  else{
    $("#restaurantContainer").html(component);
  }
  if(data.length > 3){
     scroll++
     searchscroll++; 
  }
  

}
sendreqforresdata(6 , t)

$(window).scroll(function() {
  tHeight = document.body.offsetHeight;
rHeight = Math.floor(window.innerHeight + window.scrollY)
if($("#searchquery").val() != ""){
     searchingquery( $("#searchquery").val() , 3 , t)
    }
else if (rHeight > tHeight  && !nodata ) {
       sendreqforresdata(3 , t) ;
    }
});

$("#search").click(function(){
  if($("#searchquery").val() != ""){
      searchscroll = 0 
      console.log($("#searchquery").val())
      searchingquery( $("#searchquery").val() , 3 , t)
  }
  else{
    sendreqforresdata(3 , t) ;
  }
});

$("input").keypress(  function(){
  if(event.key === 'Enter'){
   if($("#searchquery").val() != ""){
      searchscroll = 0 
      console.log($("#searchquery").val())
      searchingquery( $("#searchquery").val() , 3 , t)
  }
  else{
    sendreqforresdata(3 , t) ;
  }}
});



$(document).on("click",".col", function() {
  sessionStorage.setItem("restaurants" , this.id )
  console.log(this.id)
  window.location = "food.html"
});






// const components = (data) =>{
//    return '<div  className="col col-lg-3 col-md-3 col-sm-4">' + 
//    '<img class = "imgitems" src=' + data.hotelimg  + '/>' +
//    '<h5 className="hot-name">'+ data.hotelname + '</h5>' + 
//    '<p className="hot-cat">' + data.hotelCate + '</p>' +
//    '<p><span className="hot-rating" ><i class="far fa-star"></i>' + data.rating + ' </span></p>' + 
//    '<hr /> </div>'  
//   }

  