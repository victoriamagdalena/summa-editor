import * as _ from "lodash";
import React, { memo, useContext } from "react";
import ReactMarkdown from "react-markdown";
import { v4 as uuidv4 } from "uuid";
import PageContext from "../../../context/PageContext";
import { formatDateRange } from "../../../utils";
import SectionSkillsA from "../SectionSkills/SectionSkillsA";

const EducationItem = ({ item, language }) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col text-left mr-2">
          <h6 className="font-semibold text-sm">
            {_.get(item, "about.provider.name", "")}
          </h6>
          <span className="text-xs">
            <strong>{_.get(item, "educationalLevel", "")}</strong>{" "}
            {_.get(item, "about.educationalCredentialAwarded", "")}
          </span>
        </div>
        <div className="flex flex-col items-end text-right">
          {_.get(item, "about.startDate", "") !== "" && (
            <h6 className="text-xs font-medium mb-1">
              (
              {formatDateRange({
                startDate: _.get(item, "about.startDate", ""),
                endDate: _.get(item, "about.endDate", ""),
                language,
              })}
              )
            </h6>
          )}
          <span className="text-sm font-medium">
            {_.get(item, "aggregateRating.ratingValue", "")}/
            {_.get(item, "aggregateRating.bestRating", "")}
          </span>
        </div>
      </div>
      {item.summary && (
        <ReactMarkdown
          className="markdown mt-2 text-sm"
          source={_.get(item, "abstract", "")}
        />
      )}
      <SectionSkillsA skills={_.get(item, "teaches", [])} />
    </div>
  );
};

const EducationA = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return _.get(data, "summa['@graph'][1].hasCredential", []).length > 0 &&
    data.education.enable ? (
    <div>
      <Heading>{data.education.heading}</Heading>
      <div className="grid gap-4">
        {_.get(data, "summa['@graph'][1].hasCredential", [])
          .filter(
            (x) =>
              !_.get(x, "@id", "").endsWith("disable") &&
              _.get(x, "credentialCategory", "") === "degree"
          )
          .map((x) => (
            <EducationItem
              key={_.get(x, "@id", uuidv4())}
              item={x}
              language={data.language || "en"}
            />
          ))}
      </div>
    </div>
  ) : null;
};

export default memo(EducationA);
