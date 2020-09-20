import { initializeBlock, useBase, useRecords } from "@airtable/blocks/ui";
import React from "react";
import Geocode from "./GeoCoding/Geocode";

function HelloWorldBlock() {
  // YOUR CODE GOES HERE
  const base = useBase();
  const deliveries = base.getTableByName("Food Deliveries");
  const view = deliveries.getViewByName("Monday Route 1");
  const queryResult = view.selectRecords();
  const records = useRecords(queryResult);

  var latlon = [];
  records.map((record) => {
    Geocode(record.getCellValue("Address")).then((res) => {
      latlon.push(res);
    });
  });
  console.log(latlon);

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

initializeBlock(() => <HelloWorldBlock />);
