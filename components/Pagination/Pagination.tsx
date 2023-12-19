import { useRouter } from "next/navigation";
import {
  PageNumbers,
  PageSelect,
  PaginationStyle,
  PrevNext
} from "./Pagination.styles";
import { Video } from "../../db/types";

function Pagination({
  setPage,
  page,
  data
}: {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  data: { videos: Array<Video>; totalVideos: number };
}) {
  const router = useRouter();

  const totalPages = Math.ceil(data?.totalVideos / 10) || 1;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);

    // change page param in the router
    const url = new URL(window.location.href);
    url.searchParams.set("page", newPage.toString());
    router.push(url.pathname + url.search);
  };

  return (
    <PaginationStyle>
      <PrevNext
        onClick={() => handlePageChange(Math.max(page - 1, 1))}
        disabled={page === 1}
      >
        &laquo;
      </PrevNext>
      <PageNumbers>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            disabled={page === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </PageNumbers>

      <PageSelect
        value={page}
        onChange={(e) => handlePageChange(parseInt(e.target.value))}
      >
        {[...Array(totalPages)].map((_, index) => (
          <option key={index} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </PageSelect>

      <PrevNext
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
      >
        &raquo;
      </PrevNext>
    </PaginationStyle>
  );
}

export default Pagination;
