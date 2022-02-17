import React, { useState } from "react";

function Pagination() {
  const [pageNumber, setPage] = useState(1);

  const nextPage = () => {
    setPage(pageNumber + 1);
  }

  const prevPage = () => {
    if(pageNumber > 1) {
      setPage(pageNumber - 1);
    }
  }

  return (
    <div className="mb-8 w-full flex justify-center">
      <button className="p-2 border-2 border-r-0 border-indigo-500 text-indigo-500 rounded-l-xl" onClick={prevPage}>
        Previous
      </button>
      <button className="p-2 border-2 border-r-0 border-indigo-500 text-indigo-500">
        {pageNumber}
      </button>
      <button className="p-2 border-2 border-indigo-500 text-indigo-500 rounded-r-xl" onClick={nextPage}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
