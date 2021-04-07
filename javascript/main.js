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

const privacycom = () => {
    return ("<div class=\"container-fluiod\" style=\"margin-top:2rem;background-color: #e9e9eb;display: inline-block;height: 18rem;width: 100%;padding:2rem;line-height: 1.6;\">\
    We ( Bundl Technologies Private Limited, alias \"FoodService\" ) are fully committed to respecting your privacy and shall ensure that your personal information is safe with us. This privacy policy sets out the information practices of www.FoodService.com (\"Website\") including the type of information is collected, how the information is collected, how the information is used and with whom it is shared. Reference to \"you\" in this Privacy Policy refers to the users of this Website whether or not you access the services available on the Website or consummate a transaction on the Website. By using or accessing this Website, you agree to the terms and conditions of this Privacy Policy. You also expressly consent to our use and disclosure of your Personal Information (as defined below) in any manner as described in this Privacy Policy and further signify your agreement to this Privacy Policy and the Terms of Use (being incorporated by reference herein). If you do not agree with the terms and conditions of this Privacy Policy, please do not proceed further or use or access this Website.\
  </div>")
  }
  

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
              $(".privacy").html(privacycom())
            }
    },
    error: function(status){
     
      $("#restaurantContainer").html("<center><div style='position:relative;left:-40px'><h5>Oh! There’s not much left</h5><br>\
      We can’t find anything related to your search.<br>\
      Try a different search.</div></center>")
      $(".privacy").html(privacycom())
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
            else if(jsarray.length == 0)  $(".privacy").html(privacycom())
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
   component += "<div id= \"rest" + data[i].id +"\"    class =\"col col-lg-3 col-md-3 col-sm-4 bg-light\">"  + " <img class = \"imgitems\" src=" + 
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
    $(".privacy").html(privacycom())
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
else if ((document.body.scrollTop > 50 || document.documentElement.scrollTop > 50)   && !nodata ) {
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

  