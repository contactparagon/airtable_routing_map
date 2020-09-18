import { initializeBlock, useBase, useRecords } from "@airtable/blocks/ui";
import React from "react";

function HelloWorldBlock() {
  // YOUR CODE GOES HERE
  const base = useBase();
  const deliveries = base.getTableByName("Food Deliveries");
  const view = deliveries.getViewByName("Monday Route 1");
  const queryResult = view.selectRecords();
  const records = useRecords(queryResult);
  console.log(records[1].getCellValue("Address"));
  return (
    <div>
      {records.map((record) => {
        return (
          <p>
            {record.name}: {record.getCellValue("Address")}
          </p>
        );
      })}
    </div>
  );
}

initializeBlock(() => <HelloWorldBlock />);
