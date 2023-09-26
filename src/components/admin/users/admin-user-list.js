import React, { useState } from 'react'
import PropTypes from 'prop-types'
import useUsers from '../../../hooks/use-users'
import useModal from '../../../hooks/use-modal'
import useModalReffered from '../../../hooks/use-modal-referred'
import styles from '../../..//styles/modules/admin/admindashboard.module.css'
import ModifyUser from './modal/modal'
import ReferredList from './modal/referred-list'


const AdminUserListEarnings = ({
    setReferralSearch,
    referralSearch,
    setReferredSeach,
    referredSeach,
}) => {
    //eslint-disable-next-line
    const [docId, setDocId] = useState(null)
    const [rol, setRol] = useState('')
    //eslint-disable-next-line
    const [username, setUsername] = useState('')
    //eslint-disable-next-line
    const [referrers, setReferrers] = useState([])
    const [success, setSuccess] = useState('')
    const { users } = useUsers()
    const {
        // toggleModal,
        closeModal,
        open,
    } = useModal()
    const {
        // toggleModalReferral,
        closeModalReferral,
        openReferral
    } = useModalReffered()


    const usersEarnings = users?.sort((a, b) => parseFloat(b.Applied) - parseFloat(a.Applied))

    const filteredTransactions = usersEarnings?.filter(search =>
        search.username.toLowerCase().includes(referralSearch.toLowerCase()) ||
        search.userId?.toLowerCase().includes(referralSearch.toLowerCase()) ||
        search.fullName?.toLowerCase().includes(referralSearch.toLowerCase()) ||
        search.wallet?.toLowerCase().includes(referralSearch.toLowerCase()) ||
        search.emailAddress?.toLowerCase().includes(referralSearch.toLowerCase()) ||
        search.rol?.toLowerCase().includes(referralSearch.toLowerCase())
    )

    // Sponsored Stats
    const [displayStats, setDisplayStats] = useState(false)

    const usersApplied = usersEarnings?.reduce((a, b) => a + parseFloat(b.Applied), 0).toFixed(2);
    const usersBalance = usersEarnings?.reduce((a, b) => a + parseFloat(b.Balance), 0).toFixed(2);
    const usersProfit = usersEarnings?.reduce((a, b) => a + parseFloat(b.Profit), 0).toFixed(2);

    return (
        <>

            {
                openReferral ? (
                    <ReferredList
                        closeModal={closeModalReferral}
                        docId={docId}
                        rol={rol}
                        setRol={setRol}
                        setSuccess={setSuccess}
                        success={success}
                        referrers={referrers}
                        setReferredSeach={setReferredSeach}
                        referredSeach={referredSeach}
                    />
                ) : open ? (
                    <ModifyUser
                        closeModal={closeModal}
                        docId={docId}
                        rol={rol}
                        setRol={setRol}
                        setSuccess={setSuccess}
                        success={success}
                        username={username}
                    />
                ) : (
                    <div className='bg-black-normal mx-auto w-full h-full overflow-scroll'>
                        <div className='flex flex-col justify-between items-center gap-20'>

                            <span className='flex items-center gap-5 justify-center flex-col'>
                                <h1 className='text-3xl font-bold text-white-primary uppercase mt-10'>platform Users List</h1>
                                <p className='text-red-logo text-base'>Sponsored accounts will be displayed in Red</p>

                                {
                                    !displayStats ? (
                                        <button
                                            className='flex flex-col justify-center items-center gap-3 w-full bg-white-normal  rounded-xl p-[1em] shadow-gray-border shadow-md active:transform active:scale-95'
                                            onClick={() => setDisplayStats(true)}
                                        >
                                            Show sponsored stats
                                        </button>
                                    ) : (
                                        <button
                                            className='flex flex-col justify-center items-center gap-3 w-full bg-white-normal  rounded-xl p-[1em] shadow-gray-border shadow-md active:transform active:scale-95'
                                            onClick={() => setDisplayStats(false)}
                                        >
                                            Hide sponsored stats
                                        </button>
                                    )
                                }
                            </span>

                            {/* SPONSORED STATS */}
                            {
                                displayStats && (
                                    <div className='grid grid-cols-2 md:grid-cols-4 w-10/12 gap-5'>
                                        <div className='flex flex-col justify-center items-center gap-3 w-full bg-white-normal  rounded-xl p-[1em] shadow-gray-border shadow-md'>
                                            <p className='text-md sm:text-lg font-normal text-center text-gray-adminParagraph capitalize'>Users</p>
                                            <p className='text-2xl sm:text-[2em] font-extrabold text-gray-adminParagraph capitalize'>
                                                {usersEarnings?.length}
                                            </p>
                                        </div>
                                        <div className='flex flex-col justify-center items-center gap-3 w-full bg-white-normal  rounded-xl p-[1em] shadow-gray-border shadow-md'>
                                            <p className='text-md sm:text-lg font-normal text-center text-gray-adminParagraph capitalize'>Investment</p>
                                            <p className='text-2xl sm:text-[2em] font-extrabold text-gray-adminParagraph capitalize'>
                                                {`${parseFloat(usersApplied).toLocaleString('en-US', {
                                                    style: 'currency',
                                                    currency: 'USD',
                                                })}`}
                                            </p>
                                        </div>
                                        <div className='flex flex-col justify-center items-center gap-3 w-full bg-white-normal  rounded-xl p-[1em] shadow-gray-border shadow-md'>
                                            <p className='text-md sm:text-lg font-normal text-center text-gray-adminParagraph capitalize'>Balance</p>
                                            <p className='text-2xl sm:text-[2em] font-extrabold text-gray-adminParagraph capitalize'>
                                                {`${parseFloat(usersBalance).toLocaleString('en-US', {
                                                    style: 'currency',
                                                    currency: 'USD',
                                                })}`}
                                            </p>
                                        </div>
                                        <div className='flex flex-col justify-center items-center gap-3 w-full bg-white-normal  rounded-xl p-[1em] shadow-gray-border shadow-md'>
                                            <p className='text-md sm:text-lg font-normal text-center text-gray-adminParagraph capitalize'>Profit</p>
                                            <p className='text-2xl sm:text-[2em] font-extrabold text-gray-adminParagraph capitalize'>
                                                {`${parseFloat(usersProfit).toLocaleString('en-US', {
                                                    style: 'currency',
                                                    currency: 'USD',
                                                })}`}
                                            </p>
                                        </div>
                                    </div>
                                )
                            }


                            {/* SEARCH BAR */}
                            <div className="relative text-gray-600 flex justify-center items-center w-full">
                                <input type="search" name="serch" placeholder="Search User" className="bg-black-background text-center text-black-normal h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-1/2 xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-11/12 "
                                    onChange={e => {
                                        setReferralSearch(e.target.value)
                                    }}
                                />
                            </div>

                            <table className='table p-4 shadow rounded-lg w-full'>
                                <thead className='bg-white-primary'>
                                    <tr>
                                        <th className='border p-4 dark:border-gray-primary whitespace-nowrap font-semibold text-white-normal bg- uppercase'>
                                            #
                                        </th>
                                        <th className={`${styles.mobileHidden} border p-4 dark:border-gray-primary whitespace-nowrap font-semibold text-white-normal bg- uppercase`} >
                                            Email
                                        </th>
                                        <th className='border p-4 dark:border-gray-primary whitespace-nowrap font-semibold text-white-normal bg- uppercase'>
                                            Username
                                        </th>
                                        <th className={`${styles.mobileHidden} border p-4 dark:border-gray-primary whitespace-nowrap font-semibold text-white-normal bg- uppercase`}>
                                            Total
                                        </th>
                                        <th className={`border p-4 dark:border-gray-primary whitespace-nowrap font-semibold text-white-normal bg- uppercase`}>
                                            Balance
                                        </th>
                                        <th className={`${styles.mobileHidden} border p-4 dark:border-gray-primary whitespace-nowrap font-semibold text-white-normal bg- uppercase`}>
                                            Profit
                                        </th>
                                       
                                    </tr>
                                </thead>

                                {filteredTransactions.map((user, k) => (
                                    <tbody key={k} className='w-full text-center overflow-scroll'>
                                        <tr className='text-gray-700'>
                                            <td className='border p-4 dark:border-gray-info capitalize text-white-normal'>
                                                {k + 1}
                                            </td>
                                            <td className={`${styles.mobileHidden} border p-4 dark:border-gray-info text-white-normal`} >
                                                {user.emailAddress.toLowerCase()}
                                            </td>
                                            <td className={`border p-4 dark:border-gray-info ${user.rol === 'sponsored' ? 'text-red-logo' : 'text-white-normal'}`} >
                                                {user.username.toLowerCase()}
                                            </td>
                                            <td className={`${styles.mobileHidden} border p-4 dark:border-gray-info capitalize text-white-normal`}>
                                                {`$${parseInt(user.Applied).toFixed(2)}`}
                                            </td>
                                            <td className={`} border p-4 dark:border-gray-info capitalize text-white-normal`}>
                                                {`$${parseInt(user.Balance).toFixed(2)}`}
                                            </td>
                                            <td className={`${styles.mobileHidden} border p-4 dark:border-gray-info capitalize text-white-normal`}>
                                                {`$${parseInt(user.Profit).toFixed(2)}`}
                                            </td>
                                           
                                        </tr>

                                    </tbody>
                                ))}
                            </table>

                        </div>
                    </div>
                )

            }
        </>
    )
}

export default AdminUserListEarnings

AdminUserListEarnings.propTypes = {
    open: PropTypes.bool,
    toggleModal: PropTypes.func,
    closeModal: PropTypes.func,
    user: PropTypes.object,
    setUser: PropTypes.func,
    setOpen: PropTypes.func,
    setReferralSearch: PropTypes.func,
    referralSearch: PropTypes.string,
    filteredTransactions: PropTypes.array,
    transactions: PropTypes.array,
    setTransactions: PropTypes.func,
    setFilteredTransactions: PropTypes.func,
    setReferredSeach: PropTypes.func,
    referredSeach: PropTypes.string,
} 