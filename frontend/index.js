import { initializeBlock, useBase, useRecords } from "@airtable/blocks/ui";
import GoogleMapReact from "google-map-react";
import React, { useCallback, useEffect, useState } from "react";
function RoutedMap() {
  const base = useBase();
  const deliveries = base.getTableByName("Food Deliveries");
  const view = deliveries.getViewByName("Monday Route 1");
  const queryResult = view.selectRecords();
  const records = useRecords(queryResult);
  const [map, setMap] = useState();
  const [maps, setMaps] = useState();
  const [points, setPoints] = useState([]);

  const views = deliveries.views.map((view) => view.name);
  console.log(views);
  const pointsSetter = () => {
    let data = records.map((record) => {
      return record.getCellValue("Address");
    });
    setPoints(data);
  };

  const apiIsLoaded = async (map, maps) => {
    setMap(map);
    setMaps(maps);
    pointsSetter();
  };

  const dataIsLoaded = useCallback(() => {
    if (map && maps) {
      const service = new maps.DirectionsService();
      const renderer = new maps.DirectionsRenderer();
      service.route(
        {
          origin: points[0],
          waypoints: [
            { location: points[1] },
            { location: points[2] },
            { location: points[3] },
          ],
          destination: points[4],
          travelMode: "DRIVING",
          optimizeWaypoints: true,
        },
        (response, status) => {
          if (status === "OK") {
            renderer.setDirections(response);
            renderer.setMap(map);
          } else {
            console.log("Status:", status);
          }
        }
      );
    } else {
      console.log("Points not loaded yet");
    }
  }, [map, maps, points]);

  useEffect(() => {
    dataIsLoaded();
  }, [points, dataIsLoaded]);

  return (
    <div className="googlemap" style={{ height: "100vh" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDZ3e4pVqA6LJHHN17btdMlQtMUN0Rs_2c" }}
        defaultCenter={{ lat: 38, lng: 267 }}
        defaultZoom={5}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
      ></GoogleMapReact>
    </div>
  );
}

initializeBlock(() => <RoutedMap />);
