import { Video } from '@/pages'
import { useRouter } from 'next/router'
import { PaginationStyle } from './Pagination.styles'

function Pagination({ setPage, page, data }: { setPage: React.Dispatch<React.SetStateAction<number>>, page: number, data: { data: Array<Video> } }) {


    const router = useRouter();

    const totalPages = 23;

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

    // const totalPages = Math.ceil(data.data.length / 10);
    // console.log('data.length', data.data)

    return (
        <PaginationStyle>
            <button onClick={() => handlePageChange(Math.max(page - 1, 1))} disabled={page === 1}>
                Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
                <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    disabled={page === index + 1}
                >
                    {index + 1}
                </button>
            ))}
            <button onClick={() => handlePageChange(page + 1)} disabled={data && data.data.length < 10}>
                Next
            </button>
        </PaginationStyle>
    )
}

export default Pagination