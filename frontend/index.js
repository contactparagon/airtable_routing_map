import { initializeBlock, useBase, useRecords } from "@airtable/blocks/ui";
import GoogleMapReact from "google-map-react";
import React, { useCallback, useEffect, useState } from "react";
import { googlemap } from "./Styles/Styles";
import Dropdown from "./Dropdown/Dropdown";
import MailTo from "./MailTo/MailTo";
import CopyLink from "./MailTo/CopyLink";

function RoutedMap() {
  const base = useBase();
  const deliveries = base.getTableByName("Deliveries");
  const [map, setMap] = useState();
  const [maps, setMaps] = useState();
  const [service, setService] = useState();
  const [renderer, setRenderer] = useState();
  const [points, setPoints] = useState([]);
  const [view, setView] = useState(
    deliveries.getViewByName("Route Sorting - Today")
  );
  let records = useRecords(view.selectRecords());
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };

  const pointsSetter = (sentColumn) => {
    if (!sentColumn) {
      sentColumn = "Route 1";
    }
    let data = records
      .filter((record) => {
        return (
          record.getCellValue("fldsAptihO9BqOPNU") &&
          record.getCellValue("fldsAptihO9BqOPNU").name == sentColumn
        );
      })
      .map((record) => {
        return record.getCellValue("fld5UqQOh4DQvUou7");
      });
    setPoints(data);
    setShow(false);
  };


  const apiIsLoaded = (map, maps) => {
    setMap(map);
    setMaps(maps);
    setRenderer(new maps.DirectionsRenderer());
    setService(new maps.DirectionsService());
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
            console.log(response)
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
      <Dropdown records={records}
        handleClick={handleClick}
        viewSetter={pointsSetter}
        show={show}
      />
      <CopyLink />
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDZ3e4pVqA6LJHHN17btdMlQtMUN0Rs_2c" }}
        defaultCenter={{ lat: 38, lng: 267 }}
        defaultZoom={5}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
        options={{fullscreenControl: false}}
      ></GoogleMapReact>
    </div>
  );
}

initializeBlock(() => <RoutedMap />);
