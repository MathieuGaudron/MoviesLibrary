import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbersToShow = 5;
    const halfMaxPageNumbersToShow = Math.floor(maxPageNumbersToShow / 2);

    let startPage = Math.max(1, currentPage - halfMaxPageNumbersToShow);
    let endPage = Math.min(totalPages, currentPage + halfMaxPageNumbersToShow);

    if (currentPage <= halfMaxPageNumbersToShow) {
      endPage = Math.min(totalPages, maxPageNumbersToShow);
    }

    if (currentPage + halfMaxPageNumbersToShow >= totalPages) {
      startPage = Math.max(1, totalPages - maxPageNumbersToShow + 1);
    }

    if (startPage > 1) {
      pageNumbers.push(
        <button
          key={1}
          onClick={() => onPageChange(1)}
          className={`px-3 py-1 sm:px-4 sm:py-2 mx-1 rounded-lg ${1 === currentPage ? 'bg-purple-700 text-white' : 'bg-gray-300 text-black hover:bg-gray-400'}`}
        >
          1
        </button>
      );

      if (startPage > 2) {
        pageNumbers.push(<span key="start-ellipsis" className="px-2 sm:px-4 py-1 mx-1 text-gray-500">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3 py-1 sm:px-4 sm:py-2 mx-1 rounded-lg ${i === currentPage ? 'bg-purple-700 text-white' : 'bg-gray-300 text-black hover:bg-gray-400'}`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<span key="end-ellipsis" className="px-2 sm:px-4 py-1 mx-1 text-gray-500">...</span>);
      }

      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className={`px-3 py-1 sm:px-4 sm:py-2 mx-1 rounded-lg ${totalPages === currentPage ? 'bg-purple-700 text-white' : 'bg-gray-300 text-black hover:bg-gray-400'}`}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex flex-wrap justify-center mt-8 items-center gap-2 sm:gap-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 sm:px-4 sm:py-2 mx-1 bg-purple-700 hover:bg-purple-800 text-white rounded-lg disabled:opacity-50"
      >
        Précédent
      </button>
      <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
        {renderPageNumbers()}
      </div>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 sm:px-4 sm:py-2 mx-1 bg-purple-700 hover:bg-purple-800 text-white rounded-lg disabled:opacity-50"
      >
        Suivant
      </button>
    </div>
  );
};

export default Pagination;
