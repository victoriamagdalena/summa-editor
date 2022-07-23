import * as _ from "lodash";
import React, { memo } from "react";

const NamesA = (
  { data, className = "tracking-wide uppercase font-bold" },
  style = { fontSize: "2.75em" }
) => (
  <h1 className={className} style={style}>
    {Array.isArray(data.summa["@graph"][1].givenName)
      ? _.get(data, "summa['@graph'][1].givenName[0]['@value']", "")
      : data.summa["@graph"][1].givenName}{" "}
    {Array.isArray(data.summa["@graph"][1].familyName)
      ? _.get(data, "summa['@graph'][1].familyName[0]['@value']", "")
      : data.summa["@graph"][1].familyName}
  </h1>
);

export default memo(NamesA);
