import { initializeBlock, useBase, useRecords } from "@airtable/blocks/ui";
import GoogleMapReact from "google-map-react";
import React, { useCallback, useEffect, useState } from "react";
import { googlemap } from "./Styles/Styles";
import Dropdown from "./Dropdown/Dropdown";

function RoutedMap() {
  const base = useBase();
  const deliveries = base.getTableByName("Deliveries");
  const views = deliveries.views;
  const [map, setMap] = useState();
  const [maps, setMaps] = useState();
  const [service, setService] = useState();
  const [renderer, setRenderer] = useState();
  const [defaultMaps, setDefaultMaps] = useState();
  const [points, setPoints] = useState([]);
  const [view, setView] = useState(
    deliveries.getViewByName("Route Sorting - Today")
  );
  let records = useRecords(view.selectRecords());
  console.log(view);
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };

  const pointsSetter = () => {
    console.log("PS View,", view.name);
    let data = records.map((record) => {
      return record.getCellValue("Address");
    });
    console.log("pointSetter,", data);
    setPoints(data);
  };

  const viewSetter = (sentView) => {
    setView(deliveries.getViewByName(sentView.name));
    setMaps(defaultMaps);
    console.log("vs, name", view.name);
    pointsSetter();
    dataIsLoaded();
    setShow(false);
  };

  const apiIsLoaded = (map, maps) => {
    setMap(map);
    setMaps(maps);
    setRenderer(new maps.DirectionsRenderer());
    setService(new maps.DirectionsService());
    setDefaultMaps(maps);
    pointsSetter();
  };

  useEffect(() => {
    dataIsLoaded();
  }, [points, dataIsLoaded]);

  const dataIsLoaded = useCallback(() => {
    if (map && maps && points) {
      const waypoints = points.map((point) => {
        return { location: point };
      });
      service.route(
        {
          origin: waypoints[0]["location"],
          waypoints: waypoints.slice(1, -1),
          destination: waypoints.slice(-1)[0]["location"],
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
  }, [map, maps, points, renderer, service]);

  return (
    <div className="googlemap" style={googlemap}>
      <Dropdown handleClick={handleClick} show={show}>
        {views.map((view) => {
          return (
            <li
              onClick={() => viewSetter(view)}
              style={{ padding: "8px 12px", cursor: "pointer" }}
              key={view.name}
            >
              {view.name}
            </li>
          );
        })}
      </Dropdown>
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
