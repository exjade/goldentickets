import { useState } from 'react'

export default function useModal() {
    const [open, setOpen] = useState(false);

    const toggleModal = () => { 
        setOpen(true);
    }
    const closeModal = () => {
        setOpen(false);
    }
    return { toggleModal, open, closeModal, setOpen }
}