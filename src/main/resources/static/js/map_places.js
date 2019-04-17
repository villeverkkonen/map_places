let map;
let markers = [];
let placesList = [];

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
        placesList.push(places[i]);
    }

    createMarkers(places);
    console.log("init Places placesList: ");
    console.log(placesList);
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

	markers.push(marker);
	console.log("addPlace MARKERS length: " + markers.length)

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
           return res.text();
        }).then(function(data){
           document.querySelector("#placesList").innerHTML = data;
        }).catch((error) => {
           console.log(error);
        });

    refreshPlacesList();
}

function refreshPlacesList() {
    fetch("/get_places", {
           method: "GET"
        })
            .then(function(res){
               return res.json();
            }).then(function(data){
               placesList = data;
            }).catch((error) => {
               console.log(error);
            });
}

function deletePlace(id, places) {
    fetch("/delete_place/" + id, {
       method: "POST"
    })
        .then(function(res){
           return res.text();
        }).then(function(data){
           document.querySelector("#placesList").innerHTML = data;
        }).catch((error) => {
           console.log(error);
        });
    refreshPlacesList();
    refreshMarkers(places);
}

function refreshMarkers(places) {
    deleteMarkers();
    createMarkers(places);
}

function deleteMarkers() {
    setMapOnAll(null);
    markers = [];
  }

function createMarkers(places) {
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
        markers.push(marker);
    }
}

function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
}

function toggleAddPlaceForm() {
	var addPlaceForm = document.getElementById("addPlaceForm");
	if (addPlaceForm.style.display === "block") {
	    addPlaceForm.style.display = "none";
	} else {
	    addPlaceForm.style.display = "block";
	}
}