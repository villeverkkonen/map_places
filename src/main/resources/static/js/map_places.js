var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 60.192059, lng: 24.945831},
      zoom: 8
    });
}