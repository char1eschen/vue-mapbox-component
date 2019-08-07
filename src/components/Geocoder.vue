<template>
  <div style="height:100%;width:100%;">
    <div id="geocoder" class="geocoder"></div>
    <div id="map" ref="basicMapbox" :style="mapSize"></div>
    <div class="sidebar">
      <div class="heading">
        <h1>Our locations</h1>
      </div>
      <div id="listings" class="listings"></div>
    </div>
  </div>
</template>
<script>
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

export default {
  props: {
    mapWidth: {
      type: String
    },
    mapHeight: {
      type: String
    },
    activeMarker: Object,
    currentStore: Object,
    userLocation: Object,
    currentStyle: {
      type: String,
      default: "mapbox://styles/secrid/cjipvou322goy2rmnmgsyf8xe"
    },
    markers: {
      type: Array,
      default: function() {
        // return [];
        return [
          {
            type: "Feature",
            properties: {
              title: "Lincoln Park",
              description:
                "A northside park that is home to the Lincoln Park Zoo"
            },
            geometry: {
              coordinates: [-87.637596, 41.940403],
              type: "Point"
            }
          },
          {
            type: "Feature",
            properties: {
              title: "Burnham Park",
              description: "A lakefront park on Chicago's south side"
            },
            geometry: {
              coordinates: [-87.603735, 41.829985],
              type: "Point"
            }
          },
          {
            type: "Feature",
            properties: {
              title: "Millennium Park",
              description:
                "A downtown park known for its art installations and unique architecture"
            },
            geometry: {
              coordinates: [-87.622554, 41.882534],
              type: "Point"
            }
          },
          {
            type: "Feature",
            properties: {
              title: "Grant Park",
              description:
                "A downtown park that is the site of many of Chicago's favorite festivals and events"
            },
            geometry: {
              coordinates: [-87.619185, 41.876367],
              type: "Point"
            }
          },
          {
            type: "Feature",
            properties: {
              title: "Humboldt Park",
              description: "A large park on Chicago's northwest side"
            },
            geometry: {
              coordinates: [-87.70199, 41.905423],
              type: "Point"
            }
          },
          {
            type: "Feature",
            properties: {
              title: "Douglas Park",
              description:
                "A large park near in Chicago's North Lawndale neighborhood"
            },
            geometry: {
              coordinates: [-87.699329, 41.860092],
              type: "Point"
            }
          },
          {
            type: "Feature",
            properties: {
              title: "Calumet Park",
              description:
                "A park on the Illinois-Indiana border featuring a historic fieldhouse"
            },
            geometry: {
              coordinates: [-87.530221, 41.715515],
              type: "Point"
            }
          },
          {
            type: "Feature",
            properties: {
              title: "Jackson Park",
              description:
                "A lakeside park that was the site of the 1893 World's Fair"
            },
            geometry: {
              coordinates: [-87.580389, 41.783185],
              type: "Point"
            }
          },
          {
            type: "Feature",
            properties: {
              title: "Columbus Park",
              description: "A large park in Chicago's Austin neighborhood"
            },
            geometry: {
              coordinates: [-87.769775, 41.873683],
              type: "Point"
            }
          }
        ];
      }
    },
    pin: Object,
    newPin: Object,
    locale: {
      type: String,
      default: "en"
    },
    center: Object,
    zoom: Number
  },
  data() {
    return {
      mapboxgl: mapboxgl,
      map: null,
      popup: null
    };
  },
  watch: {
    userLocation: function(e) {
      this.map.getSource("userlocation").setData({
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [e.lng, e.lat]
            }
          }
        ]
      });
    },
    markers: function(e) {
      setTimeout(function() {
        this.map.getSource("markers").setData({
          type: "FeatureCollection",
          features: e
        });
      }, 500);
    },
    currentStore: function(e) {
      null === e
        ? (this.map.setPaintProperty("markers", "icon-opacity", 1),
          this.map.setPaintProperty("selectedmarker", "icon-opacity", 0))
        : (this.popup.remove(),
          this.map.getSource("selectedmarker").setData({
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: e.geometry.coordinates
                },
                properties: e.properties
              }
            ]
          }),
          setTimeout(function() {
            this.map.setPaintProperty("markers", "icon-opacity", 0.35);
            this.map.setPaintProperty("selectedmarker", "icon-opacity", 1);
          }, 200));
    },
    activeMarker: function(e) {
      e && this.center.zoom > 13 ? this.showPopUp(e) : this.popup.remove();
    },
    center: function(e) {
      e &&
        this.map.flyTo({
          center: e.coordinates,
          zoom: e.zoom,
          speed: 1.8
        });
    }
  },
  mounted() {
    this.createMap();
  },
  methods: {
    showPopUp(e) {
      this.popup
        .remove()
        .setLngLat(e.geometry.coordinates)
        .setHTML(
          '<div class="pop__flex">\n            <div class="main__pop">\n              <header>\n                <p><strong>'
            .concat(
              // e.properties.name,
              e.properties.title,
              '</strong></p>\n                <span class="distance">'
            )
            .concat(
              e.properties.distance,
              ' km</span>\n              </header>\n              <p class="small">'
            )
            // .concat(e.properties.address, "</p>\n              ")
            .concat(e.properties.description, "</p>\n              ")
            .concat(
              e.properties.phone
                ? '<a href="tel:'
                    .concat(e.properties.phone, '" class="phone-link small">')
                    .concat(e.properties.phone, "</a>")
                : "",
              "\n            </div>\n          </div>"
            )
        )
        .addTo(this.map);
    },
    createMap() {
      this.mapboxgl.accessToken =
        "pk.eyJ1Ijoic2VjcmlkIiwiYSI6ImNqMGo4MjIydzAwMDgydnBrZWZ2dnJ5amUifQ.caz5Uf0EvcixiZ3Sl-2A2g";
      this.map = new this.mapboxgl.Map({
        container: "map",
        style: this.currentStyle,
        center: [-87.6244, 41.8756],
        zoom: 13,
        pitch: 0,
        minZoom: 2,
        maxZoom: 17
      });
      this.popup = new this.mapboxgl.Popup({
        offset: 20,
        closeButton: false,
        closeOnClick: false
      });
      let nav = new this.mapboxgl.NavigationControl({
        showCompass: false
      });
      this.map.addControl(nav, "top-right");
      this.$emit("move", {
        center: this.map.getCenter(),
        zoom: this.map.getZoom(),
        bounds: this.map.getBounds()
      });
      this.map.on("style.load", () => {
        this.addMapSources();
        this.addMapLayers();
        this.addGeocoder();
        // this.currentStore && this.getCurrentStoreMarker();
      });
      this.addMapEvents();
    },
    addMapSources() {
      this.map.addSource("markers", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: this.markers
        },
        cluster: true,
        clusterMaxZoom: 12,
        clusterRadius: 95
      });
      this.map.addSource("selectedmarker", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: []
        }
      });
      this.map.addSource("userlocation", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: []
        }
      });
    },
    addMapLayers() {
      this.map.addLayer({
        id: "userlocation",
        type: "symbol",
        source: "userlocation",
        layout: {
          "icon-image": "sl-location",
          "icon-size": 1,
          "icon-ignore-placement": true
        }
      });
      this.map.addLayer({
        id: "markers",
        type: "symbol",
        source: "markers",
        layout: {
          "icon-image": "sl-marker",
          "icon-size": 1,
          "icon-ignore-placement": true
        }
      });
      this.map.addLayer({
        id: "selectedmarker",
        type: "symbol",
        source: "selectedmarker",
        layout: {
          "icon-image": "sl-marker-active",
          "icon-size": 1,
          "icon-ignore-placement": true,
          "icon-allow-overlap": true
        }
      });
      this.map.addLayer({
        id: "clusters",
        type: "circle",
        source: "markers",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": [
            "step",
            ["get", "point_count"],
            "rgba(0, 0, 0, 0.6)",
            20,
            "rgba(0, 0, 0, 0.7)",
            150,
            "rgba(0, 0, 0, 0.8)"
          ],
          "circle-radius": ["step", ["get", "point_count"], 16, 20, 26, 50, 36]
        }
      });
      this.map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "markers",
        paint: {
          "text-color": "white"
        },
        layout: {
          "text-field": "{point_count}",
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 15
        }
      });
    },
    addGeocoder() {
      let geocoder = new MapboxGeocoder({
        accessToken: this.mapboxgl.accessToken,
        localGeocoder: this.forwardGeocoder,
        // zoom: 14,
        marker: false,
        placeholder: "Enter search venue name",
        mapboxgl: this.mapboxgl
      });

      document.getElementById("geocoder").appendChild(geocoder.onAdd(this.map));

      geocoder.on("result", (ev)=> {
        let searchResult = ev.result.geometry;
        this.map.getSource("selectedmarker").setData(searchResult);
        console.log(this.map.getSource("selectedmarker"))
      });
    },
    addMapEvents() {
      this.map.on("moveend", () => {
        this.$emit("move", {
          center: this.map.getCenter(),
          zoom: this.map.getZoom(),
          bounds: this.map.getBounds()
        });
      });
      this.map.on("click", e => {
        const cluster = this.map.queryRenderedFeatures(e.point, {
          layers: ["clusters"]
        });
        cluster.length &&
          this.map.flyTo({
            center: cluster[0].geometry.coordinates,
            zoom: this.map.getZoom() + 2,
            speed: 1.8
          });
      });
      this.map.on("click", "markers", e => {
        let coord = e.features[0].geometry.coordinates.slice();
        let prop = e.features[0].properties;
        // e.features[0].properties.name;
        e.features[0].properties.title;
        // console.log(e.features[0].geometry.coordinates.slice());
        // console.log(e.features[0].properties.title);
        this.$emit("select", e.features[0]);
        this.map.flyTo({
          center: e.features[0].geometry.coordinates,
          zoom: 15,
          speed: 1.8
        });
        this.getCurrentStoreMarker(coord, prop);
        // this.getCurrentStoreMarker();
        // window.dataLayer.push({
        //   event: "markerClick"
        // });
      });
      this.map.on("mouseenter", "markers", e => {
        this.map.getCanvas().style.cursor = "pointer";
        this.showPopUp(e.features[0]);
        this.$emit("popup", e.features[0]);
      });
      this.map.on("mouseleave", "markers", () => {
        this.map.getCanvas().style.cursor = "";
        this.popup.remove();
        this.$emit("popup", null);
      });
    },
    getCurrentStoreMarker(coord, porp) {
      this.map.setPaintProperty("markers", "icon-opacity", 0.35);
      this.map.setPaintProperty("selectedmarker", "icon-opacity", 1);
      // this.map.setZoom(15);
      this.map.getSource("selectedmarker").setData({
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: coord
            },
            properties: porp
          }
        ]
      });
    },
    forwardGeocoder(query) {
      let matchingFeatures = [];
      for (let i = 0; i < this.markers.length; i++) {
        let feature = this.markers[i];
        if (
          feature.properties.title.toLowerCase().search(query.toLowerCase()) !==
          -1
        ) {
          // using carmen geojson format: https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
          feature["place_name"] =
            "🌲 " +
            feature.properties.title +
            " " +
            feature.properties.description;
          feature["center"] = feature.geometry.coordinates;
          feature["place_type"] = ["park"];
          matchingFeatures.push(feature);
        }
      }
      return matchingFeatures;
    }
  },
  computed: {
    mapSize() {
      let styleObj = {
        width: this.mapWidth,
        height: this.mapHeight
      };
      return styleObj;
    }
  }
};
</script>
<style>
@import url("https://api.tiles.mapbox.com/mapbox-gl-js/v1.2.0/mapbox-gl.css");
.mapboxgl-map {
  height: 100%;
  width: 100%;
}
</style>