import { useState } from 'react'

export default function useBreadcrumbs() {

    const [state, setState] = useState({
        breadcrumb1: true,
        breadcrumb2: false,
    })


    return { state, setState }

}