import * as _ from "lodash";
import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import PageContext from "../../context/PageContext";
import { hexToRgb } from "../../utils";
import AwardsA from "../blocks/Awards/AwardsA";
import ContactD from "../blocks/Contact/ContactD";
import EducationA from "../blocks/Education/EducationA";
import HeadingB from "../blocks/Heading/HeadingB";
import HobbiesA from "../blocks/Hobbies/HobbiesA";
import LanguagesA from "../blocks/Languages/LanguagesA";
import NamesB from "../blocks/Names/NamesB";
import SubNamesA from "../blocks/Names/SubNamesA";
import ObjectiveA from "../blocks/Objective/ObjectiveA";
import ProjectsA from "../blocks/Projects/ProjectsA";
import ReferencesA from "../blocks/References/ReferencesA";
import SkillsA from "../blocks/Skills/SkillsA";
import WorkA from "../blocks/Work/WorkA";

const Blocks = {
  objective: ObjectiveA,
  work: WorkA,
  education: EducationA,
  projects: ProjectsA,
  awards: AwardsA,
  skills: SkillsA,
  hobbies: HobbiesA,
  languages: LanguagesA,
  references: ReferencesA,
};

const Glalie = () => {
  const context = useContext(AppContext);
  const { state } = context;
  const { data, theme } = state;
  const layout = _.get(theme, "layoutblocks.glalie", []);

  const { r, g, b } = hexToRgb(theme.colors.primary) || {};

  const Profile = () => (
    <div className="grid gap-2 text-center">
      {_.get(data, 'summa["@graph"][1].image.contentUrl', "") !== "" && (
        <img
          className="w-40 h-40 rounded-full mx-auto"
          src={_.get(data, 'summa["@graph"][1].image.contentUrl', "")}
          alt="Resume Photograph"
        />
      )}
      <div className="text-4xl font-bold leading-none">
        <NamesB data={data} className="" />
        <SubNamesA data={data} />
      </div>
      <div className="tracking-wide text-xs uppercase font-medium">
        {_.get(data, 'summa["@graph"][1].description', "")}
      </div>
    </div>
  );

  return (
    <PageContext.Provider value={{ data, heading: HeadingB }}>
      <div
        id="page"
        className="rounded"
        style={{
          fontFamily: theme.font.family,
          color: theme.colors.primary,
          backgroundColor: theme.colors.background,
        }}
      >
        <div className="grid grid-cols-12">
          <div
            className="col-span-4"
            style={{
              backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)`,
            }}
          >
            <div className="grid gap-6 text-center p-8">
              <Profile />
              <ContactD />

              {layout[0] &&
                layout[0].map((x) => {
                  const Component = Blocks[x];
                  return Component && <Component key={x} />;
                })}
            </div>
          </div>

          <div className="col-span-8">
            <div className="grid gap-4 p-8">
              {layout[1] &&
                layout[1].map((x) => {
                  const Component = Blocks[x];
                  return Component && <Component key={x} />;
                })}
            </div>
          </div>
        </div>
      </div>
    </PageContext.Provider>
  );
};

export default Glalie;
