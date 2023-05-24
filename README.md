
# City API Documentation

These documents are used for the  [seyahat-rotası](https://seyahat-rotasi.netlify.app/) 

#### Contents

- [Overview](#1-overview)
- [Authentication](#2-authentication)  ( [SignUp](#21-signup) / [Login](#22-login) )
- [Resources](#3-resources)
    - [Users](#31-users)  ( [Get Current User](#311-get-current-user) )
  - [Cities](#32-cities) ( [Get All Cities](#321-get-all-cities) / [Get City](#322-get-city) )
  - [Tours](#33-tours) ( [Get All Tours](#331-get-all-tours) /  [Get Tour](#332-get-tour) / [Create Tour](#333-create-tour) / [Update Tour](#334-update-tour) / [Delete Tour](#335-delete-tour) )

## 1. Overview

City’s API is a REST API. All requests are made to endpoints beginning:  
`https://city-api-production.up.railway.app/api/v1/`

All requests must be secure, i.e. `https`, not `http`.

## 2. Authentication

In order to some transaction (create, delete, update) , you will need an access token. You can acquire an access token in one way -> **token based authentication**.

### 2.1. SignUp 
For the protected routes, firstly you should sign up.

```
POST https://city-api-production.up.railway.app/api/v1/users/signup
```
The first step, you should send json body. Example body:

```json
{
    "name": "exampleName",
    "email": "exampleEmail@email.com",
    "password": ******,
    "passwordConfirm": ******
}
```

With the following fields:

| Parameter | Type | Required?  | Description |
| --- |--------|------------|------------|
| name  | string    | required   | The name of the user.   |
| email   | string | required   | The email of the user. Email should be unique. |
| password    | string   | required   | The password of the user. At least 6 characters.  |
|passwordConfirm |string |required |The password of the user.Password and passwordConfirm should be same.|


Example response: 

```json
{
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NmMyNjAwOWJjMjFiZGFkZDdkMTRlZCIsImlhdCI6MTY4NDgwOTIxNywiZXhwIjoxNjkyNTg1MjE3fQ.qririzatuWImmvv5hPBZlD6Y0BCRaEnk-CgjIJ2JqXU",
    "data": {
        "user": {
            "_id": "646c26009bc21bdadd7d14ed",
            "name": "exampleName",
            "email": "exampleemail@email.com",
            "photo": "default.jpg"
        }
    }
}
```

Where a User object is:

| Field     | Type         | Description       |
| --------------|----------|--------------|
| status  | string       | The status of your request.  |
| token     | string       | The user's token. This token has a validity of 90 days.  |
|   _id    | string       | The userId of the user.    |
| name   | string  | The user's name.       |
| email    | string       | The user's email.      |
| photo  | string       | The user's photo.   |



Possible errors:

| Error code  | Description |
| ------|-------|
| 400 Bad Request | Duplicate fields or invalid input data |


### 2.2. Login 

```
POST https://city-api-production.up.railway.app/api/v1/users/login
```
The first step, you should send json body. Example body:

```json
{
    "email": "exampleEmail@email.com",
    "password": "{{password}}"
}
```

With the following fields:

| Parameter | Type | Required?  | Description |
| --- |--------|------------|------------|
| email   | string | required   | The email of the user.|
| password    | string   | required   | The password of the user.   |



Example response: 

```json
{
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NmMyZTFmYjk3YzM0MzUyOTRmMTZlYSIsImlhdCI6MTY4NDgyMDMwMywiZXhwIjoxNjkyNTk2MzAzfQ.hSBYBczAZuLO4DSRjWOF6-6Ambv68wH5IjAo_JKzv20",
    "data": {
        "user": {
            "_id": "646c2e1fb97c3435294f16ea",
            "name": "exampleName",
            "email": "exampleEmail@email.com",
            "photo": "default.jpg"
        }
    }
}
```

Possible errors:

| Error code  | Description |
| ------|-------|
| 400 Bad Request |  Invalid input data. Provide email and password. |
| 401 Unauthorized |  Incorrect email or password. |

## 3. Resources

The API is RESTful and arranged around resources.  All requests must be made using `https`. 

### 3.1. Users

#### 3.1.1. Get Current User
Returns details of the user who has granted permission to the application.

```
GET https://city-api-production.up.railway.app/api/v1/users/me
```

Example request header:

```
Authorization: Bearer 181d415f34379af07b2c11d144dfbe35d
```

The response is a User object within a data envelope. Example response:

```json
{
    "status": "success",
    "data": {
        "user": {
            "_id": "646c2e1fb97c3435294f16ea",
            "name": "exampleName",
            "email": "exampleEmail@email.com",
            "photo": "default.jpg"
        }
    }
}
```

Possible errors:

| Error code           | Description                                     |
| ---------------------|-------------------------------------------------|
| 401 Unauthorized     | `Token` is invalid.|

### 3.2. Cities

#### 3.2.1. Get All Cities

Returns a full list of cities. An example request looks like this:

```
GET https://city-api-production.up.railway.app/api/v1/cities
```

The response is a list of cities objects. The response array is wrapped in a data envelope. This endpoint will return all cities in Turkey. Example response:

```json 
{
    "status": "success",
    "results": 81,
    "data": {
        "city": [
            {
                "_id": "5c88fa8cf4afda39709c0101",
                "name": "adana",
                "cityPlate": 1
            },
            { ...
            }
        ]
    }
}
```

Where a City object is:

| Field       | Type   | Description                                     |
| ------------|--------|-------------------------------------------------|
| _id          | string | The id of city       |
| name        | string | The name of city    |
| cityPlate | string | The plate of city    |

#### 3.2.2. Get City

This endpoint returns a specific city. An example request looks like this:

```
GET https://city-api-production.up.railway.app/api/v1/cities/{{cityID}}
```
An example response looks like this:

```json
{
    "status": "success",
    "data": {
        "city": {
            "_id": "5c88fa8cf4afda39709c0134",
            "name": "istanbul",
            "cityPlate": 34
        }
    }
}
```

Possible errors:

| Error code           | Description                                                                           |
| ---------------------|---------------------------------------------------------------------------------------|
| 400 Bad Request     | `CityId` is invalid|

### 3.3. Tours

#### 3.3.1. Get All Tours

Returns a full list of tours. An example request looks like this:

```
GET https://city-api-production.up.railway.app/api/v1/tours
```

The response is a list of tours objects. The response array is wrapped in a data envelope. This endpoint will return all tours in Turkey. Example response:

```json
{
    "status": "success",
    "results": 100,
    "data": {
        "tour": [
            {
                "_id": "5c88fa8cf4afda39709d3301",
                "name": "Kızkalesi",
                "type": "Point",
                "coordinates": [ 34.14838183524257, 36.457274128490575],
                "cityName": "mersin",
                "address": "Atakent, Mersin - Antalya Yolu, 33740 Silifke/Mersin",
                "details_url": "https://www.kulturportali.gov.tr/turkiye/mersin/",
                "images": ["https://city-api-production.up.railway.app/img/mersin/31.jpeg"],
                "locDescription": "Deniz Kalesi olarak da bilinen Kızkalesi ...",
                "city": "5c88fa8cf4afda39709c0133",
                "user": "644d1a8a2093cca5689894b0"
            },
            {...
            }
        ]
    }
}
```

Where a Tour object is:

| Field       | Type   | Description                                     |
| ------------|--------|-------------------------------------------------|
| _id          | string | The id of tour.       |
| name        | string | The name of tour.    |
| type | string |  Tour location type is point.     |
| coordinates | number array | Coordinates of tour location. [longitude, latitude]           |
| cityName | string | Name of city in tour. |
| address | string | The adress of tour.            |
| details_url | string | The details_url of tour.         |
| images | string array | The images of tour.           |
| locDescription | string |The description of tour.           |
| city | string | The id of city in tour.           |
| user | string | The id of user in tour.          |

#### 3.3.2. Get Tour
This endpoint returns a specific tour. An example request looks like this:

```
GET https://city-api-production.up.railway.app/api/v1/tours/{{tourID}}
```
An example response looks like this:

```json
{
    "status": "success",
    "data": {
        "tour": [
            {
                "_id": "5c88fa8cf4afda39709d3301",
                "name": "Kızkalesi",
                "type": "Point",
                "coordinates": [ 34.14838183524257, 36.457274128490575],
                "cityName": "mersin",
                "address": "Atakent, Mersin - Antalya Yolu, 33740 Silifke/Mersin",
                "details_url": "https://www.kulturportali.gov.tr/turkiye/mersin/",
                "images": ["https://city-api-production.up.railway.app/img/mersin/31.jpeg"],
                "locDescription": "Deniz Kalesi olarak da bilinen Kızkalesi ...",
                "city": "5c88fa8cf4afda39709c0133",
                "user": "644d1a8a2093cca5689894b0"
            }
        ]
    }
}
```

Possible errors:

| Error code           | Description                                                                           |
| ---------------------|---------------------------------------------------------------------------------------|
| 400 Bad Request     | `TourID` is invalid.|

#### 3.3.3. Create Tour
You should grant permission to the application for create a new tour.

```
POST https://city-api-production.up.railway.app/api/v1/tours
```

Example request header:

```
Authorization: Bearer 181d415f34379af07b2c11d144dfbe35d
```

Example request body:

```json
{
    "name": "Eyüp Sultan Camii",
    "city": ["5c88fa8cf4afda39709c0134"]
}
```

With the following fields:

| Parameter       | Type         | Required?  | Description                                     |
| -------------   |--------------|------------|-------------------------------------------------|
| name           | string        | required   | The name of tour. |
| city            | string array | required   | The id of city in tour.      |
| type    | string       | optional   | The type of tour location.  |
| coordinates   | number array         | optional   | The coordinates of tour location.   |
| cityName         | string         | optional   | The name of city in tour. |
| address | string         | optional   | The address of tour. |
| details_url | string         | optional   | The details_url of tour. |
| images | string array         | optional   | The images of tour. |
| locDescription | string         | optional   | The description of tour. |
| user | string array         | optional   | The id of user in tour. |


Possible errors:

| Error code           | Description         |
| ---------------------|-------------------------|
| 400 Bad Request      | Required fields were invalid, not specified.   |

#### 3.3.4. Udpate Tour
You should grant permission to the application for update a tour.

```
PATCH https://city-api-production.up.railway.app/api/v1/tours/{{tourID}}
```

Example request header:

```
Authorization: Bearer 181d415f34379af07b2c11d144dfbe35d
```

Example request body:

```json
{
    "name": "Eyüp Sultan Camii",
    "coordinates": ["35.32", "36.98"]
}
```

Possible errors:

| Error code           | Description         |
| ---------------------|-------------------------|
| 400 Bad Request      | `TourID` is invalid.  |

#### 3.3.5. Delete Tour
You should grant permission to the application for delete a tour.

```
DELETE https://city-api-production.up.railway.app/api/v1/tours/{{tourID}}
```

Example request header:

```
Authorization: Bearer 181d415f34379af07b2c11d144dfbe35d
```

Returns no content. (204)


Possible errors:

| Error code           | Description         |
| ---------------------|-------------------------|
| 400 Bad Request      | `TourID` is invalid.  |


