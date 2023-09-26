import { useState } from 'react'
import useUser from '../../../hooks/use-user'
import useMenu from '../../../hooks/use-menu'
import PlatformEarningsTimeline from './admin-earnings-timeline'

const PlatformEarnings = () => {

    const { user, user: { username, photoURL } } = useUser()
    const { openMenu, toggleOpen, toggleClose } = useMenu()
    //eslint-disable-next-line no-unused-vars
    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = () => setIsOpen(true)

    return (
        <>

            {
                user?.rol !== 'investor' && user?.rol !== 'sponsored' && user?.rol === 'admin' || user?.rol === 'owner' ? (
                    <PlatformEarningsTimeline
                        user={user}
                        username={username}
                        photoURL={photoURL}
                        openMenu={openMenu}
                        toggleOpen={toggleOpen}
                        toggleClose={toggleClose}
                        setIsOpen={setIsOpen}
                        handleOpen={handleOpen}
                        isOpen={isOpen}
                    />
                ) : (
                    <p className='h-screen w-screen flex justify-center items-center text-2xl font-bold'>You dont have access to this page</p>
                )
            }
        </>
    )
}

export default PlatformEarnings

