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

map.addLayer({
    'id': 'monday',
    'type': 'circle',
    'source': 'food',
    'paint': {
        'circle-radius': 6,
        'circle-color': [
            'case',
            //Multi service location -- true in 2 or more of the boolean columns for service type
                ['>=', ['+', ['to-number', ['get', 'USER_food_'], ['get', 'USER_takeo'], ['get', 'USER_meal_'], ['get', 'USER_commu'], ['get', 'USER_com_1']]], 2],
                'blue', // if true in 2 or more columns
            // Only Food Bank -- yes in USER_food_ and no in the other four
                ['all', ['==', ['get', 'USER_food_'], true], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_commu'], false], ['==', ['get', 'USER_com_1'], false]],
                'green', // if true in col1 and no in the rest
            // Category three: yes in 1 column and no in the other four
                ['all', ['==', ['get', 'USER_takeo'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_commu'], false], ['==', ['get', 'USER_com_1'], false]],
                'pink', // if yes in col2 and no in the rest
            // Category four: yes in 1 column and no in the other four
                ['all', ['==', ['get', 'USER_meal_'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_commu'], false], ['==', ['get', 'USER_com_1'], false]],
                'orange', // if yes in col3 and no in the rest
            // Category five: yes in 1 column and no in the other four
                ['all', ['==', ['get', 'USER_commu'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_com_1'], false]],
                'red', // if yes in col4 and no in the rest
            // Category six: yes in 1 column and no in the other four
                ['all', ['==', ['get', 'USER_com_1'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_commu'], false]],
                'yellow',
                'gray'
        ],    
        'circle-stroke-color': 'black'
    },
    'filter': ['==', ['get', 'USER_monda'], true]
});

map.addLayer({
    'id': 'tuesday',
    'type': 'circle',
    'source': 'food',
    'paint': {
        'circle-radius': 6,
        'circle-color': [
            'case',
            //Multi service location -- true in 2 or more of the boolean columns for service type
                ['>=', ['+', ['to-number', ['get', 'USER_food_'], ['get', 'USER_takeo'], ['get', 'USER_meal_'], ['get', 'USER_commu'], ['get', 'USER_com_1']]], 2],
                'blue', // if true in 2 or more columns
            // Only Food Bank -- yes in USER_food_ and no in the other four
                ['all', ['==', ['get', 'USER_food_'], true], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_commu'], false], ['==', ['get', 'USER_com_1'], false]],
                'green', // if true in col1 and no in the rest
            // Category three: yes in 1 column and no in the other four
                ['all', ['==', ['get', 'USER_takeo'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_commu'], false], ['==', ['get', 'USER_com_1'], false]],
                'pink', // if yes in col2 and no in the rest
            // Category four: yes in 1 column and no in the other four
                ['all', ['==', ['get', 'USER_meal_'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_commu'], false], ['==', ['get', 'USER_com_1'], false]],
                'orange', // if yes in col3 and no in the rest
            // Category five: yes in 1 column and no in the other four
                ['all', ['==', ['get', 'USER_commu'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_com_1'], false]],
                'red', // if yes in col4 and no in the rest
            // Category six: yes in 1 column and no in the other four
                ['all', ['==', ['get', 'USER_com_1'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_commu'], false]],
                'yellow',
                'gray'
        ],   
        'circle-stroke-color': 'black'
    },
    'filter': ['==', ['get', 'USER_tuesd'], true]
});

map.addLayer({
    'id': 'wednesday',
    'type': 'circle',
    'source': 'food',
    'paint': {
        'circle-radius': 6,
        'circle-color': [
            'case',
            //Multi service location -- true in 2 or more of the boolean columns for service type
                ['>=', ['+', ['to-number', ['get', 'USER_food_'], ['get', 'USER_takeo'], ['get', 'USER_meal_'], ['get', 'USER_commu'], ['get', 'USER_com_1']]], 2],
                'blue', // if true in 2 or more columns
            // Only Food Bank -- yes in USER_food_ and no in the other four
                ['all', ['==', ['get', 'USER_food_'], true], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_commu'], false], ['==', ['get', 'USER_com_1'], false]],
                'green', // if true in col1 and no in the rest
            // Category three: yes in 1 column and no in the other four
                ['all', ['==', ['get', 'USER_takeo'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_commu'], false], ['==', ['get', 'USER_com_1'], false]],
                'pink', // if yes in col2 and no in the rest
            // Category four: yes in 1 column and no in the other four
                ['all', ['==', ['get', 'USER_meal_'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_commu'], false], ['==', ['get', 'USER_com_1'], false]],
                'orange', // if yes in col3 and no in the rest
            // Category five: yes in 1 column and no in the other four
                ['all', ['==', ['get', 'USER_commu'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_com_1'], false]],
                'red', // if yes in col4 and no in the rest
            // Category six: yes in 1 column and no in the other four
                ['all', ['==', ['get', 'USER_com_1'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_commu'], false]],
                'yellow',
                'gray'
        ],   
        'circle-stroke-color': 'black'
    },
    'filter': ['==', ['get', 'USER_wedne'], true]
});


map.addLayer({
    'id': 'thursday',
    'type': 'circle',
    'source': 'food',
    'paint': {
        'circle-radius': 6,
        'circle-color': [
            'case',
            //Multi service location -- true in 2 or more of the boolean columns for service type
                ['>=', ['+', ['to-number', ['get', 'USER_food_'], ['get', 'USER_takeo'], ['get', 'USER_meal_'], ['get', 'USER_commu'], ['get', 'USER_com_1']]], 2],
                'blue', // if true in 2 or more columns
            // Only Food Bank -- yes in USER_food_ and no in the other four
                ['all', ['==', ['get', 'USER_food_'], true], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_commu'], false], ['==', ['get', 'USER_com_1'], false]],
                'green', // if true in col1 and no in the rest
            // Category three: yes in 1 column and no in the other four
                ['all', ['==', ['get', 'USER_takeo'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_commu'], false], ['==', ['get', 'USER_com_1'], false]],
                'pink', // if yes in col2 and no in the rest
            // Category four: yes in 1 column and no in the other four
                ['all', ['==', ['get', 'USER_meal_'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_commu'], false], ['==', ['get', 'USER_com_1'], false]],
                'orange', // if yes in col3 and no in the rest
            // Category five: yes in 1 column and no in the other four
                ['all', ['==', ['get', 'USER_commu'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_com_1'], false]],
                'red', // if yes in col4 and no in the rest
            // Category six: yes in 1 column and no in the other four
                ['all', ['==', ['get', 'USER_com_1'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_commu'], false]],
                'yellow',
                'gray'
        ],  
        'circle-stroke-color': 'black'
    },
    'filter': ['==', ['get', 'USER_thurs'], true]
});

map.addLayer({
    'id': 'friday',
    'type': 'circle',
    'source': 'food',
    'paint': {
        'circle-radius': 6,
        'circle-color': [
            'case',
            //Multi service location -- true in 2 or more of the boolean columns for service type
                ['>=', ['+', ['to-number', ['get', 'USER_food_'], ['get', 'USER_takeo'], ['get', 'USER_meal_'], ['get', 'USER_commu'], ['get', 'USER_com_1']]], 2],
                'blue', // if true in 2 or more columns
            // Only Food Bank -- yes in USER_food_ and no in the other four
                ['all', ['==', ['get', 'USER_food_'], true], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_commu'], false], ['==', ['get', 'USER_com_1'], false]],
                'green', // if true in col1 and no in the rest
            // Category three: yes in 1 column and no in the other four
                ['all', ['==', ['get', 'USER_takeo'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_commu'], false], ['==', ['get', 'USER_com_1'], false]],
                'pink', // if yes in col2 and no in the rest
            // Category four: yes in 1 column and no in the other four
                ['all', ['==', ['get', 'USER_meal_'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_commu'], false], ['==', ['get', 'USER_com_1'], false]],
                'orange', // if yes in col3 and no in the rest
            // Category five: yes in 1 column and no in the other four
                ['all', ['==', ['get', 'USER_commu'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_com_1'], false]],
                'red', // if yes in col4 and no in the rest
            // Category six: yes in 1 column and no in the other four
                ['all', ['==', ['get', 'USER_com_1'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_commu'], false]],
                'yellow',
                'gray'
        ],    
        'circle-stroke-color': 'black'
    },
    'filter': ['==', ['get', 'USER_frida'], true]
});

map.addLayer({
    'id': 'saturday',
    'type': 'circle',
    'source': 'food',
    'paint': {
        'circle-radius': 6,
        'circle-color': [
                'case',
                //Multi service location -- true in 2 or more of the boolean columns for service type
                    ['>=', ['+', ['to-number', ['get', 'USER_food_'], ['get', 'USER_takeo'], ['get', 'USER_meal_'], ['get', 'USER_commu'], ['get', 'USER_com_1']]], 2],
                    'blue', // if true in 2 or more columns
                // Only Food Bank -- yes in USER_food_ and no in the other four
                    ['all', ['==', ['get', 'USER_food_'], true], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_commu'], false], ['==', ['get', 'USER_com_1'], false]],
                    'green', // if true in col1 and no in the rest
                // Category three: yes in 1 column and no in the other four
                    ['all', ['==', ['get', 'USER_takeo'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_commu'], false], ['==', ['get', 'USER_com_1'], false]],
                    'pink', // if yes in col2 and no in the rest
                // Category four: yes in 1 column and no in the other four
                    ['all', ['==', ['get', 'USER_meal_'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_commu'], false], ['==', ['get', 'USER_com_1'], false]],
                    'orange', // if yes in col3 and no in the rest
                // Category five: yes in 1 column and no in the other four
                    ['all', ['==', ['get', 'USER_commu'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_com_1'], false]],
                    'red', // if yes in col4 and no in the rest
                // Category six: yes in 1 column and no in the other four
                    ['all', ['==', ['get', 'USER_com_1'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_commu'], false]],
                    'yellow',
                    'gray'
            ],
        'circle-stroke-color': 'black'
    },
    'filter': ['==', ['get', 'USER_satur'], true]
});

map.addLayer({
    'id': 'sunday',
    'type': 'circle',
    'source': 'food',
    'paint': {
        'circle-radius': 5,
            'circle-color': [
                'case',
                //Multi service location -- true in 2 or more of the boolean columns for service type
                    ['>=', ['+', ['to-number', ['get', 'USER_food_'], ['get', 'USER_takeo'], ['get', 'USER_meal_'], ['get', 'USER_commu'], ['get', 'USER_com_1']]], 2],
                    'blue', // if true in 2 or more columns
                // Only Food Bank -- yes in USER_food_ and no in the other four
                    ['all', ['==', ['get', 'USER_food_'], true], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_commu'], false], ['==', ['get', 'USER_com_1'], false]],
                    'green', // if true in col1 and no in the rest
                // Category three: yes in 1 column and no in the other four
                    ['all', ['==', ['get', 'USER_takeo'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_commu'], false], ['==', ['get', 'USER_com_1'], false]],
                    'pink', // if yes in col2 and no in the rest
                // Category four: yes in 1 column and no in the other four
                    ['all', ['==', ['get', 'USER_meal_'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_commu'], false], ['==', ['get', 'USER_com_1'], false]],
                    'orange', // if yes in col3 and no in the rest
                // Category five: yes in 1 column and no in the other four
                    ['all', ['==', ['get', 'USER_commu'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_com_1'], false]],
                    'red', // if yes in col4 and no in the rest
                // Category six: yes in 1 column and no in the other four
                    ['all', ['==', ['get', 'USER_com_1'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_commu'], false]],
                    'yellow',
                    'gray'
            ],
        'circle-stroke-color': 'black'
    },
    'filter': ['==', ['get', 'USER_sunda'], true]
});

// 'match', // Match expression 
// ['get', 'Ice Pad Size Category'], // GET expression retrieves property value from 'capacity' data field
// 'NHL(200X85)', '#f35c4b', // 
// 'Regular(185X85)', '#eded4f', //
// 'Undersized(less than 185X85)', '#e0890f',
// '#918e8d'
});


// <li><span style='background:#4696eb;'></span>Multiple Services</li>  
//               <li><span style='background:#83cd6c;'></span>Food Banks</li>
//               <li><span style='background:#d03db0;'></span> Take Away Meal Programs</li>
//               <li><span style='background:#fbb430;'></span>Sit Down Meal Programs</li>
//               <li><span style='background:#da2424;'></span>Community Fridges and Gardens</li>
//               <li><span style='background:#a116c7;'></span>Education and Community Programming</li>

// /*--------------------------------------------------------------------
// FILTERING FOR SERVICE TYPE
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
    let layers_pop = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

//'food_banks','takeout_meals','sit_meals','community_programs','fridge_gardens'



//Creating Pop-Up Variable for Food Bank Locations
        map.on('click', layers_pop, (e) => {
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
                .setHTML("<b>" + name + "</b>" 
                    + '<br>' + ' ' 
                    + '<br>' + "<b>" + 'Address: ' + "</b>" + address_name + ' ' + address_details + ", " + postal_code
                    + '<br>' + "<b>" + 'Services: ' + "</b>" + services
                    + '<br>' + "<b>" + 'Operating Hours: ' + "</b>" + hours
                    + '<br>' + "<b>" + 'Appointment Required: ' + "</b>" + appt
                    + '<br>' + "<b>" + 'Residency Requirements: ' + "</b>" + res_req + " (" + res_req_details + ")"
                    + '<br>' + "<b>" + 'Target Group: ' + "</b>" + target
                    + '<br>' + "<b>" + 'Website: ' + "</b>" + '<a href="' + website + '">' + '</a>'
                    + '<br>' + "<b>" + 'Contact: ' + "</b>" + contact
                    + '<br>' + "<b>" + 'Wheelchair Accessible: ' + "</b>" + access)
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


// /*--------------------------------------------------------------------
// Filtering Open Times
// --------------------------------------------------------------------*/
let mon = true;
let tues = true;
let wed = true;
let thurs = true;
let fri = true;
let sat = true;
let sun = true;

// Filter for Monday Operating Hours
document.getElementById('moncheck').addEventListener('change', (e) => {
   mon = !mon;
    map.setLayoutProperty( // change the visiblity of the layer of data
        'monday',
        'visibility',
        e.target.checked ? 'visible' : 'none'
    )
});

// Filter for Tuesday
document.getElementById('tuescheck').addEventListener('change', (e) => {
    tues = !tues;
    map.setLayoutProperty( // change the visiblity of the layer of data
        'tuesday',
        'visibility',
        e.target.checked ? 'visible' : 'none'
    )
});

// Filter for Wednesday
document.getElementById('wedcheck').addEventListener('change', (e) => {
    wed = !wed;
    map.setLayoutProperty( // change the visiblity of the layer of data
        'wednesday',
        'visibility',
        e.target.checked ? 'visible' : 'none'
    )
});

// Filter for Thursday
document.getElementById('thurscheck').addEventListener('change', (e) => {
    thurs = !thurs;
    map.setLayoutProperty( // change the visiblity of the layer of data
        'thursday',
        'visibility',
        e.target.checked ? 'visible' : 'none'
    )
});

// Filter for Friday
document.getElementById('fricheck').addEventListener('change', (e) => {
    fri = !fri;
    map.setLayoutProperty( // change the visiblity of the layer of data
        'friday',
        'visibility',
        e.target.checked ? 'visible' : 'none'
    )
});

// Filter for Saturday
document.getElementById('satcheck').addEventListener('change', (e) => {
    sat = !sat;
    map.setLayoutProperty( // change the visiblity of the layer of data
        'saturday',
        'visibility',
        e.target.checked ? 'visible' : 'none'
    )
});

// Filter for Sunday
document.getElementById('suncheck').addEventListener('change', (e) => {
    sun = !sun;
    map.setLayoutProperty( // change the visiblity of the layer of data
        'sunday',
        'visibility',
        e.target.checked ? 'visible' : 'none'
    )
});


// /*--------------------------------------------------------------------
// Filtering Open Time 
// --------------------------------------------------------------------*/


// // Filter for Monday
// document.getElementById('moncheck').addEventListener('change', (e) => {

//     let layers = [];
//     let fields = [];

//     let checked = 'No';
//     if(e.target.checked) {
//         checked = 'Yes'
//     }

//     if (foodbank) {
//         layers.push ('food_banks');
//         fields.push('USER_food_')
//     }

//     if (takeout) {
//         layers.push('takeout_meals');
//         fields.push('USER_takeo');
//     }

//     if (sitdown) {
//         layers.push('sit_meals');
//         fields.push('USER_meal_');
//     }

//     if (commprog) {
//         layers.push('community_programs');
//         fields.push('USER_commu');
//     }

//     if (commgardfrid) {
//         layers.push('fridge_gardens');
//         fields.push('USER_com_1');
//     }

//     layers.forEach((layer, i) => {
//         console.log(layer)
//         let field = fields[i]

//         map.setFilter(layer, 
//             ['all',
//             ['==', ['get', 'USER_monda'], checked],
//             ['==', ['get', field], 'Yes']])
        
//     });

    
// });

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



// UNUSED CODE 
///// Adding Layers by Service Type
///// Filtering by Service Type


// //MAPPING FOOD BANKS - Set style for when new points are added to the data source
// map.addLayer({
//     'id': 'food_banks',
//     'type': 'circle',
//     'source': 'food',
//     'paint': {
//         'circle-radius': 6,
//         'circle-color': 'blue',    
//         'circle-stroke-color': 'black'
//     },
//     'filter': ['==', ['get', 'USER_food_'], 'Yes']
// });

// //MAPPING TAKEOUT LOCATIONS - Set style for when new points are added to the data source
// map.addLayer({
//     'id': 'takeout_meals',
//     'type': 'circle',
//     'source': 'food',
//     'paint': {
//         'circle-radius': 5,
//         'circle-color': 'red',
//         'circle-stroke-color': 'black'
//     },
//     'filter': ['==', ['get', 'USER_takeo'], 'Yes']
// });

// //MAPPING SIT-DOWN MEALS - Set style for when new points are added to the data source
// map.addLayer({
//     'id': 'sit_meals',
//     'type': 'circle',
//     'source': 'food',
//     'paint': {
//         'circle-radius': 4,
//         'circle-color': 'yellow',
//         'circle-stroke-color': 'black'
//     },
//     'filter': ['==', ['get', 'USER_meal_'], 'Yes']
// });

// //MAPPING COMMUNITY PROGRAMS - Set style for when new points are added to the data source
// map.addLayer({
//     'id': 'community_programs',
//     'type': 'circle',
//     'source': 'food',
//     'paint': {
//         'circle-radius': 3,
//         'circle-color': 'purple',
//         'circle-stroke-color': 'black'
//     },
//     'filter': ['==', ['get', 'USER_commu'], 'Yes']
// });

// //MAPPING COMMUNITY GARDENS AND FRIDGES - Set style for when new points are added to the data source
// map.addLayer({
//     'id': 'fridge_gardens',
//     'type': 'circle',
//     'source': 'food',
//     'paint': {
//         'circle-radius': 2,
//         'circle-color': 'green',
//         'circle-stroke-color': 'black'
//     },
//     'filter': ['==', ['get', 'USER_com_1'], 'Yes']
// });

/////////// FILTERING 

// let foodbank = true;
// let takeout = true;
// let sitdown = true;
// let commprog = true;
// let commgardfrid = true;

// // Filter for Food Banks
// document.getElementById('foodbankcheck').addEventListener('change', (e) => {
//    foodbank = !foodbank;
//     map.setLayoutProperty( // change the visiblity of the layer of data
//         'food_banks',
//         'visibility',
//         e.target.checked ? 'visible' : 'none'
//     )
// });

// // Filter for Takeout Meals
// document.getElementById('takeoutcheck').addEventListener('change', (e) => {
//     takeout = !takeout;
//     map.setLayoutProperty( // change the visiblity of the layer of data
//         'takeout_meals',
//         'visibility',
//         e.target.checked ? 'visible' : 'none'
//     )
// });

// // Filter for Sit Down Meal Programmes
// document.getElementById('mealprogcheck').addEventListener('change', (e) => {
//     sitdown = !sitdown;
//     map.setLayoutProperty( // change the visiblity of the layer of data
//         'sit_meals',
//         'visibility',
//         e.target.checked ? 'visible' : 'none'
//     )
// });

// // Filter for Education and Community Programming
// document.getElementById('educheck').addEventListener('change', (e) => {
//     commprog = !commprog;
//     map.setLayoutProperty( // change the visiblity of the layer of data
//         'community_programs',
//         'visibility',
//         e.target.checked ? 'visible' : 'none'
//     )
// });

// // Filter for Community Gardens or Kitchens 
// document.getElementById('resourcecheck').addEventListener('change', (e) => {
//     commgardfrid = !commgardfrid;
//     map.setLayoutProperty( // change the visiblity of the layer of data
//         'fridge_gardens',
//         'visibility',
//         e.target.checked ? 'visible' : 'none'
//     )
// });

// const foodbank = map.getLayoutProperty('monday', 'USER_food') === "Yes" 
// if (foodbank) {
//     map.setLayoutProperty('monday', 'visibility', 'visible')
// } else {
//     map.setLayoutProperty('monday', 'visibility', 'visible')
// }




// //MAPPING FOOD BANKS - Set style for when new points are added to the data source
// map.addLayer({
//     'id': 'food_banks',
//     'type': 'circle',
//     'source': 'food',
//     'paint': {
//         'circle-radius': 7,
//         'circle-color': 'blue',    
//         'circle-stroke-color': 'black'
//     },
//     'filter': ['==', ['get', 'USER_food_'], true]
// });

// //MAPPING TAKEOUT LOCATIONS - Set style for when new points are added to the data source
// map.addLayer({
//     'id': 'takeout_meals',
//     'type': 'circle',
//     'source': 'food',
//     'paint': {
//         'circle-radius': 6,
//         'circle-color': 'red',
//         'circle-stroke-color': 'black'
//     },
//     'filter': ['==', ['get', 'USER_takeo'], true]
// });

// //MAPPING SIT-DOWN MEALS - Set style for when new points are added to the data source
// map.addLayer({
//     'id': 'sit_meals',
//     'type': 'circle',
//     'source': 'food',
//     'paint': {
//         'circle-radius': 5,
//         'circle-color': 'yellow',
//         'circle-stroke-color': 'black'
//     },
//     'filter': ['==', ['get', 'USER_meal_'], true]
// });

// //MAPPING COMMUNITY PROGRAMS - Set style for when new points are added to the data source
// map.addLayer({
//     'id': 'community_programs',
//     'type': 'circle',
//     'source': 'food',
//     'paint': {
//         'circle-radius': 4,
//         'circle-color': 'purple',
//         'circle-stroke-color': 'black'
//     },
//     'filter': ['==', ['get', 'USER_commu'], true]
// });

// //MAPPING COMMUNITY GARDENS AND FRIDGES - Set style for when new points are added to the data source
// map.addLayer({
//     'id': 'fridge_gardens',
//     'type': 'circle',
//     'source': 'food',
//     'paint': {
//         'circle-radius': 3,
//         'circle-color': 'green',
//         'circle-stroke-color': 'black'
//     },
//     'filter': ['==', ['get', 'USER_com_1'], true]
// });