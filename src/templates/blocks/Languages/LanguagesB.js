import * as _ from "lodash";
import React, { memo, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import PageContext from "../../../context/PageContext";

const LanguageItem = (x) => (
  <div key={_.get(x, "@id", uuidv4())} className="flex flex-col">
    <h6 className="font-semibold text-sm">{_.get(x, "name", "")}</h6>
    <span className="text-xs">{x.fluency}</span>
  </div>
);

const LanguagesB = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return data.languages &&
    data.languages.enable &&
    _.get(data, 'summa["@graph"][1].knowsLanguage', []).length > 0 ? (
    <div>
      <Heading>{data.languages.heading}</Heading>
      <div className="grid gap-2">
        {_.get(data, 'summa["@graph"][1].knowsLanguage', [])
          .filter((x) => _.get(x, "name", "") !== "")
          .map(LanguageItem)}
      </div>
    </div>
  ) : null;
};

export default memo(LanguagesB);
