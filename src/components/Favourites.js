import React, {useState, useEffect} from 'react'
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

  const [genre, setGenre] = useState('All Genres')
  const [order, setOrder] = useState({title: "Movie", status: "inc"});
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    const oldFavs = JSON.parse(localStorage.getItem("favs"));
    setFavs([...oldFavs]);
  }, [])

  const removeFromFavs = (movie) => {
    //console.log("in removeFromFavs");
    let newFavs = favs.filter((m) => m.id !== movie.id);
    setFavs([...newFavs]);
    localStorage.setItem("favs", JSON.stringify(newFavs));
    //console.log(newFavs);
  };

  const toggleOrder = (title) => {
    if(order.title == title) {
      if(order.status == "inc") {
        setOrder({title: title, status: "dec"})
        sortBasedOnTitle(title, "dec");
      } else {
        setOrder({title: title, status: "inc"})
        sortBasedOnTitle(title, "inc");
      }
    } else {
      setOrder({title: title, status: "inc"});
      sortBasedOnTitle(title, "inc");
    }
  }

  const sortBasedOnTitle = (title, status) => {
    if(title == "Movie") { 
      if(status == "inc") {
        let newFavs = [...favs];
        newFavs.sort((a, b) => (a.original_title > b.original_title) ? 1 : -1);
        setFavs([...newFavs]);
      } else {
        let newFavs = [...favs];
        newFavs.sort((a, b) => (a.original_title > b.original_title) ? -1 : 1);
        setFavs([...newFavs]);
      }
    } else if(title == "Popularity") {
      if(status == "inc") {
        let newFavs = [...favs];
        newFavs.sort((a, b) => (a.popularity > b.popularity) ? 1 : -1);
        setFavs([...newFavs]);
      } else {
        let newFavs = [...favs];
        newFavs.sort((a, b) => (a.popularity > b.popularity) ? -1 : 1);
        setFavs([...newFavs]);
      }
    } else if(title == "Rating") {
      if(status == "inc") {
        let newFavs = [...favs];
        newFavs.sort((a, b) => (a.vote_average > b.vote_average) ? 1 : -1);
        setFavs([...newFavs]);
      } else {
        let newFavs = [...favs];
        newFavs.sort((a, b) => (a.vote_average > b.vote_average) ? -1 : 1);
        setFavs([...newFavs]);
      }
    }
  }

  return (
    <>
      <NavBar />
      <div className='mt-4 px-2 flex justify-center flex-wrap space-x-2'>
        <button 
          className={genre == "All Genres" 
            ?`m-2 text-lg p-1 bg-blue-400 hover:bg-blue-400 text-white rounded-xl font-bold`
            :`m-2 text-lg p-1 bg-gray-400 hover:bg-blue-400 text-white rounded-xl font-bold`
          }
          onClick={() => {
            setGenre("All Genres")
          }}
        >
          All Genres
        </button>
        <button 
          className={genre == "Action" 
          ?`m-2 text-lg p-1 bg-blue-400 hover:bg-blue-400 text-white rounded-xl font-bold`
          :`m-2 text-lg p-1 bg-gray-400 hover:bg-blue-400 text-white rounded-xl font-bold`
        }
          onClick={() => {
            setGenre("Action")
          }}
        >
          Action
        </button>
      </div>

      <div className='text-center'>
        <input type="text" className="border boder-3 p-1 m-2" placeholder='search'/>
        <input type="number" className="border boder-3 p-1 m-2" placeholder='rows'/>
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
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-default"
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
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-default"
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
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-default"
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
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Genre
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Remove
                    </th>
                    
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {favs.map((movie) => (
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
                        {movie.genre_ids.map((id) => {
                          let genre = genreIds.genres.find(gid => gid.id == id).name;
                          console.log(genre);
                          <div>
                            {genre} 
                          </div>
                        })}
                      </td>
                      <td 
                        className="px-10 py-4 whitespace-nowrap text-sm text-gray-500" 
                      >
                        <div
                          className='cursor-pointer'
                          onClick={() => {
                            removeFromFavs(movie);
                          }}>
                          ❌
                        </div>
                        
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
        <Pagination />
      </div>
    </>
  )
}

export default Favourites