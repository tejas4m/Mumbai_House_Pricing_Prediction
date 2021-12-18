function getBathValue() {
    var uiBathrooms = document.getElementById("Bathrooms");
   // console.log(uiBathrooms)
    
          return parseInt(uiBathrooms.value);
          
      
    return -1; // Invalid Value
  }
  
  function getBHKValue() {
    var uiBHK = document.getElementById("Bedrooms");
 //   console.log("uibhk " + uiBHK.value)
     
          return parseInt(uiBHK.value);
      
    
    return -1; // Invalid Value
  }
  
  function onClickedEstimatePrice() {
      try{
    console.log("Estimate price button clicked");
   // console.log("getBHKValue " + getBHKValue());

    var sqft = document.getElementById("sqft");
    var bhk = getBHKValue();
    var bathrooms = getBathValue();
    var location = document.getElementById("uiLocations");
    var estPrice = document.getElementById("uiEstimatedPrice");
  
    //var url = "http://127.0.0.1:5000/predict_home_price"; //Use this if you are NOT using nginx which is first 7 tutorials
    var url = "/api/predict_home_price"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
  
    $.post(url, {
        total_sqft: parseFloat(sqft.value),
        bedroom : bhk,
        bathroom : bathrooms,
        location: location.value
    },function(data, status) {
        console.log(data.estimated_price);
        estPrice.innerHTML = "<h2>" + (Math.round(data.estimated_price/1000)/100).toString() + " Lakh</h2>";
        console.log(status);
    });
}
    catch (e) {
        console.log("predict error");

        console.log("Error", e.stack);
        console.log("Error", e.name);
        console.log("Error", e.message);
    }
  }
  
  function onPageLoad() {
    try {
        console.log( "document loaded" );
        //var url = "http://127.0.0.1:5000/get_location_names"; // Use this if you are NOT using nginx which is first 7 tutorials
      var url = "/api/get_location_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
       $.get(url,function(data, status) {
           console.log("got response for get_location_names request");
           if(data) {
               var locations = data.locations;
               var uiLocations = document.getElementById("uiLocations");
            //   $('#uiLocations').empty();
               for(var i in locations) {
                   var opt = new Option(locations[i]);
                   $('#uiLocations').append(opt);
               }
           }
       });
    }
    catch (e) {
        console.log("tejass");

        console.log("Error", e.stack);
        console.log("Error", e.name);
        console.log("Error", e.message);
    }
   
  }
  
  window.onload = onPageLoad;