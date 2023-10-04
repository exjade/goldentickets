import { useState } from 'react'

export default function useDropDown() {
    const [dropdown, setDropdown] = useState(false)

    const openDropdown = () => {
        setDropdown(true)
    }

    const closeDropdown = () => {
        setDropdown(false)
    }


    return { setDropdown, dropdown, closeDropdown, openDropdown }
}