# City-API

This API provides cities and tours for building the city-app project [City-App](https://seyahat-rotasi.netlify.app/)  

## Get all tours in city
**GET:** Returns a list of tours for a specific search city query  
**Path:** https://city-api-production.up.railway.app/api/v1/locations?cityName={{city}}  
**Example URL:** https://city-api-production.up.railway.app/api/v1/locations?cityName=istanbul  

## Get tour
**GET:** Return a single tour
**Path:** https://city-api-production.up.railway.app/api/v1/locations/:id  
**Example URL:** https://city-api-production.up.railway.app/api/v1/locations/5c88fa8cf4afda39709c3402  
