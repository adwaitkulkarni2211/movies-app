import React, {useState, useEffect} from 'react'
import axios from 'axios';
import NavBar from './NavBar'
import Pagination from './Pagination'

function Favourites() {
  const genreIds = {
    "genres": [
        {
            "id": 28,
            "name": "Action"
        },
        {
            "id": 12,
            "name": "Adventure"
        },
        {
            "id": 16,
            "name": "Animation"
        },
        {
            "id": 35,
            "name": "Comedy"
        },
        {
            "id": 80,
            "name": "Crime"
        },
        {
            "id": 99,
            "name": "Documentary"
        },
        {
            "id": 18,
            "name": "Drama"
        },
        {
            "id": 10751,
            "name": "Family"
        },
        {
            "id": 14,
            "name": "Fantasy"
        },
        {
            "id": 36,
            "name": "History"
        },
        {
            "id": 27,
            "name": "Horror"
        },
        {
            "id": 10402,
            "name": "Music"
        },
        {
            "id": 9648,
            "name": "Mystery"
        },
        {
            "id": 10749,
            "name": "Romance"
        },
        {
            "id": 878,
            "name": "Science Fiction"
        },
        {
            "id": 10770,
            "name": "TV Movie"
        },
        {
            "id": 53,
            "name": "Thriller"
        },
        {
            "id": 10752,
            "name": "War"
        },
        {
            "id": 37,
            "name": "Western"
        }
    ]
  };

  const [currGenre, setCurrGenre] = useState('All Genres')
  const [genreButtons, setGenreButtons] = useState([])
  const [order, setOrder] = useState({title: "", status: ""});
  const [favs, setFavs] = useState([]);
  const [search, setSearch] = useState("")
  const [rows, setRows] = useState(5);
  const [page, setPage] = useState(1);

  //for loading favourites
  useEffect(() => {
    const oldFavs = JSON.parse(localStorage.getItem("favs")) || [];
    setFavs([...oldFavs]);
  }, [])

  //for setting genre buttons at the top
  useEffect(() => {
    //getting from localStorate in order to display all genres of all favs. 
    //favs is changed when a genre button is clicked, which will also change genreButtons if we filter from favs.
    const tempFavs = JSON.parse(localStorage.getItem("favs")) || [];
    let tempGenres = tempFavs.map(movie => {
      return movie.genre_ids.map(gid => genreIds.genres.find(genre => genre.id == gid).name)
    })
    //converting to 1d array
    tempGenres = [].concat(...tempGenres);
    //removing duplicates
    tempGenres = [...new Set(tempGenres)];
    //console.log(tempGenres);
    setGenreButtons(["All Genres", ...tempGenres]);
  }, [favs])

  const removeFromFavs = (movie) => {
    let newFavs = favs.filter((m) => m.id !== movie.id);
    setFavs([...newFavs]);
    localStorage.setItem("favs", JSON.stringify(newFavs));
    //console.log(newFavs);
  };

  let filteredFavs = []

  //displaying movies based on genres
  filteredFavs = (currGenre == "All Genres" ? favs : favs.filter(movie => {
    let movieGenres = movie.genre_ids.map(gid => genreIds.genres.find(genre => genre.id == gid).name)
      for(let i=0; i<movieGenres.length; i++) {
        if(currGenre == movieGenres[i]) {
          return movie;
        }
      }
  }))
  //console.log("filteredFavs GENRE BUTTON: " + filteredFavs.map(movie => movie.title));

  const toggleOrder = (title) => {
    if(order.title == title) {
      if(order.status == "inc") {
        setOrder({title: title, status: "dec"})
      } else {
        setOrder({title: title, status: "inc"})
      }
    } else {
      setOrder({title: title, status: "inc"});
    }
  }

  if(order.title == "Movie") { 
    if(order.status == "inc") {
      filteredFavs.sort((a, b) => (a.original_title > b.original_title) ? 1 : -1);
      //console.log(filteredFavs.map(movie => movie.title));
    } else {
      filteredFavs.sort((a, b) => (a.original_title > b.original_title) ? -1 : 1);
      //console.log(filteredFavs.map(movie => movie.title));
    }
  } else if(order.title == "Popularity") {
    if(order.status == "inc") {
      filteredFavs.sort((a, b) => (a.popularity > b.popularity) ? 1 : -1);
    } else {
      filteredFavs.sort((a, b) => (a.popularity > b.popularity) ? -1 : 1);
    }
  } else if(order.title == "Rating") {
    if(order.status == "inc") {
      filteredFavs.sort((a, b) => (a.vote_average > b.vote_average) ? 1 : -1);
    } else {
      filteredFavs.sort((a, b) => (a.vote_average > b.vote_average) ? -1 : 1);
    }
  }
  //console.log("filteredFavs SORT: " + filteredFavs.map(movie => movie.title));

  //search
  filteredFavs = filteredFavs.filter(movie => movie.title.toLowerCase().includes(search.toLowerCase()));
  //console.log("filteredFavs SEARCH: " + filteredFavs.map(movie => movie.title));

  //displaying only entered number of rows
  let maxPages = Math.ceil(filteredFavs.length / rows)
  //console.log("Max pages: " + maxPages);
  let startIdx = (page * rows) - rows;
  let endIdx = Number(startIdx) + Number(rows);
  //console.log("si: " + startIdx + " ei: " + endIdx);
  filteredFavs = filteredFavs.slice(startIdx, endIdx);
  //console.log("filteredFavs ROWS: " + filteredFavs.map(movie => movie.title));

  //pagination
  const nextPage = () => {
    if(page < maxPages)
      setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  //console.log("filteredFavs FINAL: " + filteredFavs.map(movie => movie.title));

  return (
    <>
      <NavBar />
      <div className='mt-4 px-2 flex justify-center flex-wrap space-x-2'>
        {genreButtons.map(genre => (
          <button 
            className={currGenre == genre
              ?`m-2 text-lg p-1 bg-blue-400 hover:bg-blue-400 text-white rounded-xl font-bold`
              :`m-2 text-lg p-1 bg-gray-400 hover:bg-blue-400 text-white rounded-xl font-bold`
            }
            onClick={() => {
              setCurrGenre(genre)
              setPage(1)
            }}
          >
            {genre}
          </button>
        ))}
      </div>

      <div className='text-center'>
        <input 
          type="text" 
          className="border boder-3 p-1 m-2" 
          placeholder='search' 
          value={search} 
          onChange={(e) => {
            setSearch(e.target.value);
          }}/>
        <input 
          type="number" 
          className="border boder-3 p-1 m-2" 
          placeholder='rows'
          value={rows}
          onChange={(e) => {
            setRows(e.target.value);
          }} />
      </div>

      <div className="flex flex-col m-4">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-default hover:bg-gray-100"
                      onClick={() => {
                         toggleOrder("Movie")
                      }}
                    >
                      {order.title !== "Movie" 
                        ? <></> 
                        : order.status == "inc" 
                            ? <img src="https://img.icons8.com/material-rounded/24/000000/collapse-arrow.png" className='mt-0.5 w-[1.5vh] h-[1.75vh]'/>
                            : <img src="https://img.icons8.com/material-rounded/24/000000/expand-arrow--v1.png" className='w-[1.5vh] h-[1.75vh]'/>
                      }                                       
                      Movie
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-default hover:bg-gray-100"
                      onClick={() => {
                        toggleOrder("Rating")
                      }}
                    >
                      {order.title !== "Rating" 
                        ? <></> 
                        : order.status == "inc" 
                            ? <img src="https://img.icons8.com/material-rounded/24/000000/collapse-arrow.png" className='mt-0.5 w-[1.5vh] h-[1.75vh]'/>
                            : <img src="https://img.icons8.com/material-rounded/24/000000/expand-arrow--v1.png" className='w-[1.5vh] h-[1.75vh]'/>
                      }                                       
                      Rating
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-default hover:bg-gray-100"
                      onClick={() => {
                        toggleOrder("Popularity")
                      }}
                    >
                      {order.title !== "Popularity" 
                        ? <></> 
                        : order.status == "inc" 
                            ? <img src="https://img.icons8.com/material-rounded/24/000000/collapse-arrow.png" className='mt-0.5 w-[1.5vh] h-[1.75vh]'/>
                            : <img src="https://img.icons8.com/material-rounded/24/000000/expand-arrow--v1.png" className='w-[1.5vh] h-[1.75vh]'/>
                      }                                       
                      Popularity
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-default hover:bg-gray-100"
                    >
                      Genre
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-default hover:bg-gray-100"
                    >
                      Remove
                    </th>
                    
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredFavs.map((movie) => (
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full bg-center bg-cover" 
                              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{movie.original_title}</div>
                            <div className="text-sm text-gray-500">{movie.release_date.slice(0, 4)}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{movie.vote_average}</div>
                        <div className="text-sm text-gray-500">{movie.vote_count} votes</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{movie.popularity}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {movie.genre_ids.map((id) => (
                            <span className="mr-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {genreIds.genres.find(gid => gid.id == id).name}
                            </span>                          
                        ))}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span 
                          className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 cursor-pointer"
                          onClick={() => {
                            removeFromFavs(movie);
                          }}
                        >                          
                          Remove
                        </span>                        
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className='m-4'>
        <Pagination pageProp={page} nextPage={nextPage} prevPage={prevPage}/>
      </div>
    </>
  )
}

export default Favourites