# Internal API Documentation

This document serves as a quick reference to the internal API's that are available to our front-end pages to interact with.

Back-end API's are separated into groups of similar responsibility/domain. These groups can be found in sub-folders of `src/routes`.

## Document To-Do

* add example urls
* document query parameters
* document legal methods
* document json bodies
* document required API keys and env vars


## Contents

- [API Documentation](#Internal-API-Documentation)
    - [Identification](#Identification-/id/)
        - [Cookies](#Cookie-Monster)
        - [Deployment](#Deployment-Info)
    - [Location](#Location-/location/)
        - [City](#City)
        - [Verification](#Verify)
    - [Database](#Database-/speedDB/)
        - [Main CRUD Endpoint](#)
        - [Information Cache](#)
        - [Export Data](#Export)
        - [Test History](#)
    - [Speed Testing](#Speed-Testing-/test/)
        - [Empty](#Empty)
        - [Garbage](#Garbage)
        - [GetIP](#GetIP)

## Identification /id/

### Cookie Monster

Cookie Monster assigns a user a unique indentifier, stored as a cookie, for the application to use to remember the user across multiple sessions. 

Cookie assignment is done automatically when the user visits the site. See template.html.

This unique identifier is attached to each speed test the user takes, allowing them to see a unique history of only their tests. This is of course limited to their current device and browser.

### Deployment Info

Deployment info allows for our developers to set environment variables in .env or on Heroku to display custom messages about the current deployment on the home page.

`BRANCH_NAME` should represent the general goal/feature of the current branch. `BRANCH_INFO` should be a short sentance providing some extra detail about the features/goals.

If these variables are not set, this route will return default hardcoded values.

## Location /location/

### City

GET this endpoint with latitude and longitude coordinates to get the name of the town and state that the coordinates are in. This is achieved not through the geocoding API, but through the radius search API. The radius search returns a handful of nearby addresses to the provided coordinates. These nearby addresses have more accurate municipality info than the geocoding API can provide.

### Verify

GET this endpoint with a 5 digit zip code or city, state string to verify whether that location actually exists. 

## Database /speedDB/

### Main CRUD Endpoint

The primary Create/Read/Update/Delete endpoint performs simple interactions with our database.

* create a new speedtest entry
* read all speedtest entries (for now)
* update a specific entry 
    * generally, just to update location information. almost every other field should remain unedited
* delete a specific entry

Creating and Updating can both be done through POST. GET will return stored entried, DEL can delete a provided entry with given ID.

### Information Cache

The following assumptions should hold in our data model: 

1. an IP address should always map to the same ISP
2. a combination key of IP address + user cookie should always map to the same location

with these givens, a user who tests multiple times should only have to call our external API's once (the first time) and on subsequent tests their information will be retireved from previous tests.

The information cache, therefore, uses our database as a cache to remember these pieces of info to save time/api requests to get this information from external sources.


### Exporting Data

For internal development/ testing with ArcGIS, this route is available to download all test data in a Tab-seprated format (to prevent interference with commas). Accessing this endpoint without providing the password will deny permission to the resources.

### Test History

Using a user's cookie ID, returns the list of their previous tests.

## Speed Testing /test/

### Enpty

This endpoint does almost nothing. It exists as an endpoint for ping tests and upload tests. 

### Garbage

GET from garbage to recieve a large amount of random binary data. Manually accessing this endpoint will download the entire 500 MB file. When the SpeedTest calls this endpoint, it will automatically stop the download once the test is over.

### GetIP

This endpoint is redundant and subject to be removed from the project. It mimics the suggested method by Librespeed developers to determine the user's IP address and ISP provider. It also provides a suggested method to determine the distance between the user and the server, which is information that we do not currently use but could be useful in the future. 