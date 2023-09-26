import React from 'react'
const transactionsLoader = () => {
    return (
        <div className="h-screen w-screen animate-pulse bg-gray-loader">
            <div className="h-10 w-full animate-pulse bg-gray-info"></div>
            <div className="h-5 w-full animate-pulse bg-gray-info"></div>
            <div className="h-5 w-full animate-pulse bg-gray-info"></div>
            <div className="h-5 w-full animate-pulse bg-gray-info"></div>
            <div className="h-5 w-full animate-pulse bg-gray-info"></div>
        </div>
    )
}

export default transactionsLoader