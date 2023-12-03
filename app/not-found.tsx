"use client";

import { useRouter } from 'next/navigation'
import React from 'react'

function NotFound() {

    const router = useRouter()
    return (
        <div>
            <h1>Page not found</h1>
            <button onClick={() => {
                router.back()
            }}>Go Back</button>
        </div>
    )
}

export default NotFound