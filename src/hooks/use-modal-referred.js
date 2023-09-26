import { useState } from 'react'

export default function useModalReffered() {
    const [openReferral, setopenReferral] = useState(false);

    const toggleModalReferral = () => {
        setopenReferral(true);
    }
    const closeModalReferral = () => {
        setopenReferral(false);
    }
    return { toggleModalReferral, openReferral, closeModalReferral, setopenReferral }
}