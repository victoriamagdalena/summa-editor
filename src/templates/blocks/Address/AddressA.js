import * as _ from "lodash";
import React, { memo } from "react";

const AddressItem = ({ x, index, subclassName }) =>
  x && (
    <div className={subclassName}>
      <span>{x.streetAddress}</span>
      <span>
        &nbsp;{x.addressLocality} {x.addressRegion}
      </span>
      <span>
        &nbsp;{x.addressCountry} {x.postalCode}
      </span>
    </div>
  );

const AddressA = (
  { data, mainclassName = "", hclassName = "capitalize font-semibold" },
  subclassName = "flex flex-col text-xs"
) =>
  (data.summa["@graph"][1].address &&
    data.summa["@graph"][1].address.length > 0 &&
    data.address.enable && (
      <div className={mainclassName}>
        <h6 className={hclassName}>
          {_.get(data, "profile.address.heading", "Address")}
        </h6>

        {data.summa["@graph"][1].address
          .filter(
            (x) =>
              Date.parse(x.hoursAvailable.validThrough) -
                Date.parse(new Date()) >
              0
          )
          .map((x, index) => (
            <AddressItem
              x={x}
              index={index}
              subclassName={subclassName}
              key={index}
            />
          ))}
      </div>
    )) ||
  "";

export default memo(AddressA);
