jsarray = []
restaurants = sessionStorage.getItem("restaurants").slice(4)
var screenscroll = 0 
var reqdata = 3 
var nodata = false 
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



 const foodcomponents = (jsarray) => {
     return '<div id="div'+ jsarray.id + '" class="row foodcontainer" >\
     <div class="col col-lg-8 col-sm-8 col-md-8 col-8">\
      <p class="foodcontainer-rating"><i class="far fa-star"></i>  '+ jsarray.foodrating+ '</p>\
      <h5 class="foodcontainer-name">' + jsarray.foodname + '</h5>\
      <p class="foodcontainer-descriptaion">'+ jsarray.foodtype+ '<span style="padding-left:1rem">  '+jsarray.fooddes + '    </span></p>\
      <p class="foodcontainer-price">&#x20B9  '+ jsarray.foodprice +'</p>\
      <btn id="dec' + jsarray.id  + '" class="btn btn-sub btn-light">-</btn>\
      <div id="add'+ jsarray.id  +'" class="btn btn-icre-decre btn-light" value="0">add</div>\
      <button id="inc' + jsarray.id + '"class="btn btn-add btn-light">+</button>\
     </div>\
     <div class="col col-lg-3 col-md-3 col-sm-3 col-3">\
         <div style="width:200px;height:200px;">\
         <img src="'+ jsarray.foodimgsrc + '" class="foodcontainer-image"/>\
         </div>\
     </div>\
 </div>'
 }

 const setfoodcontainer = (data) => {
      screenscroll++ ;
      for(var i = 0 ; i < data.length ; i++){
          let container = document.getElementById("container")
          container.insertAdjacentHTML('beforeend' , foodcomponents(data[i])  ) 
      }

 };

 const foodcontainer = ( reqdata ) => {
     console.log(restaurants)
     $.ajax({
         url: "http://localhost:3000/api/v1/fooddetails/"+ restaurants ,
         method: "GET" ,
         dataType: "json" ,
         data : {page: screenscroll  , data: reqdata }  ,
         success: function(data , status){
            if(data.data.length != 0 )
               setfoodcontainer(data.data)  
            else
               nodata = true  
         },
         async : false 
     });
 }
 
 foodcontainer( reqdata) ;


 $(document).on("click",".btn-icre-decre", function(){ 
     let identy = this.id 
     let val = $("#" + identy).html()
     let id = identy.slice(3)
     
     if(val == "add"){
        $("#" + identy).html(1) ;
        $("#inc" + id).css("visibility" , "visible")
        $("#dec" + id).css("visibility" , "visible")
     }
 });


 $(document).on("click" , ".btn-sub" , function(){
    let identy = this.id 
    let id = identy.slice(3)
    let val = parseInt($("#add" + id).html())-1
    if(val == 0){
        val = "add" 
        $("#inc" + id).css("visibility" , "hidden")
        $("#"+identy).css("visibility" , "hidden")
    }
    $("#add" + id).html(val) 
 });

 $(document).on("click" , ".btn-add" , function(){
     let identy =this.id
     let id = identy.slice(3)
     let val = parseInt($("#add" + id).html())+1
     $("#add" + id).html(val) 

 });

 $(window).scroll(function() {

    if((document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) && !nodata){
        console.log("screen scroll :" +screenscroll)
        foodcontainer( 3)
    }
 });



 
