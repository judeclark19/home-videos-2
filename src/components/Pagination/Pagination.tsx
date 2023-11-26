import { Video } from '@/pages'
import React from 'react'

function Pagination({ setPage, page, data }: { setPage: React.Dispatch<React.SetStateAction<number>>, page: number, data: Array<Video> }) {
    return (
        <div>
            <button onClick={() => setPage((old: number) => Math.max(old - 1, 1))} disabled={page === 1}>
                Previous
            </button>
            <span>Page {page}</span>
            <button onClick={() => setPage((old: number) => old + 1)} disabled={data && data.length < 10}>
                Next
            </button>
        </div>
    )
}

export default Pagination