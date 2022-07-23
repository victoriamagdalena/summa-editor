/* eslint-disable new-cap */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useContext } from "react";
import PageContext from "../../../context/PageContext";

const ActionsTab = ({ data, theme, dispatch }) => {
  const pageContext = useContext(PageContext);
  const { setPrintDialogOpen } = pageContext;

  const loadDemoData = () => {
    dispatch({ type: "load_demo_data" });
    dispatch({ type: "save_data" });
  };

  const resetEverything = () => {
    dispatch({ type: "reset" });
    dispatch({ type: "save_data" });
  };

  return (
    <div>
      <div className="shadow text-center text-sm p-5">
        {
          "Changes you make to your resume are saved automatically to your browser's local storage. No data gets out, hence your information is completely secure."
        }
      </div>

      <hr className="my-6" />

      <hr className="my-6" />

      <div className="shadow text-center p-5">
        <h6 className="font-bold text-sm mb-2">{"Download Your Resume"}</h6>
        <div className="text-sm">
          {
            "You can click on the button below to download a PDF version of your resume instantly. For best results, please use the latest version of Google Chrome."
          }
        </div>

        <button
          type="button"
          onClick={() => setPrintDialogOpen(true)}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-5 rounded"
        >
          <div className="flex justify-center items-center">
            <i className="material-icons mr-2 font-bold text-base">save</i>
            <span className="text-sm">{"Save As PDF"}</span>
          </div>
        </button>
      </div>

      <hr className="my-6" />
      <div className="shadow text-center p-5">
        <h6 className="font-bold text-sm mb-2">{"Grammar Checker Tool"}</h6>

        <div className="text-sm">
          {"Check your grammar using our Grammar Checker tool!"}
        </div>

        <button
          type="button"
          onClick={(e) => {
            window.open("https://summa-grammar-checker.vercel.app/", "_blank");
          }}
          target="_blank"
          className="mt-4 bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-5 rounded"
        >
          <div className="flex justify-center items-center">
            <i className="material-icons mr-2 font-bold text-base">ABC</i>
            <span className="text-sm">{"Grammar Check"}</span>
          </div>
        </button>
      </div>

      <hr className="my-6" />

      <hr className="my-6" />
      <div className="shadow text-center p-5">
        <h6 className="font-bold text-sm mb-2">{"Load Demo Data"}</h6>

        <div className="text-sm">
          {
            "Unclear on what to do with a fresh blank page? Load some demo data with prepopulated values to see how a resume should look and you can start editing from there."
          }
        </div>

        <button
          type="button"
          onClick={loadDemoData}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-5 rounded"
        >
          <div className="flex justify-center items-center">
            <i className="material-icons mr-2 font-bold text-base">
              flight_takeoff
            </i>
            <span className="text-sm">{"Load Data"}</span>
          </div>
        </button>
      </div>

      <hr className="my-6" />

      <div className="shadow text-center p-5">
        <h6 className="font-bold text-sm mb-2">{"Reset Everything!"}</h6>

        <div className="text-sm">
          {
            "This action will reset all your data and remove backups made to your browser's local storage as well, so please make sure you have exported your information before you reset everything."
          }
        </div>

        <button
          type="button"
          onClick={resetEverything}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-5 rounded"
        >
          <div className="flex justify-center items-center">
            <i className="material-icons mr-2 font-bold text-base">refresh</i>
            <span className="text-sm">{"Reset"}</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ActionsTab;
