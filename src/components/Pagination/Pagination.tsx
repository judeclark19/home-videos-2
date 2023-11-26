import { Video } from '@/pages'
import { useRouter } from 'next/router'
import { PaginationStyle } from './Pagination.styles'

function Pagination({ setPage, page, data }: { setPage: React.Dispatch<React.SetStateAction<number>>, page: number, data: Array<Video> }) {

    const router = useRouter();

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        const currentPath = router.pathname;
        const currentQuery = { ...router.query };
        currentQuery.page = newPage.toString();
        router.push({
            pathname: currentPath,
            query: currentQuery,
        }, undefined, { shallow: true });
    };

    return (
        <PaginationStyle>
            <button onClick={() => handlePageChange(Math.max(page - 1, 1))} disabled={page === 1}>
                Previous
            </button>
            <span>Page {page}</span>
            <button onClick={() => handlePageChange(page + 1)} disabled={data && data.length < 10}>
                Next
            </button>
        </PaginationStyle>
    )
}

export default Pagination