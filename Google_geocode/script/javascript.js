let inputLat = document.getElementById('latitude');
let inputLong = document.getElementById('longitude');

let btnBuscar = document.querySelector('#findLoc');
let inputAddress = document.querySelector('#adreca');

let info = document.querySelector('#info');

let btnGeo = document.querySelector('#geo');

let map;
let marker;
let direccion = "Barcelona";
async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    const myLatLng = { lat: 41.390205, lng: 2.154007 };

    map = new Map(document.getElementById("map"), {
        center: myLatLng,
        zoom: 10,
    });
    
    marker = new google.maps.Marker({
        position: myLatLng,
        map,
        title: "Hello World!",
    });
    
    let infowindow = new google.maps.InfoWindow({
        content: direccion
    });

    marker.addListener('click', function() {
        infowindow.open({anchor: marker, map,});
    });
}
initMap();

async function mostrarMapa(lati, long) {
    const { Map } = await google.maps.importLibrary("maps");
    const myLatLng = { lat: lati, lng: long };

    map = new Map(document.getElementById("map"), {
        center: myLatLng,
        zoom: 14,
    });

    mostrarMarcador(myLatLng);

    //mostrar coordenada en el input
    inputLat.value = lati;
    inputLong.value = long;
}

function mostrarMarcador(myLatLng) {    
    marker = new google.maps.Marker({
        position: myLatLng,
        map,
        title: "",
    });

    let infowindow = new google.maps.InfoWindow({
        content: direccion
    });

    marker.addListener('click', function() {
    infowindow.open({anchor: marker, map,});
});
}

// function mostrarAdress() {
//     let geocoder = new google.maps.Geocoder();
//     let address="Carrer de la Selva de Mar 212 08020 Barcelona";
    
//     geocoder.geocode( { 'address': address}, function(results, status) {
//         if (status == google.maps.GeocoderStatus.OK) {
//             let latitude = results[0].geometry.location.lat();
//             let longitude = results[0].geometry.location.lng();
//             // console.log(latitude);
//             // console.log(longitude);
//         } else {
//             console.error("Geocode no ha podido cargar los datos.",status);
//         }
//     });
    
// }

//buscar direccion
btnBuscar.addEventListener("click", function() {
    //borra aviso
    info.innerHTML = "";
    buscaAddress(inputAddress.value);
});

function buscaAddress(address) {
    let geocoder = new google.maps.Geocoder();
    
    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            let latitude = results[0].geometry.location.lat();
            let longitude = results[0].geometry.location.lng();
            direccion = results[0].formatted_address;
            console.log('lat'+latitude);
            console.log(longitude);
            mostrarMapa(latitude, longitude);
        } else {
            let p = '<p>No se ha encontrado la dirección</p>';
            info.innerHTML = p;
            console.error("Geocode no ha podido cargar los datos.",status);
        }
    });
}

//ubicacion actual
btnGeo.addEventListener('click', function() {
    //borra aviso
    info.innerHTML = "";

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            map.setCenter(pos);
            map.setZoom(14);
            let mark = new google.maps.Marker({
                position: pos,
                map: map,
                icon: { url:'img/place.png',
                        scaledSize: new google.maps.Size(35,35),
                    },
                title: "Ubi actual"
            });

            let infowindow = new google.maps.InfoWindow({
                content: "Este eres tú"
            });
        
            mark.addListener('click', function() {
            infowindow.open({anchor: mark, map,});
        });
        });
    }
});