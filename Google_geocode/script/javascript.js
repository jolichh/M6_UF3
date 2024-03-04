let map;

async function initMap() {
    const myLatLng = { lat: 41.390205, lng: 2.154007 };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 10,
      center: myLatLng,
    });
  
    new google.maps.Marker({
      position: myLatLng,
      map,
      title: "Hello World!",
    });
}

await initMap();