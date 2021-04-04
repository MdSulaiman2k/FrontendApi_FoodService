var jsarray = []
var scroll = 0 
var rescontainer = document.getElementById("restaurantContainer")

$(window).scroll(function() {
  tHeight = document.body.offsetHeight;
rHeight = Math.floor(window.innerHeight + window.scrollY)
if (rHeight > tHeight) {
        console.log("ingayum varuthu")
        $.ajax({
            url: 'http://localhost:3000/api/v1/restaurants',
            method: 'GET',
            dataType: 'json',
            data : "id=" + scroll  ,
            success: function(data , status){
                   console.log(data , $("#myonoffswitch").val())
                   scroll++ 
                    jsarray = data["data"]  
                    if(jsarray.length >= 1)
                       render(jsarray)
            },
            async : false 
          });
    }
});

const render = (data) => {
     var component  = " <div   class= \"row\">" ;
     for(var i = 0 ; i < data.length ;i++){
      component += "<div id= \"" + data[i].id +"\" class =\"col col-lg-3 col-md-3 col-sm-4\">"  + "<a href=\"Food.html\"  class=\"atag\"><img class = \"imgitems\" src=" + 
         data[i].hotelimg + "/>" + "<h5 class =\"hot-name\">" +  data[i].hotelname + "</h5>" + "<p class=\"hot-cat\">" +
         data[i].hotel_cate + "</p>" + "<p><span class=\"hot-rating\" ><i class=\"far fa-star\"></i>" + 
         data[i].rating + "</span></p> <hr /></a> </div>"
     }
     component += "</div>"
     rescontainer.insertAdjacentHTML('beforeend' , component  ) 
}

$(".col").on("click" , function(){
    
});



// const components = (data) =>{
//    return '<div  className="col col-lg-3 col-md-3 col-sm-4">' + 
//    '<img class = "imgitems" src=' + data.hotelimg  + '/>' +
//    '<h5 className="hot-name">'+ data.hotelname + '</h5>' + 
//    '<p className="hot-cat">' + data.hotelCate + '</p>' +
//    '<p><span className="hot-rating" ><i class="far fa-star"></i>' + data.rating + ' </span></p>' + 
//    '<hr /> </div>'  
//   }

  