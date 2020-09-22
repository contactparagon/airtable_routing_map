import { initializeBlock, useBase, useRecords } from "@airtable/blocks/ui";
import React, { useEffect, useState } from "react";
import Geocode from "./GeoCoding/Geocode";
import Optimisation from "./Optimisation/Optimisation";
//PUT EVERYTHING IN A .THEN
function RoutedMap() {
  // YOUR CODE GOES HERE
  const base = useBase();
  const deliveries = base.getTableByName("Food Deliveries");
  const view = deliveries.getViewByName("Monday Route 1");
  const queryResult = view.selectRecords();
  const records = useRecords(queryResult);
  let optimised;
  let latlon = [];
  let unoptimised = {
    jobs: [],
    vehicles: [
      {
        id: 1,
        profile: "driving-car",
        start: [-122.0208176, 37.9775036],
        end: [-122.0208176, 37.9775036],
      },
    ],
  };

  useEffect(() => {
    Geocode(records)
      .then((res) => {
        console.log("GET GEOCODES RES", res);
        latlon = res;
      })
      .then(() => {
        let idNo = 0;
        latlon.map((dropoff) => {
          let job = { id: (idNo += 1), location: [dropoff.lon, dropoff.lat] };
          unoptimised.jobs.push(job);
        });
        console.log("Unoptimized", unoptimised);
      })
      .then(() => {
        Optimisation(unoptimised)
          .then((res) => {
            optimised = res;
            console.log(optimised);
          })
          .catch((err) => console.log("error:", err));
      });
  });

  // useEffect(() => {
  //   console.log("Latlon", latlon);
  //   let idNo = 0;
  //   latlon.map((dropoff) => {
  //     let job = { id: (idNo += 1), location: [dropoff.lon, dropoff.lat] };
  //     unoptimised.jobs.push(job);
  //   });
  //   console.log(unoptimised);
  // }, [latlon, unoptimised.jobs, unoptimised]);

  // useEffect(() => {
  //   Optimisation(unoptimised)
  //     .then((res) => (optimised = res))
  //     .catch((err) => console.log("error:", err));
  // }, [unoptimised]);

  // useEffect(() => {
  //   console.log("optimised", optimised);
  // }, [optimised]);

  return (
    <div>
      {records.map((record) => {
        return (
          <p key={record.id}>
            {record.name}: {record.getCellValue("Address")}
          </p>
        );
      })}
    </div>
  );
}

initializeBlock(() => <RoutedMap />);
