import * as _ from "lodash";
import React, { memo } from "react";

const SubnamesA = ({ data }) => (
  <h6 className="text-lg tracking-wider uppercase">
    {_.get(data, "summa['@graph'][1].givenName[1]", "")
      ? " (" +
        _.get(data, "summa['@graph'][1].givenName", [])
          .map(function (elem, index) {
            if (index > 0 && elem["@value"]) {
              let name = elem["@value"];
              let familynameIndex = _.get(
                data,
                "summa['@graph'][1].familyName",
                []
              ).findIndex((x) => x["@language"] === elem["@language"]);
              if (familynameIndex >= 0) {
                if (
                  data.summa["@graph"][1].familyName[familynameIndex] &&
                  data.summa["@graph"][1].familyName[familynameIndex]["@value"]
                ) {
                  name +=
                    " " +
                    data.summa["@graph"][1].familyName[familynameIndex][
                      "@value"
                    ];
                }
              }
              return name;
            } else {
              return null;
            }
          })
          .filter(function (el) {
            return el != null;
          })
          .join(", ") +
        ")"
      : ""}
  </h6>
);

export default memo(SubnamesA);
