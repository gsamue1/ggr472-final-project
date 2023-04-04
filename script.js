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
Setting Up Accessible Food Geojson Variable
--------------------------------------------------------------------*/
// //Empty variable to store Collision Data Responses from Fetch Function 
let foodresources_geojson;

// Fetch GeoJSON from URL and store response
fetch('https://raw.githubusercontent.com/gsamue1/ggr472-final-project/main/food_support_locations_clean.geojson')
    .then(response => response.json())
    .then(response => {
        console.log(response); //Check response in console
        foodresources_geojson = response; // Store geojson as variable using URL from fetch response
    });

//MAPPING FOOD LOCATIONS - Add datasource using GeoJSON variable
map.on('load', () => {
map.addSource('food', {
    type: 'geojson',
    data: foodresources_geojson,
});

//MAPPING FOOD BANKS - Set style for when new points are added to the data source

map.addLayer({
    'id': 'food_banks',
    'type': 'circle',
    'source': 'food',
    'paint': {
        'circle-radius': 6,
        'circle-color': 'blue',    
        'circle-stroke-color': 'black'
    },
    'filter': ['==', ['get', 'USER_food_'], 'Yes']
});

//MAPPING TAKEOUT LOCATIONS - Set style for when new points are added to the data source
map.addLayer({
    'id': 'takeout_meals',
    'type': 'circle',
    'source': 'food',
    'paint': {
        'circle-radius': 5,
        'circle-color': 'red',
        'circle-stroke-color': 'black'
    },
    'filter': ['==', ['get', 'USER_takeo'], 'Yes']
});

//MAPPING SIT-DOWN MEALS - Set style for when new points are added to the data source
map.addLayer({
    'id': 'sit_meals',
    'type': 'circle',
    'source': 'food',
    'paint': {
        'circle-radius': 4,
        'circle-color': 'yellow',
        'circle-stroke-color': 'black'
    },
    'filter': ['==', ['get', 'USER_meal_'], 'Yes']
});

//MAPPING COMMUNITY PROGRAMS - Set style for when new points are added to the data source
map.addLayer({
    'id': 'community_programs',
    'type': 'circle',
    'source': 'food',
    'paint': {
        'circle-radius': 3,
        'circle-color': 'purple',
        'circle-stroke-color': 'black'
    },
    'filter': ['==', ['get', 'USER_commu'], 'Yes']
});

//MAPPING COMMUNITY GARDENS AND FRIDGES - Set style for when new points are added to the data source
map.addLayer({
    'id': 'fridge_gardens',
    'type': 'circle',
    'source': 'food',
    'paint': {
        'circle-radius': 2,
        'circle-color': 'green',
        'circle-stroke-color': 'black'
    },
    'filter': ['==', ['get', 'USER_com_1'], 'Yes']
});
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

// /*--------------------------------------------------------------------
// CONFIGURING POP-UPS
// --------------------------------------------------------------------*/
// Code Sourced: Mapbox https://docs.mapbox.com/mapbox-gl-js/example/popup-on-hover/   

//Creating Layer Array for Pop Up Functions -- Ensure Pop-Ups are enabled for all layers
    let layers_pop = ['food_banks','takeout_meals','sit_meals','community_programs','fridge_gardens'];

//Creating Pop-Up Variable for Food Bank Locations
        map.on('click', ['food_banks','takeout_meals','sit_meals','community_programs','fridge_gardens'], (e) => {
            console.log(e);   //e is the event info triggered and is passed to the function as a parameter (e)
            //Explore console output using Google DevTools

        // Defining Pop Up Variable
            let name = e.features[0].properties.USER_name;
            let address_name = e.features[0].properties.USER_addre;
            let address_details = e.features[0].properties.USER_add_1;
            let postal_code = e.features[0].properties.USER_posta;
            let services = e.features[0].properties.USER_servi;
            let hours = e.features[0].properties.USER_hours;
            let appt = e.features[0].properties.USER_appoi;
            let res_req = e.features[0].properties.USER_resid;
            let res_req_details = e.features[0].properties.USER_res_1;
            let website = e.features[0].properties.USER_servi;
            let contact = e.features[0].properties.USER_conta;
            let access = e.features[0].properties.USER_acces;
            let target = e.features[0].properties.USER_targe;

        //Variable testing 
           console.log(name);

            var pop_up = new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML("<b" + name + "</b>" 
                    + '<br>' + 'Address: ' + address_name + address_details + ", " + postal_code
                    + '<br>' + 'Services: ' + services
                    + '<br>' + 'Operating Hours: ' + hours
                    + '<br>' + 'Appointment Required: ' + appt
                    + '<br>' + 'Residency Requirements: ' + res_req + " (" + res_req_details + ")"
                    + '<br>' + 'Target Group: ' + target
                    + '<br>' + 'Website: ' + '<a href="' + website + '">' + '</a>'
                    + '<br>' + 'Contact: ' + contact
                    + '<br>' + 'Wheelchair Accessible: ' + access)
                .addTo(map);
            });
        
           

            // Change the cursor to a pointer when the mouse is over the layer
            map.on('mouseenter', layers_pop, () => {
            map.getCanvas().style.cursor = 'pointer';
            });
             
            // Change the cursor back to a pointer
            map.on('mouseleave', layers_pop, () => {
            map.getCanvas().style.cursor = '';
            });


//     var feature = features[0];

//   var popup = new mapboxgl.Popup({ offset: [0, -15] })
//         .setLngLat(feature.geometry.coordinates)
//         .setHTML('<h3>' + feature.properties.Company + '</h3><p>' + feature.properties.City + '</p>' + feature.properties.URL + '</p>')
//     .setLngLat(feature.geometry.coordinates)


// /*--------------------------------------------------------------------
// Filtering Service Type
// --------------------------------------------------------------------*/
let foodbank = true;
let takeout = true;
let sitdown = true;
let commprog = true;
let commgardfrid = true;

// Filter for Food Banks
document.getElementById('foodbankcheck').addEventListener('change', (e) => {
   foodbank = !foodbank;
    map.setLayoutProperty( // change the visiblity of the layer of data
        'food_banks',
        'visibility',
        e.target.checked ? 'visible' : 'none'
    )
});

// Filter for Takeout Meals
document.getElementById('takeoutcheck').addEventListener('change', (e) => {
    takeout = !takeout;
    map.setLayoutProperty( // change the visiblity of the layer of data
        'takeout_meals',
        'visibility',
        e.target.checked ? 'visible' : 'none'
    )
});

// Filter for Sit Down Meal Programmes
document.getElementById('mealprogcheck').addEventListener('change', (e) => {
    sitdown = !sitdown;
    map.setLayoutProperty( // change the visiblity of the layer of data
        'sit_meals',
        'visibility',
        e.target.checked ? 'visible' : 'none'
    )
});

// Filter for Education and Community Programming
document.getElementById('educheck').addEventListener('change', (e) => {
    commprog = !commprog;
    map.setLayoutProperty( // change the visiblity of the layer of data
        'community_programs',
        'visibility',
        e.target.checked ? 'visible' : 'none'
    )
});

// Filter for Community Gardens or Kitchens 
document.getElementById('resourcecheck').addEventListener('change', (e) => {
    commgardfrid = !commgardfrid;
    map.setLayoutProperty( // change the visiblity of the layer of data
        'fridge_gardens',
        'visibility',
        e.target.checked ? 'visible' : 'none'
    )
});

// /*--------------------------------------------------------------------
// Filtering Open Time 
// --------------------------------------------------------------------*/


// Filter for Monday
document.getElementById('moncheck').addEventListener('change', (e) => {

    let layers = [];
    let fields = [];

    let checked = 'No';
    if(e.target.checked) {
        checked = 'Yes'
    }

    if (foodbank) {
        layers.push ('food_banks');
        fields.push('USER_food_')
    }

    if (takeout) {
        layers.push('takeout_meals');
        fields.push('USER_takeo');
    }

    if (sitdown) {
        layers.push('sit_meals');
        fields.push('USER_meal_');
    }

    if (commprog) {
        layers.push('community_programs');
        fields.push('USER_commu');
    }

    if (commgardfrid) {
        layers.push('fridge_gardens');
        fields.push('USER_com_1');
    }

    layers.forEach((layer, i) => {
        console.log(layer)
        let field = fields[i]

        map.setFilter(layer, 
            ['all',
            ['==', ['get', 'USER_monda'], checked],
            ['==', ['get', field], 'Yes']])
        
    });

    
});

// ('fridge_gardens', b, c, d, e)

// //Check each layer to filter for the day of the week 

// document.getElementById('mondaycheck').addEventListener('change', (e) => {
//     map.setLayoutProperty( // change the visiblity of the layer of data
//         ['==' [get,  'monday'], 'Yes'],
//         frideg_gardens,
//         'visibility',
//         e.target.checked ? 'visible' : 'none'
//     )
// });


// Filter for Tuesday

// Filter for Wednesday

// Filter for Thursday 

// Filter for Friday

// Filter for Saturday

// Filter for Sunday