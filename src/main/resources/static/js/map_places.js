let map;

function initMap() {
    /*map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 60.192059, lng: 24.945831},
      zoom: 8
    });*/
}

function initPlaces(places) {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 60.192059, lng: 24.945831},
      zoom: 4
    });

    for (let i = 0; i < places.length; i++) {
        const marker = new google.maps.Marker({
            position: {lat: parseInt(places[i].latitude), lng: parseInt(places[i].longitude)},
            map: map,
            title: places[i].title
        });

        const infoWindow = new google.maps.InfoWindow({
            content: "<h1>" + places[i].title + "</h1>"
                + "<p>" + places[i].description + "</p>"
                + "<p>" + places[i].openingHours + "</p>"
        });

        marker.addListener("click", function() {
            if (infoWindow) {
                infoWindow.close();
            }
            infoWindow.open(map, marker);
        });
    }
}

function addPlace() {
	const title = document.getElementById("placeTitle").value;
	const description = document.getElementById("placeDescription").value;
	const latitude = document.getElementById("placeLatitude").value;
	const longitude = document.getElementById("placeLongitude").value;
	const openingHours = document.getElementById("placeOpeningHours").value;
	const latLng = {lat: parseInt(latitude), lng: parseInt(longitude)};

	const infoWindow = new google.maps.InfoWindow({
		content: "<h1>" + title + "</h1>"
			+ "<p>" + description + "</p>"
			+ "<p>Open: " + openingHours + "</p>"
	});

	const marker = new google.maps.Marker({
	  position: latLng,
	  map: map,
	  title: title
	});

	marker.addListener("click", function() {
	    infoWindow.open(map, marker);
	});

    fetch("/add_place", {
       method: "POST",
       body: JSON.stringify({
         title: title,
         description: description,
         latitude: latitude,
         longitude: longitude,
         openingHours: openingHours
       }),
       headers: {
         "content-type":"application/json; charset=UTF-8"
       }
    })
        .then(function(res){
           return res.json();
        }).then(function(data){
           console.log("Place added!");
           console.log(data);
        }).catch((error) => {
           console.log(error);
        });

    fetch("/get_places", {
        method: "GET"
    })
        .then(function(res) {
            console.log("RES");
            console.log(res);
            return res;
        }).then(function(data) {
            console.log("DATA");
            console.log(data);
            document.querySelector("#places").innerHTML = data;
        }).catch((error) => {
            console.log(error);
        });
}

function toggleAddPlaceForm() {
	var addPlaceForm = document.getElementById("addPlaceForm");
	if (addPlaceForm.style.display === "block") {
	    addPlaceForm.style.display = "none";
	} else {
	    addPlaceForm.style.display = "block";
	}
}