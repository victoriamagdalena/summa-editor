import React, { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import set from "lodash/set";

import TextField from "../../../shared/TextField";
import AppContext from "../../../context/AppContext";
import Checkbox from "../../../shared/Checkbox";
import { addItem } from "../../../utils";
import ItemActions from "../../../shared/ItemActions";
import AddItemButton from "../../../shared/AddItemButton";
import ItemHeading from "../../../shared/ItemHeading";

const ContactsTab = ({ data, onChange }) => {
  const context = useContext(AppContext);
  const { dispatch } = context;

  return (
    <>
      <div className="mb-6 grid grid-cols-6 items-center">
        <div className="col-span-1">
          <Checkbox
            checked={data.contacts.enable}
            onChange={(v) => onChange("data.contacts.enable", v)}
          />
        </div>
        <div className="col-span-5">
          <TextField
            placeholder="Heading"
            value={data.contacts.heading}
            onChange={(v) => onChange("data.contacts.heading", v)}
          />
        </div>
      </div>

      <hr className="my-6" />

      {data.summa["@graph"][1].contactPoint &&
        data.summa["@graph"][1].contactPoint
          .filter((x) => x.contactType === "Preferred")
          .map((x, index) => (
            <Item
              dispatch={dispatch}
              first={index === 0}
              index={index}
              item={x}
              key={x["@id"]}
              last={index === data.summa["@graph"][1].contactPoint.length - 1}
              onChange={onChange}
            />
          ))}

      <AddItem heading={data.contacts.heading} dispatch={dispatch} />
    </>
  );
};

const Form = ({ item, onChange, identifier = "" }) => {
  return (
    <div>
      <TextField
        className="mb-6"
        label={"Phone Number"}
        placeholder="(+65) 8888 8888"
        value={item.telephone}
        onChange={(v) => onChange(`${identifier}telephone`, v)}
      />

      <TextField
        className="mb-6"
        label={"E-mail Address"}
        placeholder="calvin.septyanto@u.nus.edu"
        value={item.email}
        onChange={(v) => onChange(`${identifier}email`, v)}
      />
    </div>
  );
};

const AddItem = ({ heading, dispatch }) => {
  let id = "_:" + uuidv4();
  const [isOpen, setOpen] = useState(false);
  const [item, setItem] = useState({
    "@id": id,
    "@type": "ContactPoint",
    description: "",
    contactType: "Preferred",
    email: "",
    telephone: "",
  });

  const onChange = (key, value) => setItem(set({ ...item }, key, value));
  const onSubmit = () => {
    let id = "_:" + uuidv4();
    if (item.contactType === "") return;

    addItem(dispatch, 'data.summa["@graph"][1].contactPoint', item);

    setItem({
      "@id": id,
      "@type": "ContactPoint",
      description: "",
      contactType: "Preferred",
      email: "",
      telephone: "",
    });

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

const ItemActionEnable = (identifier, item, onChange) => {
  return <></>;
};

const Item = ({ item, index, onChange, dispatch, first, last }) => {
  const [isOpen, setOpen] = useState(false);
  const identifier = `data.summa["@graph"][1].contactPoint[${index}].`;

  return (
    <div className="my-4 border border-gray-200 rounded p-5">
      <ItemHeading
        title={item.contactType || item.telephone}
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
          type="data.summa['@graph'][1].contactPoint"
          enableAction={ItemActionEnable}
        />
      </div>
    </div>
  );
};

export default ContactsTab;
