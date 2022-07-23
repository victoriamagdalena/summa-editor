import * as _ from "lodash";
import React, { memo, useContext } from "react";
import AppContext from "../../../context/AppContext";
import { formatDate } from "../../../utils";

const BirthDateA = () => {
  const context = useContext(AppContext);
  const { state } = context;
  const { data } = state;

  if (_.get(data, "summa['@graph'][1].birthDate", "")) {
    return (
      <div className="text-xs">
        <h6 className="capitalize font-semibold">
          {data.profile.birthDate.heading || "Birth Date"}
        </h6>
        <div>
          <span>
            {formatDate({
              date: _.get(data, "summa['@graph'][1].birthDate", ""),
              language: data.language || "en",
              includeDay: true,
            })}
          </span>
        </div>
      </div>
    );
  }

  return null;
};

export default memo(BirthDateA);
