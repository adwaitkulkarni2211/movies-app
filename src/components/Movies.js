import React, { useState, useEffect } from "react";
import Image from "../banner.jpg";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";

function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/trending/movie/week?api_key=97310bb852aa576566d673aa9cfd45bf"
      )
      .then((response) => {
        console.log(response);
        setMovies(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <>
      <div className="mb-8">
        <div className="mt-8 mb-8 font-bold text-2xl text-center">
          Trending Movies
        </div>
        {movies.length == 0 ? (
          <div className="flex justify-center">
            <TailSpin
              height="100"
              width="100"
              color="grey"
              ariaLabel="loading"
            />
          </div>
        ) : (
          <div className="flex flex-wrap justify-center">
            {movies.map((movie) => (
              <div
                className={`
                  bg-[url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})]
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
                  {movie.title}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Movies;
