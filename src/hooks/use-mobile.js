import { useState, useEffect } from 'react'

export default function useMobile({ 
    // setIsOpen, 
    isOpen 
}) {
    const [mobile, setMobile] = useState(window.innerWidth > 600)

    const updateMedia = () => {
        setMobile(window.innerWidth > 600)
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }

    useEffect(() => {
        const handleResize = () => {
            window.addEventListener('resize', updateMedia)
            // setIsOpen(false)
        }
        return () => handleResize()
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mobile, isOpen])

    return { mobile }
}