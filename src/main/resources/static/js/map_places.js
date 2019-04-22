let map;
let markers = [];
let placesList = [];

function initMap(places) {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 60.192059, lng: 24.945831},
      zoom: 4
    });

    for (let i = 0; i < places.length; i++) {
        placesList.push(places[i]);
    }

    createMarkers();
}

function setMapOnAll(map) {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
}

function addPlace() {
	const title = document.getElementById("placeTitle").value;
	const description = document.getElementById("placeDescription").value;
	const latitude = document.getElementById("placeLatitude").value;
	const longitude = document.getElementById("placeLongitude").value;
	const openingHours = document.getElementById("placeOpeningHours").value;
	const latLng = {lat: parseInt(latitude), lng: parseInt(longitude)};

	const elements = document.getElementsByTagName("input")
    for (let i = 0; i < elements.length; i++) {
        elements[i].value = "";
    }

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

    fetch("/places/create", {
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
           refreshPlacesList();
        }).catch((error) => {
           console.log(error);
        });

    document.getElementById("addPlaceForm").style.display = "none";
}

function showPlace(id) {
    let showPlace = document.getElementById("showPlace" + id);
    if (showPlace.style.display == "block") {
        document.getElementById("showPlace" + id).style.display = "none";
    } else {
        document.getElementById("showPlace" + id).style.display = "block";
    }
}

async function editPlace(id) {
    document.getElementById("showPlace" + id).style.display = "none";

    let response = await fetch("/places/edit/" + id, {
       method: "GET"
    });
    let data = await response.text();
    document.querySelector("#editPlace" + id).innerHTML = data;
}

async function updatePlace(id) {
    const title = document.getElementById("updateTitle" + id).value;
    const description = document.getElementById("updateDescription" + id).value;
    const latitude = document.getElementById("updateLatitude" + id).value;
    const longitude = document.getElementById("updateLongitude" + id).value;
    const openingHours = document.getElementById("updateOpeningHours" + id).value;
    const latLng = {lat: parseInt(latitude), lng: parseInt(longitude)};

    let response = await fetch("/places/update/" + id, {
       method: "PUT",
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
    });
    let data = await response.text();
    document.querySelector("#placesList").innerHTML = data;
    refreshPlacesList();
    refreshMarkers();
}

async function deletePlace(id) {
    let response = await fetch("/places/delete/" + id, {
       method: "DELETE"
    });
    let data = await response.text();
    document.querySelector("#placesList").innerHTML = data;
    refreshPlacesList();
}

async function refreshPlacesList() {
    let response = await fetch("/places", {
        method: "GET"
    });
    let data = await response.json()
    placesList = data;
    refreshMarkers();
}

function createMarkers() {
    for (let i = 0; i < placesList.length; i++) {
        const marker = new google.maps.Marker({
            position: {lat: parseInt(placesList[i].latitude), lng: parseInt(placesList[i].longitude)},
            map: map,
            title: placesList[i].title
        });

        const infoWindow = new google.maps.InfoWindow({
            content: "<h1>" + placesList[i].title + "</h1>"
                + "<p>" + placesList[i].description + "</p>"
                + "<p>Open: " + placesList[i].openingHours + "</p>"
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

function refreshMarkers() {
    deleteMarkers();
    createMarkers();
}

function deleteMarkers() {
    setMapOnAll(null);
    markers = [];
}

function toggleAddPlaceForm() {
	const addPlaceForm = document.getElementById("addPlaceForm");
	if (addPlaceForm.style.display === "block") {
	    addPlaceForm.style.display = "none";
	} else {
	    addPlaceForm.style.display = "block";
	    document.getElementById("placeTitle").focus();
	}
}