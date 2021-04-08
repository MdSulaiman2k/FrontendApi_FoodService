jsarray = []
restaurants = sessionStorage.getItem("restaurants").slice(4)
$.ajax({
    url: 'http://localhost:3000/api/v1/restaurants/'+ restaurants,
    method: 'GET',
    dataType: 'json',
    data : {page: 1  , data: 1 }  ,
    success: function(data , status){
            jsarray = data.data 
            console.log(jsarray)  
            loadRes(jsarray) 
    }
});

const loadRes =  (jsarray) => {
    $(".foodhead").html(jsarray[0].hotelname)
    $(".fooddes").html(jsarray[0].hotel_cate)
    $(".foodloc").html(jsarray[0].hotel_address)
    $(".foodrating").html("<i class=\"far fa-star\"></i>           " + jsarray[0].rating)
    $(".foodimg").attr( "src" , jsarray[0].hotelimg)
}

$(".btn-icre-decre").click(function(){
    let val = $(".btn-icre-decre").html()

   
    if(val == "add"){
       $(".btn-add").css("visibility" , "visible" )
       $(".btn-sub").css("visibility" , "visible" )
       $(".btn-icre-decre").html(1)
    }
});

$(".btn-add").click(function(){
   
});