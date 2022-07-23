import * as _ from "lodash";
import set from "lodash/set";
import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AppContext from "../../../context/AppContext";
import AddItemButton from "../../../shared/AddItemButton";
import Checkbox from "../../../shared/Checkbox";
import ItemActions from "../../../shared/ItemActions";
import ItemHeading from "../../../shared/ItemHeading";
import TextArea from "../../../shared/TextArea";
import TextField from "../../../shared/TextField";
import { addItem } from "../../../utils";

const ObjectiveTab = ({ data, onChange }) => {
  const context = useContext(AppContext);
  const { dispatch } = context;

  return (
    <>
      <div className="mb-6 grid grid-cols-6 items-center">
        <div className="col-span-1">
          <Checkbox
            checked={data.objective.enable}
            onChange={(v) => onChange("data.objective.enable", v)}
          />
        </div>
        <div className="col-span-5">
          <TextField
            placeholder="Heading"
            value={data.objective.heading}
            onChange={(v) => onChange("data.objective.heading", v)}
          />
        </div>
      </div>

      <hr className="my-6" />

      {data.summa["@graph"][1].seeks &&
        data.summa["@graph"][1].seeks.map((x, index) => (
          <Item
            dispatch={dispatch}
            first={index === 0}
            index={index}
            item={x}
            key={x["@id"]}
            last={index === data.summa["@graph"][1].seeks.length - 1}
            onChange={onChange}
          />
        ))}

      <AddItem
        heading={data.objective.heading}
        dispatch={dispatch}
        size={_.size(data.summa["@graph"][1].seeks)}
      />
    </>
  );
};

const Form = ({ item, onChange, identifier = "", index = 0 }) => {
  return (
    <div>
      {index === 0 ? (
        <TextArea
          rows="15"
          className="mb-4"
          label={"Description"}
          value={_.get(item, "description", "")}
          placeholder="Looking for a challenging role in a reputable organization to utilize my technical, database, and management skills for the growth of the organization as well as to enhance my knowledge about new and emerging trends in the IT sector."
          onChange={(v) => onChange(`${identifier}description`, v)}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

const AddItem = ({ heading, dispatch, size }) => {
  let id = "_:" + uuidv4();
  const [isOpen, setOpen] = useState(false);
  const [item, setItem] = useState({
    "@id": id,
    "@type": "Demand",
    description: "",
    availableAtOrFrom: {},
    deliveryLeadTime: {},
  });

  const onChange = (key, value) => setItem(set({ ...item }, key, value));
  const onSubmit = () => {
    let id = "_:" + uuidv4();
    if (item.description === "" && item.availableAtOrFrom === []) return;

    addItem(dispatch, 'data.summa["@graph"][1].seeks', item);

    setItem({
      "@id": id,
      "@type": "Demand",
      description: "",
      availableAtOrFrom: {},
      deliveryLeadTime: {},
    });

    setOpen(false);
  };

  return (
    <div className="my-4 border border-gray-200 rounded p-5">
      <ItemHeading heading={heading} setOpen={setOpen} isOpen={isOpen} />

      <div className={`mt-6 ${isOpen ? "block" : "hidden"}`}>
        <Form item={item} onChange={onChange} index={size} />

        <AddItemButton onSubmit={onSubmit} />
      </div>
    </div>
  );
};

const ItemActionEnable = (identifier, item, onChange) => {
  return (
    <Checkbox
      size="2.25rem"
      checked={
        item &&
        item.availabilityEnds &&
        Date.parse(item.availabilityEnds) - Date.parse(new Date()) > 0
      }
      onChange={(v) => {
        let availabilityEnds = "1900-01-01";
        if (v) {
          availabilityEnds = "2099-01-01";
        }
        onChange(`${identifier}availabilityEnds`, availabilityEnds);
      }}
    />
  );
};

const Item = ({ item, index, onChange, dispatch, first, last }) => {
  const [isOpen, setOpen] = useState(false);
  const identifier = `data.summa["@graph"][1].seeks[${index}].`;

  return (
    <div className="my-4 border border-gray-200 rounded p-5">
      <ItemHeading
        title={item.description.substring(0, 10) + "..."}
        setOpen={setOpen}
        isOpen={isOpen}
      />

      <div className={`mt-6 ${isOpen ? "block" : "hidden"}`}>
        <Form
          item={item}
          onChange={onChange}
          identifier={identifier}
          index={index}
        />

        <ItemActions
          dispatch={dispatch}
          first={first}
          identifier={identifier}
          item={item}
          last={last}
          onChange={onChange}
          type="data.summa['@graph'][1].seeks"
          enableAction={ItemActionEnable}
        />
      </div>
    </div>
  );
};

export default ObjectiveTab;
