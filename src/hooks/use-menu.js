import { useState } from 'react'

export default function useMenu() {
    // menu expand 
    const [openMenu, setOpenMenu] = useState(false);
    const toggleOpen = () => setOpenMenu(true);
    const toggleClose = () => setOpenMenu(false);

    return { openMenu, toggleOpen, toggleClose }
}