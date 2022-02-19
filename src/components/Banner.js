import React, { useState, useEffect } from "react";
import axios from "axios";
import { Oval } from 'react-loader-spinner'

function Banner() {

  const [movie, setMovie] = useState({});

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/trending/movie/day?api_key=97310bb852aa576566d673aa9cfd45bf"
      )
      .then((response) => {
        //console.log(response);
        setMovie(response.data.results[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);

  return (
    <div>
      {
        movie.id === undefined ? 
        <div 
          className="flex justify-center items-center">
          <Oval
            height="100"
            width="100"
            color='grey'
            ariaLabel='loading'
          />
        </div>
        
        :
          <div
            className={`bg-[url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})] h-[40vh] md:h-[60vh] bg-center bg-cover flex items-end`}
          >
          <div 
            className="text-xl md:text-3xl text-slate-50 p-4 bg-gray-900 bg-opacity-70 w-full flex justify-center">
            Movie of The Day - {movie.title} ({movie.release_date.slice(0, 4)})
          </div>
        </div>
      }
    </div>
  );
}

export default Banner;
