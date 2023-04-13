# ggr472-final-project
Authour: Georgia Samuel 
Date of Last Edit: April 13th, 2021
Title:   Final Project for GGR472 - Mapping Food Support Systems
 
Purpose: Websites purpose is to help food insecure individuals easily access information about food support services. Specifically, this is done through the development of intuitive service type symbology on a simple map, standardized pop-ups and contextualization of the map through the addition of grocery discount and food support service information on other webpages.

Included in Repository
- 2 geojson files -- food support systems and ttc stations
- Index Page (HTML/CSS/JAVASCRIPT) -- storing Map 
- Information Page (HTML/CSS/JAVASCRIPT) -- storing additional information about food banks 
- Resources Page (HTML/CSS/JAVASCRIPT) -- additional infomration about grocery discounts 
- About Page (HTML/CSS/JAVASCRIPT) -- about the map developers
- Image for Subway Icon 
- Images for About Us Page


Map Functionality
- Filtering layers 
- Case When Symbology based on multiple filterable columns
- Custom Pop-up Configurations (including Google Maps and organization website hyperlink)
- Turf js buffer derivation from one layer
- Geocoder 

Datasets:
 - TTC Subway Stations 
    -- Derived from Toronto Open Data 
 - Food Support Services dataset 
     -- This dataset was compiled in a spreadsheet, geocoded in ArcGIS and converted into a geojson from a shapefile in QGIS
     -- It includes information about food banks, takeout meal programs, sit down meal programs, community programming, community fridges and gardens 

Data Sources: 
- Toronto Health Line (https://www.torontocentralhealthline.ca/listservices.aspx?id=10572)
- Daily Bread Food Bank (https://www.dailybread.ca/need-food/programs-by-location/)
- Community Fridges TO (https://www.instagram.com/cf___to/?hl=en)
- Open Data City of Toronto (https://www.toronto.ca/city-government/data-research-maps/open-data/)

Tags: foodbanks, food banks, toronto, food insecurity, food support, food, community centres, community fridges, soup kitchens, takeout, sit down meals, meal programs, communtiy kitchens, community gardens, poverty reduction

Map Notes: All data is sourced form GeoJSON files which are projected in World Geodetic System 1984 (WGS 1984)


