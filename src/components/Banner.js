import React from "react";
import Image from "../banner.jpg";

function Banner() {
  return (
    <div>
      <div>
        <div
          className={`bg-[url(${Image})] h-[40vh] md:h-[60vh] bg-center bg-cover flex items-end`}
        >
          <div className="text-xl md:text-3xl text-slate-50 p-4 bg-gray-900 bg-opacity-70 w-full flex justify-center">
            Spider-Man: No Way Home
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
