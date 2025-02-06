/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

function ConfirmPopUp({ open, onClose, children }) {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0  bg-opacity-30 z-50 flex bg-black justify-center items-center ${
        open ? "visible" : "hidden"
      }`}>
      <div
        onClick={(e) => e.stopPropagation()}
        className=" w-screen h-screen flex items-center justify-start ">
        {children}
      </div>
    </div>
  );
}

export default ConfirmPopUp;
