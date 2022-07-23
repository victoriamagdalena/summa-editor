import React, { useState, useContext } from "react";

import PageContext from "../context/PageContext";
import Dropdown from "./Dropdown";
import { saveAsPdf, saveAsMultiPagePdf } from "../utils";

const PrintDialog = () => {
  const pageContext = useContext(PageContext);
  const { pageRef, panZoomRef, isPrintDialogOpen, setPrintDialogOpen } =
    pageContext;

  const printTypes = [
    {
      key: "unconstrained",
      value: `${"Unconstrained"}`,
    },
    { key: "fitInA4", value: `${"Fit in A4"}` },
    {
      key: "multiPageA4",
      value: `${"Multi Page A4"}`,
    },
  ];

  const [quality, setQuality] = useState(80);
  const [type, setType] = useState(printTypes[0].key);

  return (
    <div
      className={`absolute inset-0 transition-all duration-200 ease-in-out ${
        isPrintDialogOpen ? "opacity-100 z-20" : "opacity-0 z-0"
      }`}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.25)" }}
      onClick={() => {
        setPrintDialogOpen(false);
      }}
    >
      <div
        className="centered py-8 px-12 bg-white shadow-xl rounded w-full md:w-1/3"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <h5 className="mb-6 text-lg font-bold">{"Print Resumé"}</h5>

        <h6 className="mb-1 text-sm font-medium">{"Print Quality"}</h6>
        <div className="flex items-center">
          <input
            type="range"
            className="w-full h-4 my-2 rounded-full overflow-hidden appearance-none focus:outline-none bg-gray-400"
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            min="40"
            max="100"
            step="5"
          />

          <h6 className="font-medium pl-5">{quality}%</h6>
        </div>

        <h6 className="mt-4 mb-2 text-sm font-medium">{"Print Type"}</h6>
        <Dropdown
          value={type}
          options={printTypes}
          onChange={setType}
          optionItem={(x) => (
            <option key={x.key} value={x.key}>
              {x.value}
            </option>
          )}
        />

        <p className="my-3 text-xs text-gray-600">
          {
            "This export method makes use of HTML canvas to convert the resume to an image and print it on a PDF, which means it will lose all selecting/parsing capabilities."
          }
        </p>
        <p className="my-3 text-xs text-gray-600">
          {
            "If that is important to you, please try printing the resume instead, using Cmd/Ctrl + P or the print button below. The result may vary as the output is browser dependent, but it is known to work best on the latest version of Google Chrome."
          }
        </p>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => {
              setPrintDialogOpen(false);
            }}
            className="mt-6 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white text-sm font-medium py-2 px-5 rounded"
          >
            <div className="flex justify-center items-center">
              <i className="material-icons mr-2 font-bold text-base">close</i>
              <span className="text-sm">{"Cancel Download"}</span>
            </div>
          </button>

          <button
            type="button"
            onClick={async () => {
              await (type === "multiPageA4"
                ? saveAsMultiPagePdf(pageRef, panZoomRef, quality)
                : saveAsPdf(pageRef, panZoomRef, quality, type));
              setPrintDialogOpen(false);
            }}
            className="mt-6 border border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white text-sm font-medium py-2 px-5 rounded"
          >
            <div className="flex justify-center items-center">
              <i className="material-icons mr-2 font-bold text-base">save</i>
              <span className="text-sm">{"Save As PDF"}</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrintDialog;
