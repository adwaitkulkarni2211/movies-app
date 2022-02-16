import React from "react";
import Image from "../banner.jpg";

function Movies() {
  return (
    <>
      <div className="mb-8">
        <div className="mt-8 mb-8 font-bold text-2xl text-center">
          Trending Movies
        </div>
        <div className="flex flex-wrap justify-center">
          <div
            className={`
            bg-[url(${Image})]
            h-[25vh] w-[150px]
            md:h-[30vh] md:w-[250px]
            bg-center bg-cover
            rounded-xl
            flex items-end
            m-4
            hover:scale-110
            ease-out duration-300
          `}
          >
            <div className="p-1 text-xl font-bold text-slate-200 bg-slate-900 w-full rounded-b-xl items-end flex justify-center">
              Title
            </div>
          </div>

          <div
            className={`
            bg-[url(${Image})]
            h-[25vh] w-[150px]
            md:h-[30vh] md:w-[250px]
            bg-center bg-cover
            rounded-xl
            flex items-end
            m-4
            hover:scale-110
            ease-out duration-300
          `}
          >
            <div className="p-1 text-xl font-bold text-slate-200 bg-slate-900 w-full rounded-b-xl items-end flex justify-center">
              Title
            </div>
          </div>

          <div
            className={`
            bg-[url(${Image})]
            h-[25vh] w-[150px]
            md:h-[30vh] md:w-[250px]
            bg-center bg-cover
            rounded-xl
            flex items-end
            m-4
            hover:scale-110
            ease-out duration-300
          `}
          >
            <div className="p-1 text-xl font-bold text-slate-200 bg-slate-900 w-full rounded-b-xl items-end flex justify-center">
              Title
            </div>
          </div>

          <div
            className={`
            bg-[url(${Image})]
            h-[25vh] w-[150px]
            md:h-[30vh] md:w-[250px]
            bg-center bg-cover
            rounded-xl
            flex items-end
            m-4
            hover:scale-110
            ease-out duration-300
          `}
          >
            <div className="p-1 text-xl font-bold text-slate-200 bg-slate-900 w-full rounded-b-xl items-end flex justify-center">
              Title
            </div>
          </div>

          <div
            className={`
            bg-[url(${Image})]
            h-[25vh] w-[150px]
            md:h-[30vh] md:w-[250px]
            bg-center bg-cover
            rounded-xl
            flex items-end
            m-4
            hover:scale-110
            ease-out duration-300
          `}
          >
            <div className="p-1 text-xl font-bold text-slate-200 bg-slate-900 w-full rounded-b-xl items-end flex justify-center">
              Title
            </div>
          </div>

          <div
            className={`
            bg-[url(${Image})]
            h-[25vh] w-[150px]
            md:h-[30vh] md:w-[250px]
            bg-center bg-cover
            rounded-xl
            flex items-end
            m-4
            hover:scale-110
            ease-out duration-300
          `}
          >
            <div className="p-1 text-xl font-bold text-slate-200 bg-slate-900 w-full rounded-b-xl items-end flex justify-center">
              Title
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default Movies;
