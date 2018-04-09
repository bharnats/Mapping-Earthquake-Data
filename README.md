# Visualize-Earthquake_Data
## Background

![1-Logo](images/1-Logo.png)

Welcome to the United States Geological Survey, or USGS for short! The USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. As a new hire, you will be helping them out with an exciting new project!

The USGS is interested in building a new set of tools that will allow them visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. Their hope is that being able to visualize their data will allow them to better educate the public and other government organizations (and hopefully secure more funding..) on issues facing our planet.

## Task List

### Step 1: Basic Visualization

![2-BasicMap](images/2-BasicMap.png)

The first task is to visualize an earthquake data set.

1. **Get your data set**

   ![3-Data](images/3-Data.png)

   The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page and pick a data set to visualize. When the dataset is clicked, for example 'All Earthquakes from the Past 7 Days', we'll be given a JSON representation of that data. I'll will be using the URL of this JSON to pull in the data for our visualization.

   ![4-JSON](images/4-JSON.png)

2. **Import & Visualize the Data**

   Create a map using Leaflet that plots all of the earthquakes from our data set based on their longitude and latitude.

   * The data markers reflect the magnitude of the earthquake in their size and color. Earthquakes with higher magnitudes appear larger and darker in color.

   * Include popups that provide additional information about the earthquake when a marker is clicked.

   * Create a legend that will provide context for your map data.

   * The visualization obtained is as shown above !
- - -

### Step 2: More Data

![5-Advanced](images/5-Advanced.png)

The USGS wants us to plot a second data set on our map to illustrate the relationship between tectonic plates and seismic activity. I  need to pull in a second data set and visualize it along side my original set of data. Data on tectonic plates can be found at <https://github.com/fraxen/tectonicplates>.

In this step we are going to..

* Plot a second data set on our map.

* Add a number of base maps to choose from as well as separate out our two different data sets into overlays that can be turned on and off independently.

* Add layer controls to our map.

- - -

### Step 3: Time Keeps on Ticking

![7-NotGif](images/6-Time_Keeps_On_Ticking.gif)

Many people don't know how much seismic activity is happening around them all the time. Did you know that Southern California has over 10,000 earthquakes each year alone? The USGS wants you to create a map that will visualize just how many earthquakes happen over the course of a day/week.

* Use a Leaflet plugin (they can be found at <http://leafletjs.com/plugins.html>) to visualize the earthquake as it takes place over a period of time.

- - -

### Bonus: Above and Beyond

Two ideas of ways to go above and beyond:

* Find another set of geospatial data that can be used to show a new correlation or insight about our existing earthquake data.

* Use additional plug-ins from the [Leaflet Documentation](http://leafletjs.com/plugins.html) to further visualize our data in a unique way.

  * Heatmap
    ![Heat](images/Heat.png)

  * Data Clustering
    ![Cluster](images/Cluster.png)



