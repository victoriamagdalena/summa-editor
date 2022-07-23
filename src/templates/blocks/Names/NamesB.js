import * as _ from "lodash";
import React, { memo } from "react";

const NamesB = (
  { data, className = "text-2xl font-bold leading-tight" },
  style = {}
) => (
  <>
    <h1 className={className} style={style}>
      {Array.isArray(data.summa["@graph"][1].givenName)
        ? _.get(data, "summa['@graph'][1].givenName[0]['@value']", "")
        : data.summa["@graph"][1].givenName}
    </h1>
    <h1 className={className} style={style}>
      {Array.isArray(data.summa["@graph"][1].familyName)
        ? _.get(data, "summa['@graph'][1].familyName[0]['@value']", "")
        : data.summa["@graph"][1].familyName}
    </h1>
  </>
);

export default memo(NamesB);
