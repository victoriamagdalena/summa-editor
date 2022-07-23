import React, { memo } from "react";
import { v4 as uuidv4 } from "uuid";

const SectionSkillsItem = (x) => x && <p key={uuidv4()}>&nbsp;| {x}</p>;

const SectionSkillsA = ({ skills }) =>
  skills &&
  skills.length > 0 && (
    <div className="text-xs text-gray-800 flex">
      {skills.filter((x) => x !== "").map(SectionSkillsItem)}
    </div>
  );

export default memo(SectionSkillsA);
