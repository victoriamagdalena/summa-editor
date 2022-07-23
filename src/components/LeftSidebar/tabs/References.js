import React, { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import set from "lodash/set";

import TextField from "../../../shared/TextField";
import TextArea from "../../../shared/TextArea";
import AppContext from "../../../context/AppContext";
import Checkbox from "../../../shared/Checkbox";
import { addItem } from "../../../utils";
import ItemActions from "../../../shared/ItemActions";
import ItemHeading from "../../../shared/ItemHeading";
import AddItemButton from "../../../shared/AddItemButton";

import * as _ from "lodash";

const ReferencesTab = ({ data, onChange }) => {
  const context = useContext(AppContext);
  const { dispatch } = context;

  useEffect(() => {
    if (!("references" in data)) {
      dispatch({
        type: "migrate_section",
        payload: {
          key: "references",
          value: {
            enable: false,
            heading: "References",
          },
        },
      });

      dispatch({ type: "save_data" });
    }
  }, [data, dispatch]);

  return (
    "references" in data && (
      <>
        <div className="mb-6 grid grid-cols-6 items-center">
          <div className="col-span-1">
            <Checkbox
              checked={data.references.enable}
              onChange={(v) => onChange("data.references.enable", v)}
            />
          </div>
          <div className="col-span-5">
            <TextField
              placeholder="Heading"
              value={data.references.heading}
              onChange={(v) => onChange("data.references.heading", v)}
            />
          </div>
        </div>

        <hr className="my-6" />

        {_.get(data.summa["@graph"][1], "interactionStatistic", [])
          .filter(
            (x) => _.get(x, "disambiguatingDescription", "") === "Reference"
          )
          .map((x, index) => (
            <Item
              item={x}
              key={_.get(x, "@id", "main")}
              index={index}
              onChange={onChange}
              dispatch={dispatch}
              first={index === 0}
              last={
                index ===
                _.get(
                  data.summa["@graph"][1],
                  "interactionStatistic",
                  []
                ).filter(
                  (x) =>
                    _.get(x, "disambiguatingDescription", "") === "Reference"
                ).length -
                  1
              }
            />
          ))}

        <AddItem heading={data.references.heading} dispatch={dispatch} />
      </>
    )
  );
};

const Form = ({ item, onChange, identifier = "" }) => {
  return (
    <div>
      <div className="mb-6">
        <TextField
          className="mb-6"
          label={"Name"}
          placeholder="Calvin Septyanto"
          value={_.get(item, "interactionType.participant.givenName", "")}
          onChange={(v) =>
            onChange(`${identifier}interactionType.participant.givenName`, v)
          }
        />

        <TextField
          className="mb-6"
          label={"Family Name"}
          placeholder="Septyanto"
          value={_.get(item, "interactionType.participant.familyName", "")}
          onChange={(v) =>
            onChange(`${identifier}interactionType.participant.familyName`, v)
          }
        />
      </div>

      <TextField
        className="mb-6"
        label={"Position"}
        placeholder="Data Analyst"
        value={_.get(item, "interactionType.participant.jobTitle", "")}
        onChange={(v) =>
          onChange(`${identifier}interactionType.participant.jobTitle`, v)
        }
      />

      <TextField
        className="mb-6"
        label={"Phone Number"}
        placeholder="(+65) 8615 0032"
        value={_.get(item, "interactionType.participant.telephone", "")}
        onChange={(v) =>
          onChange(`${identifier}interactionType.participant.telephone`, v)
        }
      />

      <TextField
        className="mb-6"
        label={"E-mail Address"}
        placeholder="calvin.septyanto@u.nus.edu"
        value={_.get(item, "interactionType.participant.email", "")}
        onChange={(v) =>
          onChange(`${identifier}interactionType.participant.email`, v)
        }
      />

      <TextArea
        rows="5"
        className="mb-6"
        label={"Description"}
        value={_.get(item, "result[0].reviewRating.ratingExplanation", "")}
        onChange={(v) =>
          onChange(`${identifier}result[0].reviewRating.ratingExplanation`, v)
        }
      />
    </div>
  );
};
const emptyItem = () => {
  let id = uuidv4();
  return {
    "@id": "_:Reference#" + id,
    "@type": "InteractionCounter",
    disambiguatingDescription: "Reference",
    interactionType: {
      "@id": "_:Reference#" + id + "#interactionType",
      "@type": "AssessAction",
      participant: {
        "@id": "_:Reference#" + id + "#interactionType#participant",
        "@type": "Person",
      },
      result: [
        {
          "@id": "_:Reference#" + id + "#result",
          "@type": "Review",
          itemReviewed: {},
          reviewAspect: [],
          reviewRating: {
            "@id": "_:Reference#" + id + "#result#reviewRating",
            "@type": "Rating",
            ratingValue: "5",
            bestRating: "5",
            ratingExplanation: "",
          },
        },
      ],
    },
  };
};
const AddItem = ({ heading, dispatch }) => {
  const [isOpen, setOpen] = useState(false);
  const [item, setItem] = useState(emptyItem());

  const onChange = (key, value) => setItem(set({ ...item }, key, value));

  const onSubmit = () => {
    if (_.get(item, "interactionType.participant.givenName", "") === "") return;

    addItem(dispatch, 'data.summa["@graph"][1].interactionStatistic', item);

    setItem(emptyItem());

    setOpen(false);
  };

  return (
    <div className="my-4 border border-gray-200 rounded p-5">
      <ItemHeading heading={heading} setOpen={setOpen} isOpen={isOpen} />

      <div className={`mt-6 ${isOpen ? "block" : "hidden"}`}>
        <Form item={item} onChange={onChange} />

        <AddItemButton onSubmit={onSubmit} />
      </div>
    </div>
  );
};

const Item = ({ item, index, onChange, dispatch, first, last }) => {
  const [isOpen, setOpen] = useState(false);
  const identifier = `data.summa["@graph"][1].interactionStatistic[${index}].`;

  return (
    <div className="my-4 border border-gray-200 rounded p-5">
      <ItemHeading
        title={
          _.get(item, "interactionType.participant.givenName", "") +
          " " +
          _.get(item, "interactionType.participant.familyName", "")
        }
        setOpen={setOpen}
        isOpen={isOpen}
      />

      <div className={`mt-6 ${isOpen ? "block" : "hidden"}`}>
        <Form item={item} onChange={onChange} identifier={identifier} />

        <ItemActions
          dispatch={dispatch}
          first={first}
          identifier={identifier}
          item={item}
          last={last}
          onChange={onChange}
          type="data.summa['@graph'][1].interactionStatistic"
        />
      </div>
    </div>
  );
};

export default ReferencesTab;
