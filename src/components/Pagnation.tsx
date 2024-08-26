import { useNavigate } from "react-router-dom";

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  setCurrentPage: (page: number) => void;
  keyword: string;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPage, setCurrentPage, keyword }) => {
  const navigate = useNavigate();
  const pageNumbers: number[] = [];
  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }

  const handlePage = (pageNumber: number) => {
    console.log(pageNumber);
    setCurrentPage(pageNumber);
    navigate(`/info?page=${pageNumber}${keyword ? `&keyword=${keyword}` : ''}`);
  }

  return (
    <div>
      <ul className="flex justify-center gap-3 m-4">
        {pageNumbers.map(pageNumber => (
          <li
            key={pageNumber}
            className={currentPage === pageNumber ? "text-bold text-blue-700" : ""}
            onClick={() => handlePage(pageNumber)}
          >
            {pageNumber}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pagination;
