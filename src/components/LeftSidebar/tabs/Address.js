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

const AddressTab = ({ data, onChange }) => {
  const context = useContext(AppContext);
  const { dispatch } = context;

  return (
    <>
      <div className="mb-6 grid grid-cols-6 items-center">
        <div className="col-span-1">
          <Checkbox
            checked={data.address.enable}
            onChange={(v) => onChange("data.address.enable", v)}
          />
        </div>
        <div className="col-span-5">
          <TextField
            placeholder="Heading"
            value={data.address.heading}
            onChange={(v) => onChange("data.address.heading", v)}
          />
        </div>
      </div>

      <hr className="my-6" />

      {data.summa["@graph"][1].address &&
        data.summa["@graph"][1].address.map((x, index) => (
          <Item
            dispatch={dispatch}
            first={index === 0}
            index={index}
            item={x}
            key={x["@id"]}
            last={index === data.summa["@graph"][1].address.length - 1}
            onChange={onChange}
          />
        ))}

      <AddItem heading={data.address.heading} dispatch={dispatch} />
    </>
  );
};

const Form = ({ item, onChange, identifier = "" }) => {
  return (
    <div>
      <TextField
        className="mb-6"
        label={"Street Address"}
        placeholder="21 Lower Kent Ridge Road"
        value={item.streetAddress}
        onChange={(v) => onChange(`${identifier}streetAddress`, v)}
      />

      <TextField
        className="mb-6"
        label={"City"}
        placeholder="Singapore"
        value={item.addressLocality}
        onChange={(v) => onChange(`${identifier}addressLocality`, v)}
      />

      <div>
        <TextField
          className="mb-6"
          label={"Country"}
          placeholder="Singapore"
          value={item.addressCountry}
          onChange={(v) => onChange(`${identifier}addressCountry`, v)}
        />

        <TextField
          className="mb-6"
          label={"Postal Code"}
          placeholder="119077"
          value={item.postalCode}
          onChange={(v) => onChange(`${identifier}postalCode`, v)}
        />
      </div>
    </div>
  );
};

const AddItem = ({ heading, dispatch }) => {
  let id = "_:" + uuidv4();
  const [isOpen, setOpen] = useState(false);
  const [item, setItem] = useState({
    "@id": id,
    "@type": "PostalAddress",
    hoursAvailable: {
      "@id": id + "#hoursAvailable",
      "@type": "OpeningHoursSpecification",
      validThrough: "2099-01-01",
    },
    addressCountry: "",
    streetAddress: "",
    addressRegion: "",
    addressLocality: "",
    postalCode: "",
    contactType: "",
    sameAs: "",
  });

  const onChange = (key, value) => setItem(set({ ...item }, key, value));
  const onSubmit = () => {
    let id = "_:" + uuidv4();
    if (item.addressCountry === "") return;

    addItem(dispatch, 'data.summa["@graph"][1].address', item);

    setItem({
      "@id": id,
      "@type": "PostalAddress",
      hoursAvailable: {
        "@id": id + "#hoursAvailable",
        "@type": "OpeningHoursSpecification",
        validThrough: "2099-01-01",
      },
      addressCountry: "",
      streetAddress: "",
      addressRegion: "",
      addressLocality: "",
      postalCode: "",
      contactType: "",
      sameAs: "",
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
  return (
    <Checkbox
      size="2.25rem"
      checked={
        item &&
        item.hoursAvailable &&
        item.hoursAvailable.validThrough &&
        Date.parse(item.hoursAvailable.validThrough) - Date.parse(new Date()) >
          0
      }
      onChange={(v) => {
        let validThrough = "1900-01-01";
        if (v) {
          validThrough = "2099-01-01";
        }
        onChange(`${identifier}hoursAvailable.validThrough`, validThrough);
      }}
    />
  );
};

const Item = ({ item, index, onChange, dispatch, first, last }) => {
  const [isOpen, setOpen] = useState(false);
  const identifier = `data.summa["@graph"][1].address[${index}].`;

  return (
    <div className="my-4 border border-gray-200 rounded p-5">
      <ItemHeading
        title={item.streetAddress || item.addressCountry}
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
          type="data.summa['@graph'][1].address"
          enableAction={ItemActionEnable}
        />
      </div>
    </div>
  );
};

export default AddressTab;
