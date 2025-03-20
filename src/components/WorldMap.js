import React from 'react';
import { 
  ComposableMap, 
  Geographies, 
  Geography, 
  ZoomableGroup 
} from "react-simple-maps";

// URL zur GeoJSON-Datei der Weltkarte
const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

// Farbpalette für die Länder
const colorScale = [
  "#FF9AA2", "#FFB7B2", "#FFDAC1", "#E2F0CB", 
  "#B5EAD7", "#C7CEEA", "#F8B195", "#F67280", 
  "#C06C84", "#6C5B7B", "#355C7D"
];

const WorldMap = () => {
  return (
    <div className="world-map-container">
      <h1>Bunte Weltkarte</h1>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 150,
          center: [0, 30]
        }}
      >
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo, index) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={colorScale[index % colorScale.length]}
                  stroke="#FFFFFF"
                  style={{
                    default: {
                      outline: "none"
                    },
                    hover: {
                      fill: "#F53",
                      outline: "none",
                      transition: "all 0.3s ease"
                    },
                    pressed: {
                      outline: "none"
                    }
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default WorldMap;
