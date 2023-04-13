// /*--------------------------------------------------------------------
// About Us Page Code 
// --------------------------------------------------------------------*/


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



// /*--------------------------------------------------------------------
// FILTERING FOR SERVICE TYPE
// --------------------------------------------------------------------*/

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
//});
