import { useState } from 'react'

export default function useDropDown() {
    const [dropdown, setDropdown] = useState(false)

    return { setDropdown, dropdown }
}