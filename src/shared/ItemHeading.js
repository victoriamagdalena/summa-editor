import React from "react";

const ItemHeading = ({ title, heading, isOpen, setOpen }) => {
  return (
    <div
      className="flex justify-between items-center cursor-pointer"
      onClick={() => setOpen(!isOpen)}
    >
      <h6 className="text-sm font-medium">
        {typeof heading === "undefined" ? title : "Add Item"}
      </h6>
      <i className="material-icons">{isOpen ? "expand_less" : "expand_more"}</i>
    </div>
  );
};

export default ItemHeading;
