import React from "react";
import Navbar from "../auth/navbar";

function DetailTreatment() {
  return (
    <section className="flex flex-col items-center space-y-4">
      <div className="fixed w-full">
        <Navbar selected={"Layanan"} />
      </div>
    </section>
  );
}

export default DetailTreatment;
