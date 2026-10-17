
navigator.geolocation.getCurrentPosition(
  async(position) => { //access granted case
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var express_response =  await fetch(`/weather?latitude=${latitude}&longitude=${longitude}`);//response body contains status headers body
    var data = await express_response.json();//js object
    var display = document.getElementById("temperature");
    var temperature = `${data.temperature} ${data.unit}`;
    display.textContent = temperature;
    
    

  },
  (error) => { //access denied case
    document.getElementById("temperature").textContent = "Unable to detect your location";
  },
);
