// Define endpoints for each unique earthquake data set for our filters (we'll choose 3)
var m45plus_30days_queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";
var sig_30days_queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";
var sig_7days_queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson";
var all_1day_queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// Define layer arrays for each dataset
var layer1_data;
var layer2_data;
var layer3_data;
var layer1_name = "Mag 4.5+: 30 days";
var layer2_name = "Significant: 30 days";
var layer3_name = "All: 1 day";

/**
 * Perform GET requests to USGS.gov query URLs using d3.json
 * @param {string} queryURL - URL 
 */
d3.json(m45plus_30days_queryUrl, function(data) {
    // Once we get a response, save data.features to our layer array
    layer1_data = data.features;

    d3.json(sig_30days_queryUrl, function(data) {
        // Once we get a response, save data.features to our layer array
        layer2_data = data.features;

        d3.json(all_1day_queryUrl, function(data) {
            // Once we get a response, save data.features to our layer array
            layer3_data = data.features;

            // Pass all our layers to the mapping function to plot them
            mapLayers(layer1_data, 
                      layer2_data,
                      layer3_data);
        });
    });
});

/**
 * Map all the points based on the data retrieved from d3.json call
 * @param {Object[]} layer1 - JSON data returned from usgs.gov
 * @param {string}  layer1name - Name of layer 1
 * @param {Object[]} layer2 - layer 2 JSON data returned from usgs.gov
 * @param {string} layer2name - layer 2 name
 * @param {Object[]} layer3 - layer 3 JSON data returned from usgs.gov
 * @param {string} layer3name - layer 3 name
*/
function mapLayers(layer1, layer2, layer3) {
    /**
     * Function that runs once for each item in the GeoJSON features array. Used 
     * to show details about GeoJSON feature.
     * @param {*} feature 
     * @param {*} layer 
     */
    function bindFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place + "</h3><hr>" + 
            "<p><b>Time:</b> " + new Date(feature.properties.time) + 
            "<br /><b>Magnitude:</b> " + feature.properties.mag + "</p>");
    }
    /**
     * Function that defines how GeoJSON points spawn Leaflet layers. Internally called 
     *  when data is added, passing the GeoJSON point feature and its LatLng.
     * @param {*} feature 
     * @param {number[]} latlng 
     */
    function bindLayer(feature, latlng) {
        return L.circleMarker(latlng, {
            radius: feature.properties.mag * 3
        });
    }

    /**
     * A Function defining the Path options for styling 
     * GeoJSON lines and polygons, called internally when data is added
     * @param {*} feature 
     */
    function styleLayer(feature) {
        return {
            fillColor: getColor(feature.properties.mag),
            weight: 2,
            opacity: 1,
            fillOpacity: 0.7
        };
    }

    // Create a GeoJSON layer containing the features array on the usgsData object, running 
    //  the onEachFeature() function once for each item in the array
    var L_layer1 = L.geoJSON(layer1, {
        onEachFeature: bindFeature,
        pointToLayer: bindLayer,
        style: styleLayer
    });
    var L_layer2 = L.geoJSON(layer2, {
        onEachFeature: bindFeature,
        pointToLayer: bindLayer,
        style: styleLayer
    });
    var L_layer3 = L.geoJSON(layer3, {
        onEachFeature: bindFeature,
        pointToLayer: bindLayer,
        style: styleLayer
    });

    // Send the data layers to the createMap function
    createMaps(L_layer1, L_layer2, L_layer3);
}

/**
 * Output the map background from Mapbox.com token
 * @param {Object[]} L_1 - Leaflet layer 1
 * @param {Object[]} L_2 - Leaflet layer 2
 * @param {Object[]} L_3 - Leaflet layer 3
 */
function createMaps(L_1, L_2, L_3) {
    // Define streetmap layer
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
        "access_token=pk.eyJ1Ijoic3NjaGFkdCIsImEiOiJjamRoazJlb3QweDRsMnhwZzF4aW0zbWNqIn0.NtBL9Pk91QqV3AjXhGJBQg");

    // Define a baseMaps object to hold our base layer
    var baseMaps = {
        "Street Map": streetmap,
    };

    // Define map overlay names & data
    var overlayMaps = {};
    overlayMaps[layer1_name] = L_1
    overlayMaps[layer2_name] = L_2
    overlayMaps[layer3_name] = L_3
    var overlays = {
                    "Earthquake types": overlayMaps
                    }
    // Create our map, giving it the streetmap and earthquakes layers to display on load
    var myMap = L.map("map", {
        center: [
            37.09, -95.71
        ],
        zoom: 3.5,
        layers: [streetmap, L_1, L_2, L_3]
    });

    // Define overlay options 
    var overlaysOptions = {
        groupCheckboxes: false,
        collapsed: false,
        position: 'topright'
    };

    // Add filtering layer groups to our Leaflet map object
    L.control.groupedLayers(null, overlays, overlaysOptions).addTo(myMap);

    // Add legend to map object
    createLegend(myMap);
}


/**
 * Output the map's legend based on color scale defined in 'getColor()'
 * @param {*} m - Leaflet map
 */
function createLegend(m) {
    var legend = L.control({position: 'bottomright'});
    legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend');
        grades = [0, 1, 2, 3, 4, 5];

        for (var i = 0; i < grades.length; i++) {
            div.innerHTML += '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }
        return div;
    };

    // Add legend to map
    legend.addTo(m);
}

/**
 * Define color scale for our map legend
 * @param {number} d - number for our scale
 */
function getColor(d) {
    return d > 5 ? "#F06B6B" :      
           d > 4 ? "#F0A76B" :
           d > 3 ? "#F3BA4D" :
           d > 2 ? "#F3DB4D" :
           d > 1 ? "#E2F350" :
                   "#B7F34D";
}