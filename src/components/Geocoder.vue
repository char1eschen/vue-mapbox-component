<template>
  <div style="height:100%;width:100%;">
    <div id="geocoder" class="geocoder"></div>
    <div id="map" :style="mapSize" class="map pad2"></div>
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
            geometry: {
              type: "Point",
              coordinates: [-77.034084142948, 38.909671288923]
            },
            properties: {
              name: "Shakespeare Hotel",
              phoneFormatted: "(202) 234-7336",
              phone: "2022347336",
              address: "1471 P St NW",
              city: "Washington DC",
              country: "United States",
              crossStreet: "at 15th St NW",
              postalCode: "20005",
              state: "D.C."
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-77.049766, 38.900772]
            },
            properties: {
              name: "Dove and Olive",
              phoneFormatted: "(202) 507-8357",
              phone: "2025078357",
              address: "2221 I St NW",
              city: "Washington DC",
              country: "United States",
              crossStreet: "at 22nd St NW",
              postalCode: "20037",
              state: "D.C."
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-77.043929, 38.910525]
            },
            properties: {
              name: "Dove and Olive",
              phoneFormatted: "(202) 387-9338",
              phone: "2023879338",
              address: "1512 Connecticut Ave NW",
              city: "Washington DC",
              country: "United States",
              crossStreet: "at Dupont Circle",
              postalCode: "20036",
              state: "D.C."
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-77.0672, 38.90516896]
            },
            properties: {
              name: "Dove and Olive 1",
              phoneFormatted: "(202) 337-9338",
              phone: "2023379338",
              address: "3333 M St NW",
              city: "Washington DC",
              country: "United States",
              crossStreet: "at 34th St NW",
              postalCode: "20007",
              state: "D.C."
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-77.002583742142, 38.887041080933]
            },
            properties: {
              name: "Dove and Olive 2",
              phoneFormatted: "(202) 547-9338",
              phone: "2025479338",
              address: "221 Pennsylvania Ave SE",
              city: "Washington DC",
              country: "United States",
              crossStreet: "btwn 2nd & 3rd Sts. SE",
              postalCode: "20003",
              state: "D.C."
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-76.933492720127, 38.99225245786]
            },
            properties: {
              name: "Aurora Hotel",
              address: "8204 Baltimore Ave",
              city: "College Park",
              country: "United States",
              postalCode: "20740",
              state: "MD"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-77.097083330154, 38.980979]
            },
            properties: {
              name: "Dove and Olive 3",
              phoneFormatted: "(301) 654-7336",
              phone: "3016547336",
              address: "4831 Bethesda Ave",
              cc: "US",
              city: "Bethesda",
              country: "United States",
              postalCode: "20814",
              state: "MD"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-77.359425054188, 38.958058116661]
            },
            properties: {
              name: "Aurora Hotel 1",
              phoneFormatted: "(571) 203-0082",
              phone: "5712030082",
              address: "11935 Democracy Dr",
              city: "Reston",
              country: "United States",
              crossStreet: "btw Explorer & Library",
              postalCode: "20190",
              state: "VA"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-77.10853099823, 38.880100922392]
            },
            properties: {
              name: "Dove and Olive 4",
              phoneFormatted: "(703) 522-2016",
              phone: "7035222016",
              address: "4075 Wilson Blvd",
              city: "Arlington",
              country: "United States",
              crossStreet: "at N Randolph St.",
              postalCode: "22203",
              state: "VA"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-75.28784, 40.008008]
            },
            properties: {
              name: "Aurora Hotel 3",
              phoneFormatted: "(610) 642-9400",
              phone: "6106429400",
              address: "68 Coulter Ave",
              city: "Ardmore",
              country: "United States",
              postalCode: "19003",
              state: "PA"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-75.20121216774, 39.954030175164]
            },
            properties: {
              name: "Dove and Olive 5",
              phoneFormatted: "(215) 386-1365",
              phone: "2153861365",
              address: "3925 Walnut St",
              city: "Philadelphia",
              country: "United States",
              postalCode: "19104",
              state: "PA"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-77.043959498405, 38.903883387232]
            },
            properties: {
              name: "GT's Hotel",
              phoneFormatted: "(202) 331-3355",
              phone: "2023313355",
              address: "1901 L St. NW",
              city: "Washington DC",
              country: "United States",
              crossStreet: "at 19th St",
              postalCode: "20036",
              state: "D.C."
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
      popup: null,
      userCoord: []
    };
  },
  watch: {
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
              e.properties.name,
              '</strong></p>\n                <span class="distance">'
            )
            // .concat(
            //   e.properties.distance,
            //   ' km</span>\n              </header>\n              <p class="small">'
            // )
            .concat(
              e.properties.address +
                ", " +
                e.properties.postcode +
                ", " +
                e.properties.city +
                ", " +
                e.properties.country,
              "</p>\n              "
            )
            .concat(
              e.properties.phoneFormatted
                ? '<a href="tel:'
                    .concat(
                      e.properties.phoneFormatted,
                      '" class="phone-link small">'
                    )
                    .concat(e.properties.phoneFormatted, "</a>")
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
        center: [-77.034084, 38.909671],
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
        this.addGeolocationControl();
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
        // localGeocoder: this.forwardGeocoder,
        // zoom: 14,
        countries: "au",
        bbox: [139.965, -38.03, 155.258, -27.839],
        autocomplete: true,
        marker: false,
        placeholder: "Postcode",
        filter: item => {
          return item.context
            .map(i => {
              return (
                i.id.split(".").shift() === "region" &&
                i.text === "New South Wales"
              );
            })
            .reduce(function(acc, cur) {
              return acc || cur;
            });
        },
        mapboxgl: this.mapboxgl
      });

      document.getElementById("geocoder").appendChild(geocoder.onAdd(this.map));

      geocoder.on("result", ev => {
        let searchResult = ev.result.geometry;
        this.map.getSource("selectedmarker").setData(searchResult);
        console.log(this.map.getSource("selectedmarker"));
      });
    },
    addGeolocationControl() {
      this.map.addControl(
        new this.mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true
        })
      );
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
          this.userCoord = [];
          this.userCoord.push(position.coords.latitude);
          this.userCoord.push(position.coords.longitude);
          console.log(this.userCoord);
          this.setUserLocation(this.userCoord);
        });
      } else {
        /* geolocation IS NOT available, handle it */
      }
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
        e.features[0].properties.name;
        // console.log(e.features[0].geometry.coordinates.slice());
        // console.log(e.features[0].properties.name);
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
          feature.properties.name.toLowerCase().search(query.toLowerCase()) !==
          -1
        ) {
          // using carmen geojson format: https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
          feature["place_name"] =
            "🌲 " + feature.properties.name + " " + feature.properties.address;
          feature["center"] = feature.geometry.coordinates;
          feature["place_type"] = ["park"];
          matchingFeatures.push(feature);
        }
      }
      return matchingFeatures;
    },
    setUserLocation(e) {
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
      console.log(this.map.getSource("userlocation"));
    },
    calculateDistance(coordStart, coordEnd) {
      let radLat1 = (coordStart[0] * Math.PI) / 180.0;
      let radLat2 = (coordEnd[0] * Math.PI) / 180.0;
      let a = radLat1 - radLat2;
      let b =
        (coordStart[1] * Math.PI) / 180.0 - (coordEnd[1] * Math.PI) / 180.0;
      let s =
        2 *
        Math.asin(
          Math.sqrt(
            Math.pow(Math.sin(a / 2), 2) +
              Math.cos(radLat1) *
                Math.cos(radLat2) *
                Math.pow(Math.sin(b / 2), 2)
          )
        );
      s = s * 6378.137;
      s = Math.round(s * 10000) / 10000;
      return s;
    },
    moveToPlace(e) {
      if ("store" === e.type) this.handleStoreClick(e);
      else {
        var t = this.center.zoom > 13 ? this.center.zoom : 13;
        this.centerMap(e.geometry.coordinates, t);
      }
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