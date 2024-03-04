# Google Maps
L’objectiu d’aquesta pràctica és que aprenguem a utilitzar l’API de google maps i que donada una adreça ens trobi la latitud i la longitud mitjançant l’api geocoder.

Aprendrem a posar markers dins el mapa, infowindows i a modificar l’estil del mapa.

**Recursos:**
- [Google maps developer](https://developers.google.com/maps/documentation?hl=es-419)
- [Google maps API javascript](https://developers.google.com/maps/documentation/javascript/overview?hl=es)
- [Google Geocode Api](https://developers.google.com/maps/documentation/geocoding/start?hl=es-419)

Podeu utilitzar aquesta api key. YOUR API KEY: **AIzaSyD1LqPNfReHlA4RTAU1YOuVKZxTqvCPa0g**
```
<script src="https://maps.googleapis.com/maps/api/js?
key=AIzaSyD1LqPNfReHlA4RTAU1YOuVKZxTqvCPa0g&callback=initMap" async defer></script>
```
1. El primer que farem serà analitzar el codi del [Simple Map](https://developers.google.com/maps/documentation/javascript/examples/map-simple). Copiarem la següent porció de codi allà on posa "
    ```
    <div id="map"></div>
    <button type="button" class="btn btn-secondary" id="findLoc">Buscar adreça</button>
    <input type="hidden" name="lat" value="" id="latitude"/>
    <input type="hidden" name="lng" value="" id="longitude"/>
    ```
2. Per tal de visualitzar correctament el mapa és necessari donar-li una mida, per tant podeu afegir el següent css
    ```
    <style>
        #map{
            height: 400px;
            width:600px;
        }
    </style>
    ```
3. Pel que fa al java script copiarem tot el script i modificarem els punts de latitud i longitud del centre del mapa per la localització de Barcelona.
    ```
    lat: 41.390205, lng: 2.154007
4. Modificarem també el zoom per veure com es modifica el mapa.
5. Afegirem un marker [Simple Markers](https://developers.google.com/maps/documentation/javascript/examples/marker-simple) amb la localització que trieu (de Barcelona, per a poder-ho visualitzar)

## Trobem la latitud i la longitud d’una adreça.
A través dels diferents camps que defineixen l’adreça, trobarem la latitud i la longitud mitjançant l’api de google geocode.

El següent codi fa una petició a l’api geocoder i ens retorna la informació que troba de l’adreça, en aquest cas, ens interessa extreure la latitud i la longitud.

```
let geocoder = new google.maps.Geocoder();
let address="Carrer de la Selva de Mar 211 08020 Barcelona";

geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
        latitude = results[0].geometry.location.lat();
        longitude = results[0].geometry.location.lng();
    }
});
```

## Passos.
1. Crea una funció amb el codi i executa-la amb una adreça qualsevol i comprova que et funciona mitjançant alerts o logs

2. Quan es cliqui el botó Buscar adreça haureu de generar un String concatenant els diferents camps de l’adreça del formulari, una vegada ho tingueu haureu de cridar a la funció creada anteriorment.

3. Fes que una vegada trobada la latitud i la longitud es mostri en el mapa un marker en el punt indicat, el mapa s’ha de centrar en el punt i s’ha d’incrementar el zoom.
    ```
    let center = new google.maps.LatLng(latitude, longitude);
    map.setCenter(center);
    map.setZoom(16);
    ```
    En el cas que no trobi res fes que aparegui un missatge dient que l’adreça no s’ha trobat.

4. Afegeix els camps de latitud i longitud als inputs. Si vols fes que siguin tipus hidden.

## Geolocalització.
1. Afegeix un botó al mapa mitjançant HTML. Aquest botó no pot estar dins el DIV MAP. Fes un esdeveniment amb javascript que cridi a la següent funció.
    ```
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            map.setCenter(pos);
            map.setZoom(9);
            let marker = new google.maps.Marker({
                position: pos,
                map: map
            });
        });
    }
    ```
    Analitza què fa el codi, et funciona?

## Altres.
1. Modificarem el picto del marker. Per a fer-ho ens baixarem un pictograma de [flaticons](https://www.flaticon.com/) i el posarem al marker mitjançant el següent codi:
    ```
    let marker = new google.maps.Marker({
        position: {lat: 41.390205, lng: 2.154007},
        map: map,
        icon: image // URL DE LA IMATGE
    });
    ```

2. Afegirem un [infoWindow](https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple) al mapa. Per a fer-ho seguirem els següents passos
    ```
    let infowindow = new google.maps.InfoWindow({
        content: “STRING + html”
    });

    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
    ```
3. Modificarem l’estil del mapa. Per a fer-ho utilitzarem un JSON i l’eina [Styling Wizard](https://mapstyle.withgoogle.com/) de google maps. Crearem un estil i quan fem click a Finalizar copiarem el JSON i l’afegirem de la següent manera al nostre google maps.
    ```
    map = new google.maps.Map(document.getElementById('map'), {
        center: latlng,
        zoom: 12,
        styles: JSON
    ```