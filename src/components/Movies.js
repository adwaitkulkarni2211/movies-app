import React, { useState, useEffect } from "react";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import Pagination from "./Pagination";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hover, setHover] = useState("");
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=97310bb852aa576566d673aa9cfd45bf&page=${page}`
      )
      .then((response) => {
        console.log(response.data.results);
        setMovies(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const addToFavs = (movie) => {
    console.log("In addToFavs");
    let newFavs = [...favs, movie];
    setFavs([...newFavs]);
    console.log(newFavs);
  };

  const removeFromFavs = (movie) => {
    console.log("in removeFromFavs");
    let newFavs = favs.filter((m) => m.id !== movie.id);
    setFavs([...newFavs]);
    console.log(newFavs);
  };

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
                  relative
                `}
                onMouseEnter={() => {
                  setHover(movie.id);
                }}
                onMouseLeave={() => {
                  setHover(-1);
                }}
              >
                {hover == movie.id && (
                  <>
                    {favs.find((m) => m.id == movie.id) ? (
                      <div
                        className="absolute top-2 right-2 p-2 bg-slate-900 rounded text-white text-center cursor-pointer"
                        onClick={() => {
                          removeFromFavs(movie);
                        }}
                      >
                        ❌
                      </div>
                    ) : (
                      <div
                        className="absolute top-2 right-2 p-2 bg-slate-900 rounded text-white text-center cursor-pointer"
                        onClick={() => {
                          addToFavs(movie);
                        }}
                      >
                        ❤️
                      </div>
                    )}
                  </>
                )}

                <div className="py-2 font-bold text-slate-200 text-center bg-gray-900 w-full rounded-b-xl">
                  {movie.title}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Pagination pageProp={page} nextPage={nextPage} prevPage={prevPage} />
    </>
  );
}

export default Movies;
