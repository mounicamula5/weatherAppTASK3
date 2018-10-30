<?php

header('Access-Control-Allow-Origin: *');
//sleep(3);

/**
 * This script mirrors metaweather API.
 * It offers two commands:
 *
 * command: search
 * uri: weather.php?command=search&keyword={your_keyword}
 * 
 * command: location
 * uri: weather.php?command=location&woeid={target_woeid}
 */

/**
 * Declarations
 */
$validCommands = [
	'search',
	'location'
];

$command = isset($_GET['command']) ? $_GET['command'] : null;
$baseUrl = 'https://www.metaweather.com/api/location/';

/**
 * Functions
 */
function quitWithResponse($output, $code = 200) {
	header('Content-Type: text/json');
	http_response_code($code);
	echo $output;
	exit;
}

function quitWithJsonResponse($output, $code = 200) {
	return quitWithResponse(
		json_encode($output),
		$code
	);
}

function mirrorToEndpointMock($uri) {
	global $baseUrl;
	$response = '{
    "consolidated_weather": [
        {
            "id": 5436905252454400,
            "weather_state_name": "Showers",
            "weather_state_abbr": "s",
            "wind_direction_compass": "W",
            "created": "2017-11-25T23:48:05.017170Z",
            "applicable_date": "2017-11-26",
            "min_temp": 3.8299999999999996,
            "max_temp": 7.5739999999999998,
            "the_temp": 6.7850000000000001,
            "wind_speed": 7.5528177909249994,
            "wind_direction": 270.6000511956982,
            "air_pressure": 1028.0250000000001,
            "humidity": 78,
            "visibility": 15.810789986478962,
            "predictability": 73
        },
        {
            "id": 5101323888361472,
            "weather_state_name": "Showers",
            "weather_state_abbr": "s",
            "wind_direction_compass": "SW",
            "created": "2017-11-25T23:48:08.431400Z",
            "applicable_date": "2017-11-27",
            "min_temp": 5.6820000000000004,
            "max_temp": 9.0580000000000016,
            "the_temp": 8.0500000000000007,
            "wind_speed": 10.828696420814444,
            "wind_direction": 230.19778240686378,
            "air_pressure": 1023.225,
            "humidity": 82,
            "visibility": 15.359053129722421,
            "predictability": 73
        },
        {
            "id": 6129907352469504,
            "weather_state_name": "Showers",
            "weather_state_abbr": "s",
            "wind_direction_compass": "W",
            "created": "2017-11-25T23:48:11.410670Z",
            "applicable_date": "2017-11-28",
            "min_temp": 3.5019999999999998,
            "max_temp": 8.3820000000000014,
            "the_temp": 7.7350000000000003,
            "wind_speed": 7.8911761965258886,
            "wind_direction": 267.42783484224321,
            "air_pressure": 1007.255,
            "humidity": 84,
            "visibility": 12.588980354728387,
            "predictability": 73
        },
        {
            "id": 4673027065249792,
            "weather_state_name": "Heavy Cloud",
            "weather_state_abbr": "hc",
            "wind_direction_compass": "WNW",
            "created": "2017-11-25T23:48:14.397430Z",
            "applicable_date": "2017-11-29",
            "min_temp": 2.8999999999999999,
            "max_temp": 6.8600000000000012,
            "the_temp": 6.6500000000000004,
            "wind_speed": 6.3425859383186189,
            "wind_direction": 299.39842397144469,
            "air_pressure": 1005.995,
            "humidity": 80,
            "visibility": 10.824286168774357,
            "predictability": 71
        },
        {
            "id": 6303930300497920,
            "weather_state_name": "Light Rain",
            "weather_state_abbr": "lr",
            "wind_direction_compass": "WNW",
            "created": "2017-11-25T23:48:17.396280Z",
            "applicable_date": "2017-11-30",
            "min_temp": 1.746,
            "max_temp": 4.7460000000000004,
            "the_temp": 5.7999999999999998,
            "wind_speed": 5.7839700151117475,
            "wind_direction": 297.9860675027374,
            "air_pressure": 1009.52,
            "humidity": 81,
            "visibility": null,
            "predictability": 75
        },
        {
            "id": 5798638940848128,
            "weather_state_name": "Showers",
            "weather_state_abbr": "s",
            "wind_direction_compass": "WNW",
            "created": "2017-11-25T23:48:20.388790Z",
            "applicable_date": "2017-12-01",
            "min_temp": 2.532,
            "max_temp": 6.3220000000000001,
            "the_temp": 6.2800000000000002,
            "wind_speed": 7.0463217808001275,
            "wind_direction": 301.72850817657849,
            "air_pressure": 1012.22,
            "humidity": 79,
            "visibility": null,
            "predictability": 73
        }
    ],
    "time": "2017-11-26T01:38:31.025600+01:00",
    "sun_rise": "2017-11-26T08:16:06.278681+01:00",
    "sun_set": "2017-11-26T16:59:28.697802+01:00",
    "timezone_name": "LMT",
    "parent": {
        "title": "France",
        "location_type": "Country",
        "woeid": 23424819,
        "latt_long": "46.71,1.72"
    },
    "sources": [
        {
            "title": "BBC",
            "slug": "bbc",
            "url": "http://www.bbc.co.uk/weather/",
            "crawl_rate": 180
        },
        {
            "title": "Forecast.io",
            "slug": "forecast-io",
            "url": "http://forecast.io/",
            "crawl_rate": 480
        },
        {
            "title": "HAMweather",
            "slug": "hamweather",
            "url": "http://www.hamweather.com/",
            "crawl_rate": 360
        },
        {
            "title": "Met Office",
            "slug": "met-office",
            "url": "http://www.metoffice.gov.uk/",
            "crawl_rate": 180
        },
        {
            "title": "OpenWeatherMap",
            "slug": "openweathermap",
            "url": "http://openweathermap.org/",
            "crawl_rate": 360
        },
        {
            "title": "Weather Underground",
            "slug": "wunderground",
            "url": "https://www.wunderground.com/?apiref=fc30dc3cd224e19b",
            "crawl_rate": 720
        },
        {
            "title": "World Weather Online",
            "slug": "world-weather-online",
            "url": "http://www.worldweatheronline.com/",
            "crawl_rate": 360
        },
        {
            "title": "Yahoo",
            "slug": "yahoo",
            "url": "http://weather.yahoo.com/",
            "crawl_rate": 180
        }
    ],
    "title": "Paris",
    "location_type": "City",
    "woeid": 615702,
    "latt_long": "48.856930,2.341200",
    "timezone": "Europe/Paris"
}';
    $response = json_decode($response, true);
    $response['woeid'] = $_GET['woeid'];
    $response = json_encode($response);
	
	if ( $response ) {
		return quitWithResponse($response);	
	}	
	
	quitWithJsonResponse(['error' => 'Not found'], 404);
}

function requireParameters($params) {
	foreach ($params as $param) {
		if (!isset($_GET[$param])) {
			quitWithJsonResponse(['error' => $param . ' is missing']);
		}
	}
}


function mirrorToEndpoint($uri) {
    global $baseUrl;
    $response = @file_get_contents($baseUrl . $uri);

    if ( $response ) {
        return quitWithResponse($response);
    }

    quitWithJsonResponse(['error' => 'Not found'], 404);
}

/**
 * Commands
 */
function search() {
	requireParameters(['keyword']);
	return mirrorToEndpoint('search/?query=' . $_GET['keyword']);
}

function location() {
	requireParameters(['woeid']);
	return mirrorToEndpointMock($_GET['woeid']);
}

/**
 * Execution
 */
if (is_null($command) or !in_array($command, $validCommands)) {
	quitWithJsonResponse(['error' => 'Invalid command'], 422);
}

$command();