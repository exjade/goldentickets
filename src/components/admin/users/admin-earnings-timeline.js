import { useState } from 'react'
import PropTypes from 'prop-types'
import AdminUserListEarnings from './admin-user-list'
//styles
import '../../../styles/sidebar/sidebar.css'


const PlatformEarningsTimeline = () => {

    const [referralSearch, setReferralSearch] = useState('');

    const [referredSeach, setReferredSeach] = useState('');

    return (
        <>
            <AdminUserListEarnings
                setReferralSearch={setReferralSearch}
                referralSearch={referralSearch}
                setReferredSeach={setReferredSeach}
                referredSeach={referredSeach}
            />
        </>

    )
}

export default PlatformEarningsTimeline

PlatformEarningsTimeline.propTypes = {
    setSearch: PropTypes.func,
    handleOpen: PropTypes.func,
    toggleOpen: PropTypes.func,
    toggleClose: PropTypes.func,
    openMenu: PropTypes.bool,
    setIsOpen: PropTypes.func,
    user: PropTypes.object,
    username: PropTypes.string,
    photoURL: PropTypes.string,
    isOpen: PropTypes.bool,
}