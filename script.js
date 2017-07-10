
		 function initGeolocation(){
	        if( navigator.geolocation ){
	           // Call getCurrentPosition with success and failure callbacks
	           navigator.geolocation.getCurrentPosition( success, fail );
	        }
	        else{
	           alert("Sorry, your browser does not support geolocation services.");
	        }
	     }

	     function success(position){

			var xmlhttp = new XMLHttpRequest();
			var url = "http://api.openweathermap.org/data/2.5/forecast?lat="+position.coords.latitude+"&lon="+position.coords.longitude+"&APPID=4c51b29b1a2de2dca576a536a7bc41d3";

			console.log(url);
			

			xmlhttp.onreadystatechange = function() {
			    if (this.readyState == 4 && this.status == 200) {
			        var data = JSON.parse(this.responseText);
			        var kelvin = data.list[0].main.temp;
			        var fh = Math.round(kelvin*(9/5)-459.67);
			        document.getElementById('temp').innerHTML = '<span id="fh">'+ fh + '</span>' + " &#8457; <button class=\"btn btn-primary\" onClick=\"changeToCelsius()\">Change to Celsius</button>" ;
			        var city = data.city.name;
			        document.getElementById('city').innerHTML = city;
			        var type = data.list[0].weather[0].description;
			        document.getElementById('type').innerHTML = type;
			        var imagePath = data.list[0].weather[0].icon;
			        document.getElementById('img').innerHTML = '<img src="' + getImagePath(imagePath) + '.png" alt="Current Weather Icon"/>';
			        console.log('<img src="' + getImagePath(imagePath) + '.png" alt="Current Weather Icon"/>');
			    }
			};
			xmlhttp.open("GET", url, true);
			xmlhttp.send();
	         
	     }

	     function fail(){
	        alert("Sorry, we could not receive your location at this time.");
	     }

	     function getImagePath(path){
	     	var path = "http://openweathermap.org/img/w/" + path;
	     	return path;
	     }

	     function changeToCelsius() {
	     	var cel = Math.round((document.getElementById('fh').innerHTML -32) * (5/9));
	     	document.getElementById('temp').innerHTML = '<span id="cel">'+ cel + '</span>' + " &#8457; <button class=\"btn btn-primary\" onClick=\"changeToFH()\">Change to Fahrenheit</button>";
	     }

	     function changeToFH(){
	     	var fh = Math.round((document.getElementById('cel').innerHTML* (9/5)) + 32);
	     	document.getElementById('temp').innerHTML = '<span id="fh">'+ fh + '</span>' + " &#8457; <button class=\"btn btn-primary\" onClick=\"changeToCelsius()\">Change to Celsius</button>";
	     }

	     initGeolocation();

