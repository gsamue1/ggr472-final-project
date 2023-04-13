///// TO DO LIST
// Configure Pop Ups to be Top Layer 
// Configure geocoder to be upper layer 
// add transportation layer
// add walking buffer 
// filtering for service type 
//COmment out Code to Explain Functionality

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
//Empty variables to store Collision Data Responses from Fetch Function 
//Food Support Locations 
let foodresources_geojson;

//TTC Subway station stops 
let subway_geojson;

// Food Support Locations -- Fetch GeoJSON from URL for and store response
fetch('https://raw.githubusercontent.com/gsamue1/ggr472-final-project/main/food_support_locations_clean.geojson')
    .then(response1 => response1.json())
    .then(response1 => {
        console.log(response1); //Check response in console
        foodresources_geojson = response1; // Store geojson as variable using URL from fetch response
    });

// Food Support Locations -- Fetch GeoJSON from URL for and store response
fetch('https://raw.githubusercontent.com/gsamue1/ggr472-final-project/main/ttc_subway_stations.geojson')
    .then(response2 => response2.json())
    .then(response2 => {
        console.log(response2); //Check response in console
        subway_geojson = response2; // Store geojson as variable using URL from fetch response
    });

//MAPPING FOOD LOCATIONS - Add datasource using GeoJSON variable
map.on('load', () => {
//Adding Food Bank Geojson Source
map.addSource('food', {
    type: 'geojson',
    data: foodresources_geojson,
});

//Adding Subway Data Source
map.addSource('subway', {
    type: 'geojson',
    data: subway_geojson,
});

//Adding Icon Image for Subway Data
///Loading Image from external URL
map.loadImage(
    'https://raw.githubusercontent.com/gsamue1/ggr472-final-project/main/subway-final.png',
    //Configuring Error 
    (error, image) => {
        if (error) throw error;
    
    //Adding Image to Map Style 
        map.addImage('ttc_point', image);
 

    //TTC Subway Stations Layer 
        map.addLayer({
            'id': 'ttc', // layer id 
            'type': 'symbol',
            'source': 'subway', // data source
            'layout': {
                'icon-image': 'ttc_point', // reference image
                'icon-size': 0.4, // smaller sizes than food resources to prevent distraction
                'icon-allow-overlap': true, // allow overlapping icons 
                'visibility': 'none'
            },
            
        });
    }
);

//MONDAY - Adding Layer for Food Support Open on Monday
//Note: Some points will be repeated between layer because they are open multiple days
/////// Identical symbology has been used to retain the illusion of one point
map.addLayer({
    'id': 'monday',
    'type': 'circle',
    'source': 'food',
    'paint': {
        'circle-radius': 5,
        'circle-color': [ //case when statement to apply conditional symbology
            'case',
       // Category 1: Food Bank Only  -- true in USER_food_ and false in the other four
            ['all', ['==', ['get', 'USER_food_'], true], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_commu'], false], ['==', ['get', 'USER_com_1'], false]],
            '#2A9D8F', 
        // Category 2: Takeout Meals Only  -- true in USER_takeo and false in the other four
            ['all', ['==', ['get', 'USER_takeo'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_commu'], false], ['==', ['get', 'USER_com_1'], false]],
            '#b0e96a', 
        // Category 3: Sit Down Meal Program Only  -- true in USER_meal_ and false in the other four
            ['all', ['==', ['get', 'USER_meal_'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_commu'], false], ['==', ['get', 'USER_com_1'], false]],
            '#E9C46A', 
        // Category 4: Community Program Only -- true in USER_commu and false in the other four
            ['all', ['==', ['get', 'USER_commu'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_com_1'], false]],
            '#F4A261', 
            // Category 5: Community Fridges and Gardens Only -- true in USER_com_1 and false in the other four
            ['all', ['==', ['get', 'USER_com_1'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_commu'], false]],
            '#e44040',
            //Category 6: Multiple Service Location -- true in 2 or more of the boolean columns for service type
            //If a point is not only true for one column it has to be true for more than one (We built dataset and checked that everything assigned at least one category)
            '#264653'  

          //Back Up Code if wanting to differentiate no category from multiservice locations -- Quality Control Check 
            // ['>=', ['+', ['to-number', ['get', 'USER_food_'], ['get', 'USER_takeo'], ['get', 'USER_meal_'], ['get', 'USER_commu'], ['get', 'USER_com_1']]], 2],
            // '#264653', // if true in 2 or more columns
          ], 
        'circle-stroke-width': 1, //outline width
        'circle-stroke-color': 'black'
    },
    'filter': ['==', ['get', 'USER_monda'], true] // Filtering for all points open on Monday (User_monda = true)
});


//TUESDAY - Adding Layer for Food Support Open on Monday
map.addLayer({
    'id': 'tuesday',
    'type': 'circle',
    'source': 'food',
    'paint': {
        'circle-radius': 5,
        'circle-color': [
            'case',
       // Category 1: Food Bank Only  -- true in USER_food_ and false in the other four
            ['all', ['==', ['get', 'USER_food_'], true], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_commu'], false], ['==', ['get', 'USER_com_1'], false]],
            '#2A9D8F', 
        // Category 2: Takeout Meals Only  -- true in USER_takeo and false in the other four
            ['all', ['==', ['get', 'USER_takeo'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_commu'], false], ['==', ['get', 'USER_com_1'], false]],
            '#b0e96a', 
        // Category 3: Sit Down Meal Program Only  -- true in USER_meal_ and false in the other four
            ['all', ['==', ['get', 'USER_meal_'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_commu'], false], ['==', ['get', 'USER_com_1'], false]],
            '#E9C46A', 
        // Category 4: Community Program Only -- true in USER_commu and false in the other four
            ['all', ['==', ['get', 'USER_commu'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_com_1'], false]],
            '#F4A261', 
        // Category 5: Community Fridges and Gardens Only -- true in USER_com_1 and false in the other four
            ['all', ['==', ['get', 'USER_com_1'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_commu'], false]],
            '#e44040',
        //Category 6: Multiple Service Location -- true in 2 or more of the boolean columns for service type
        //If a point is not only true for one column it has to be true for more than one (We built dataset and checked that everything assigned at least one category)
            '#264653'  
            ],  
        'circle-stroke-width': 1, //outline width
        'circle-stroke-color': 'black'
    },
    'filter': ['==', ['get', 'USER_tuesd'], true]
});


//WEDNESDAY - Adding Layer for Food Support Open on Monday
map.addLayer({
    'id': 'wednesday',
    'type': 'circle',
    'source': 'food',
    'paint': {
        'circle-radius': 5,
        'circle-color': [
            'case',
        // Category 1: Food Bank Only  -- true in USER_food_ and false in the other four
             ['all', ['==', ['get', 'USER_food_'], true], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_commu'], false], ['==', ['get', 'USER_com_1'], false]],
             '#2A9D8F', 
         // Category 2: Takeout Meals Only  -- true in USER_takeo and false in the other four
             ['all', ['==', ['get', 'USER_takeo'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_commu'], false], ['==', ['get', 'USER_com_1'], false]],
             '#b0e96a', 
         // Category 3: Sit Down Meal Program Only  -- true in USER_meal_ and false in the other four
             ['all', ['==', ['get', 'USER_meal_'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_commu'], false], ['==', ['get', 'USER_com_1'], false]],
             '#E9C46A', 
         // Category 4: Community Program Only -- true in USER_commu and false in the other four
             ['all', ['==', ['get', 'USER_commu'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_com_1'], false]],
             '#F4A261', 
          // Category 5: Community Fridges and Gardens Only -- true in USER_com_1 and false in the other four
             ['all', ['==', ['get', 'USER_com_1'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_commu'], false]],
             '#e44040',
          //Category 6: Multiple Service Location -- true in 2 or more of the boolean columns for service type
          //If a point is not only true for one column it has to be true for more than one (We built dataset and checked that everything assigned at least one category)
             '#264653'  
             ], 
        'circle-stroke-width': 1, //outline width
        'circle-stroke-color': 'black'
    },
    'filter': ['==', ['get', 'USER_wedne'], true]
});


//THURSDAY - Adding Layer for Food Support Open on Monday
map.addLayer({
    'id': 'thursday',
    'type': 'circle',
    'source': 'food',
    'paint': {
        'circle-radius': 5,
        'circle-color': [
            'case',
        // Category 1: Food Bank Only  -- true in USER_food_ and false in the other four
            ['all', ['==', ['get', 'USER_food_'], true], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_commu'], false], ['==', ['get', 'USER_com_1'], false]],
            '#2A9D8F', 
        // Category 2: Takeout Meals Only  -- true in USER_takeo and false in the other four
            ['all', ['==', ['get', 'USER_takeo'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_commu'], false], ['==', ['get', 'USER_com_1'], false]],
            '#b0e96a', 
        // Category 3: Sit Down Meal Program Only  -- true in USER_meal_ and false in the other four
            ['all', ['==', ['get', 'USER_meal_'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_commu'], false], ['==', ['get', 'USER_com_1'], false]],
            '#E9C46A', 
        // Category 4: Community Program Only -- true in USER_commu and false in the other four
            ['all', ['==', ['get', 'USER_commu'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_com_1'], false]],
            '#F4A261', 
        // Category 5: Community Fridges and Gardens Only -- true in USER_com_1 and false in the other four
            ['all', ['==', ['get', 'USER_com_1'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_commu'], false]],
            '#e44040',
        //Category 6: Multiple Service Location -- true in 2 or more of the boolean columns for service type
        //If a point is not only true for one column it has to be true for more than one (We built dataset and checked that everything assigned at least one category)
            '#264653'  
           ],
        'circle-stroke-width': 1, //outline width
        'circle-stroke-color': 'black'
    },
    'filter': ['==', ['get', 'USER_thurs'], true]
});


//FRIDAY - Adding Layer for Food Support Open on Monday
map.addLayer({
    'id': 'friday',
    'type': 'circle',
    'source': 'food',
    'paint': {
        'circle-radius': 5,
        'circle-color': [
            'case',
        // Category 1: Food Bank Only  -- true in USER_food_ and false in the other four
            ['all', ['==', ['get', 'USER_food_'], true], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_commu'], false], ['==', ['get', 'USER_com_1'], false]],
            '#2A9D8F', 
        // Category 2: Takeout Meals Only  -- true in USER_takeo and false in the other four
            ['all', ['==', ['get', 'USER_takeo'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_commu'], false], ['==', ['get', 'USER_com_1'], false]],
            '#b0e96a', 
        // Category 3: Sit Down Meal Program Only  -- true in USER_meal_ and false in the other four
            ['all', ['==', ['get', 'USER_meal_'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_commu'], false], ['==', ['get', 'USER_com_1'], false]],
            '#E9C46A', 
        // Category 4: Community Program Only -- true in USER_commu and false in the other four
            ['all', ['==', ['get', 'USER_commu'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_com_1'], false]],
            '#F4A261', 
        // Category 5: Community Fridges and Gardens Only -- true in USER_com_1 and false in the other four
            ['all', ['==', ['get', 'USER_com_1'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_commu'], false]],
            '#e44040',
        //Category 6: Multiple Service Location -- true in 2 or more of the boolean columns for service type
        //If a point is not only true for one column it has to be true for more than one (We built dataset and checked that everything assigned at least one category)
            '#264653'  
          ],
        'circle-stroke-width': 1, //outline width
        'circle-stroke-color': 'black'
    },
    'filter': ['==', ['get', 'USER_frida'], true]
});


//SATURDAY - Adding Layer for Food Support Open on Monday
map.addLayer({
    'id': 'saturday',
    'type': 'circle',
    'source': 'food',
    'paint': {
        'circle-radius': 5,
        'circle-color': [
            'case',
       // Category 1: Food Bank Only  -- true in USER_food_ and false in the other four
            ['all', ['==', ['get', 'USER_food_'], true], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_commu'], false], ['==', ['get', 'USER_com_1'], false]],
            '#2A9D8F', 
        // Category 2: Takeout Meals Only  -- true in USER_takeo and false in the other four
            ['all', ['==', ['get', 'USER_takeo'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_commu'], false], ['==', ['get', 'USER_com_1'], false]],
            '#b0e96a', 
        // Category 3: Sit Down Meal Program Only  -- true in USER_meal_ and false in the other four
            ['all', ['==', ['get', 'USER_meal_'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_commu'], false], ['==', ['get', 'USER_com_1'], false]],
            '#E9C46A', 
        // Category 4: Community Program Only -- true in USER_commu and false in the other four
            ['all', ['==', ['get', 'USER_commu'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_com_1'], false]],
            '#F4A261', 
        // Category 5: Community Fridges and Gardens Only -- true in USER_com_1 and false in the other four
            ['all', ['==', ['get', 'USER_com_1'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_commu'], false]],
            '#e44040',
        //Category 6: Multiple Service Location -- true in 2 or more of the boolean columns for service type
        //If a point is not only true for one column it has to be true for more than one (We built dataset and checked that everything assigned at least one category)
            '#264653'  
          ],
          'circle-stroke-width': 1, //outline width
          'circle-stroke-color': 'black'
        
    },
    'filter': ['==', ['get', 'USER_satur'], true]
});


//SUNDAY - Adding Layer for Food Support Open on Monday
map.addLayer({
    'id': 'sunday',
    'type': 'circle',
    'source': 'food',
    'paint': {
        'circle-radius': 5,
            'circle-color': [
                'case',
        // Category 1: Food Bank Only  -- true in USER_food_ and false in the other four
            ['all', ['==', ['get', 'USER_food_'], true], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_commu'], false], ['==', ['get', 'USER_com_1'], false]],
            '#2A9D8F', 
        // Category 2: Takeout Meals Only  -- true in USER_takeo and false in the other four
            ['all', ['==', ['get', 'USER_takeo'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_commu'], false], ['==', ['get', 'USER_com_1'], false]],
            '#b0e96a', 
        // Category 3: Sit Down Meal Program Only  -- true in USER_meal_ and false in the other four
            ['all', ['==', ['get', 'USER_meal_'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_commu'], false], ['==', ['get', 'USER_com_1'], false]],
            '#E9C46A', 
        // Category 4: Community Program Only -- true in USER_commu and false in the other four
            ['all', ['==', ['get', 'USER_commu'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_com_1'], false]],
            '#F4A261', 
        // Category 5: Community Fridges and Gardens Only -- true in USER_com_1 and false in the other four
            ['all', ['==', ['get', 'USER_com_1'], true], ['==', ['get', 'USER_food_'], false], ['==', ['get', 'USER_takeo'], false], ['==', ['get', 'USER_meal_'], false], ['==', ['get', 'USER_commu'], false]],
            '#e44040',
        //Category 6: Multiple Service Location -- true in 2 or more of the boolean columns for service type
        //If a point is not only true for one column it has to be true for more than one (We built dataset and checked that everything assigned at least one category)
            '#264653'  
            ],
        'circle-stroke-width': 1, //outline width
        'circle-stroke-color': 'black'
        
    },
    'filter': ['==', ['get', 'USER_sunda'], true]
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
    const layerIds = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

//'food_banks','takeout_meals','sit_meals','community_programs','fridge_gardens'



//Creating Pop-Up Variable for Food Bank Locations
        map.on('click', layerIds, (e) => {
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
            let website = e.features[0].properties.USER_websi;
            let contact = e.features[0].properties.USER_conta;
            let access = e.features[0].properties.USER_acces;
            let target = e.features[0].properties.USER_targe;

        //Variable testing 
           console.log(website);

            var pop_up = new mapboxgl.Popup({className: "food_popups"})
                .setLngLat(e.lngLat)
                .setHTML("<b>" + name + "</b>" 
                    + '<br>' + ' ' 
                    + '<br>' + "<b>" + 'Address: ' + "</b>" + address_name + ", " + postal_code
                    + '<br>' + '<a href="' + "https://www.google.com/maps/place/" + address_name + ", " + postal_code + '" target="_blank">' + "Directions on Google Maps" + '</a>' 
                    + '<br>' + "<b>" + 'Services: ' + "</b>" + services
                    + '<br>' + "<b>" + 'Operating Hours: ' + "</b>" + hours
                    + '<br>' + "<b>" + 'Appointment Required: ' + "</b>" + appt
                    + '<br>' + "<b>" + 'Residency Requirements: ' + "</b>" + res_req + " (" + res_req_details + ")"
                    + '<br>' + "<b>" + 'Target Group: ' + "</b>" + target
                    + '<br>' + "<b>" + 'Website: ' + "</b>" +  '<a href="' + website + '" target="_blank">' + website + '</a>'
                    + '<br>' + "<b>" + 'Contact: ' + "</b>" + contact
                    + '<br>' + "<b>" + 'Wheelchair Accessible: ' + "</b>" + access)
                .addTo(map);
            });

            
        
            // Change the cursor to a pointer when the mouse is over the layer
            map.on('mouseenter', layerIds, () => {
            map.getCanvas().style.cursor = 'pointer';
            });
             
            // Change the cursor back to a pointer
            map.on('mouseleave', layerIds, () => {
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
// Filtering TTC Subway Locations
// --------------------------------------------------------------------*/
// Add a variable to store the state of the checkbox
var ttc_checkbox = document.getElementById('ttccheck')

//Attach event listener to the checkbox
document.getElementById('ttccheck').addEventListener('change', function() {
  ttc_checkbox.addEventListener('change', function() {
    if (this.checked) {
      map.setLayoutProperty('ttc', 'visibility', 'visible'); // Show layer when checkbox is checked
    } else {
      map.setLayoutProperty('ttc', 'visibility', 'none'); // Hide layer when checkbox is unchecked
    }
  });
});


// /*--------------------------------------------------------------------
// Filtering Service Type
// --------------------------------------------------------------------*/
//Filter for Food Banks

// // Defining Service Type Boolean Properties 
// const serviceProperties = ['USER_food_', 'USER_takeo', 'USER_meal_', 'USER_commu', 'USER_com_1'];

// // Array of layer IDs defined above -- see line 373

// // Add a change event listener to each checkbox
// serviceProperties.forEach((serviceProperty) => {
//   const checkbox = document.getElementById(boolProperty);
//   checkbox.addEventListener('change', (e) => {
//     const filterValue = e.target.checked ? true : false;
//     const filter = ['==', serviceProperty, filterValue];
//     layerIds.forEach((layerId) => {
//       map.setFilter(layerId, filter);
//     });
//   });
// });


// Define Food Bank Filter Column
// const food_property = 'USER_food_';

// 'case',
//     ['all', ['==', ['get', 'USER_food_'], true]],
//     ['all', ['==', ['get', 'USER_takeo'], true]],
//     ['all', ['==', ['get', 'USER_meal_'], true]],
//     ['all', ['==', ['get', 'USER_commu'], true]],
//     ['all', ['==', ['get', 'USER_com_1'], true]],
// Array of layer IDs defined above -- see line 373

// Add a change event listener to the checkbox
// document.getElementById('foodbankcheck').addEventListener('change', (e) => {
//   const filterValue = e.target.checked ? true : false;
//   const filter = ['==', food_property, true];
//   layerIds.forEach((layerId) => {
//     map.setFilter(layerId, filter);
//   });
// });


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
});