import { useState } from 'react'

export default function useBreadcrumbs() {

    const [state, setState] = useState({
        stateOne: true,
        stateTwo: false,
        stateThree: false,
    });

    return { state, setState }
}