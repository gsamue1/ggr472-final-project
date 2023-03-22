/*--------------------------------------------------------------------
Step 1: INITIALIZE MAP
--------------------------------------------------------------------*/
//Mapping Access Token
mapboxgl.accessToken = 'pk.eyJ1IjoiZ3NhbXVlbC11b2Z0IiwiYSI6ImNsY3lieDA3MjJjNnAzcGs2NmxoMndpeGIifQ.PKKRKM7-HRYK7TuPgztVzg'; //default public map token from Mapbox account 

//Activating Base Map
const map = new mapboxgl.Map({
    container: 'map', // div container ID for map
    style: 'mapbox://styles/gsamuel-uoft/cle4l4pr5001t01ljheblcl08', // Link to mapbox style URL
    center: [-79.390, 43.663], // starting position [longitude, latitude]
    zoom: 11.29, // starting zoom
});

/*--------------------------------------------------------------------
Setting Up Collisions Geojson Variable
--------------------------------------------------------------------*/
//Empty variable to store Collision Data Responses from Fetch Function 
let collis_geojson;

// Fetch GeoJSON from URL and store response
fetch('https://raw.githubusercontent.com/gsamue1/ggr472-final-project/main/pedcyc_collision_06-21.geojsonn')
    .then(response => response.json())
    .then(response => {
        console.log(response); //Check response in console
        collis_geojson = response; // Store geojson as variable using URL from fetch response
    });

//MAPPING TEST DATA - Add datasource using GeoJSON variable
map.addSource('collisions', {
    type: 'geojson',
    data: collis_geojson
});

//MAPPING TEST DATA - Set style for when new points are added to the data source
map.addLayer({
    'id': 'collisions-points',
    'type': 'circle',
    'source': 'collisions',
    'paint': {
        'circle-radius': 5,
        'circle-color': 'blue'
    }
});


// /*--------------------------------------------------------------------
// ADDING MAP CONTROLS
// --------------------------------------------------------------------*/

//Adding Navigation Controls -- Zoom and Spin
map.addControl(new mapboxgl.NavigationControl());

//Adding Fullscreen Capacity 
map.addControl(new mapboxgl.FullscreenControl());

//Adding Geocoding Capacity -- People Can Search their Address
const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    countries: "ca" 
});

//Positioning Geocoder on Page
document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

//Setting up Return Button -- Return Zoom to Original Extent
document.getElementById('returnbutton').addEventListener('click', () => {
    map.flyTo({
        center: [-79.39, 43.70], //Coordinates Centering Page
        zoom: 10.5,
        essential: true
    });
});

//Filtering for Bike Lanes
document.getElementById('collisionscheck').addEventListener('change', (e) => {
    map.setLayoutProperty( // change the visiblity of the layer of data
        'collisions-points',
        'visibility',
        e.target.checked ? 'visible' : 'none'
    )
});

// /*--------------------------------------------------------------------
// CONFIGURING POP-UPS
// --------------------------------------------------------------------*/
// Code Sourced: Mapbox https://docs.mapbox.com/mapbox-gl-js/example/popup-on-hover/ 
    //HEXGRIDS
    //Creating Pop-Up Variable     
        map.on('click', 'collisions-points', (e) => {
            new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML("<strong>Number of Collisions</strong>" +  "<br>" + e.features[0].properties.COUNT) // EDIT
            .addTo(map);
            });
             
            // Change the cursor to a pointer when the mouse is over the layer
            map.on('mouseenter', 'collisions-points', () => {
            map.getCanvas().style.cursor = 'pointer';
            });
             
            // Change the cursor back to a pointer
            map.on('mouseleave', 'collisions-points', () => {
            map.getCanvas().style.cursor = '';
            });