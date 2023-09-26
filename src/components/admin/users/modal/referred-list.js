import { useState } from 'react'
import PropTypes from 'prop-types'
import useUsers from '../../../../hooks/use-users'

const ReferredList = ({
    referrers,
    setReferredSeach,
    referredSeach,
    closeModal
}) => {
    const { users } = useUsers()
    const usersReferredByMe = users?.filter(user => referrers?.referral?.userReferrals?.includes(user.userId))

    const filteredTransactions = usersReferredByMe?.filter(search =>
        search.username.toLowerCase().includes(referredSeach.toLowerCase()) ||
        search.userId?.toLowerCase().includes(referredSeach.toLowerCase()) ||
        search.fullName?.toLowerCase().includes(referredSeach.toLowerCase()) ||
        search.wallet?.toLowerCase().includes(referredSeach.toLowerCase()) ||
        search.emailAddress?.toLowerCase().includes(referredSeach.toLowerCase()) ||
        search.rol?.toLowerCase().includes(referredSeach.toLowerCase())
    )

    // filter users not sponsored
    const usersSponsored = usersReferredByMe?.filter(user => user.rol !== 'sponsored')
    
    // Sponsored Stats
    const [displayStats, setDisplayStats] = useState(false)
    const referralsApplied = usersSponsored?.reduce((a, b) => a + parseFloat(b.Applied), 0).toFixed(2);
    const referralsBalance = usersSponsored?.reduce((a, b) => a + parseFloat(b.Balance), 0).toFixed(2);
    const referralsProfit = usersSponsored?.reduce((a, b) => a + parseFloat(b.Profit), 0).toFixed(2);
    const referralPercentaje = usersSponsored?.reduce((a, b) => a + parseFloat(b.Applied), 0).toFixed(2) * 0.10;

    return (
        <>

            {/* <div className='bg-black-normal z-10 absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center'> */}
            <div className='bg-black-normal z-10 absolute w-full h-full overflow-scroll flex justify-center items-center'>
                <div className='container w-full h-full '>

                    <span className='flex flex-row items-center gap-5 justify-center mb-5'>
                        <h1 className='text-3xl font-bold text-white-primary uppercase mt-10'>Referral_List, <p className='text-2xl '>{referrers?.username}</p></h1>
                        <button
                            type='button'
                            className='flex justify-center items-center text-normal font-bold text-black-normal uppercase bg-white-normal p-1 w-14 rounded-md active:transform active:scale-90 ' >
                            <span className="material-symbols-sharp"
                            onClick={() => closeModal()}
                            >
                                arrow_back
                            </span>
                        </button>
                    </span>

                    <div className='flex items-center gap-5 justify-center mb-5'>
                        {/* SPONSORED STATS */}
                        {
                            !displayStats ? (
                                <button
                                    className='flex flex-col justify-center items-center gap-3 w-22 bg-white-normal  rounded-xl p-[1em] shadow-gray-border shadow-md active:transform active:scale-95'
                                    onClick={() => setDisplayStats(true)}
                                >
                                    Show referrals stats
                                </button>
                            ) : (
                                <button
                                    className='flex flex-col justify-center items-center gap-3 w-22 bg-white-normal  rounded-xl p-[1em] shadow-gray-border shadow-md active:transform active:scale-95'
                                    onClick={() => setDisplayStats(false)}
                                >
                                    Hide referrals stats
                                </button>
                            )
                        }
                    </div>
                    {
                        displayStats && (
                            <div className='flex flex-col justify-between items-center gap-20'>
                                <div className='grid grid-cols-2 justify-center items-center sm:grid-cols-4 w-10/12 gap-5'>
                                    <div className='flex flex-col justify-center items-center gap-3 w-full bg-white-normal  rounded-xl p-[1em] shadow-gray-border shadow-md'>
                                        <p className='text-md sm:text-lg font-normal text-center text-gray-adminParagraph capitalize'>Users</p>
                                        <p className='text-2xl sm:text-[2em] font-extrabold text-gray-adminParagraph capitalize'>
                                            {usersReferredByMe?.length}
                                        </p>
                                    </div>
                                    <div className='flex flex-col justify-center items-center gap-3 w-full bg-white-normal  rounded-xl p-[1em] shadow-gray-border shadow-md'>
                                        <p className='text-md sm:text-lg font-normal text-center text-gray-adminParagraph capitalize'>Investment</p>
                                        <p className='text-2xl sm:text-[2em] font-extrabold text-gray-adminParagraph capitalize'>
                                            {`${parseFloat(referralsApplied).toLocaleString('en-US', {
                                                style: 'currency',
                                                currency: 'USD',
                                            })}`}
                                        </p>
                                    </div>
                                    <div className='flex flex-col justify-center items-center gap-3 w-full bg-white-normal  rounded-xl p-[1em] shadow-gray-border shadow-md'>
                                        <p className='text-md sm:text-lg font-normal text-center text-gray-adminParagraph capitalize'>Balance</p>
                                        <p className='text-2xl sm:text-[2em] font-extrabold text-gray-adminParagraph capitalize'>
                                            {`${parseFloat(referralsBalance).toLocaleString('en-US', {
                                                style: 'currency',
                                                currency: 'USD',
                                            })}`}
                                        </p>
                                    </div>
                                    <div className='flex flex-col justify-center items-center gap-3 w-full bg-white-normal  rounded-xl p-[1em] shadow-gray-border shadow-md'>
                                        <p className='text-md sm:text-lg font-normal text-center text-gray-adminParagraph capitalize'>Profit</p>
                                        <p className='text-2xl sm:text-[2em] font-extrabold text-gray-adminParagraph capitalize'>
                                            {`${parseFloat(referralsProfit).toLocaleString('en-US', {
                                                style: 'currency',
                                                currency: 'USD',
                                            })}`}
                                        </p>
                                    </div>
                                    <div className='flex flex-col justify-center items-center gap-3 w-full bg-white-normal  rounded-xl p-[1em] shadow-gray-border shadow-md'>
                                        <p className='text-md sm:text-lg font-normal text-center text-gray-adminParagraph capitalize'>Earnings</p>
                                        <p className='text-2xl sm:text-[2em] font-extrabold text-gray-adminParagraph capitalize'>
                                            {`${parseFloat(referralPercentaje).toLocaleString('en-US', {
                                                style: 'currency',
                                                currency: 'USD',
                                            })}`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    }



                    {/* SEACH BAR */}
                    <div className="relative text-gray-600 flex justify-center items-center w-full my-10">
                        <input type="search" name="serch" placeholder='Search_User' className="bg-black-background text-center text-white-normal h-14 px-5 pr-10 rounded-full text-sm focus:outline-none w-10/12 "
                            onChange={e => {
                                setReferredSeach(e.target.value)
                            }}
                        />
                    </div>


                    {
                        filteredTransactions?.length > 0 ? (
                            <>
                                <table className='table p-4 shadow rounded-lg w-full'>
                                    <thead className='bg-white-primary'>
                                        <tr>
                                            <th className='border p-4 dark:border-gray-info whitespace-nowrap font-semibold text-black-background uppercase'>
                                                #
                                            </th>
                                            <th className='border p-4 dark:border-gray-info whitespace-nowrap font-semibold text-black-background uppercase'>
                                                Full_Name
                                            </th>
                                            <th className='border p-4 dark:border-gray-info whitespace-nowrap font-semibold text-black-background uppercase'>
                                                Username
                                            </th>
                                            <th className='border p-4 dark:border-gray-info whitespace-nowrap font-semibold text-black-background uppercase'>
                                                Investment
                                            </th>
                                            <th className='border p-4 dark:border-gray-info whitespace-nowrap font-semibold text-black-background uppercase'>
                                                Rol
                                            </th>
                                        </tr>
                                    </thead>
                                    {filteredTransactions.map((user, k) => (
                                        <tbody key={k} className='w-full text-center overflow-scroll'>
                                            <tr className='text-gray-700'>
                                                <td className='border p-4 dark:border-gray-info capitalize text-white-normal'>
                                                    {k + 1}
                                                </td>
                                                <td className='border p-4 dark:border-gray-info capitalize text-white-normal'>
                                                    {user?.fullName}
                                                </td>
                                                <td className='border p-4 dark:border-gray-info   capitalize text-white-normal'>
                                                    {user?.username}
                                                </td>
                                                <td className='border p-4 dark:border-gray-info   capitalize text-white-normal'>
                                                    {`$${parseInt(user.Applied).toFixed(2)}`}
                                                </td>
                                                <td className='border p-4 dark:border-gray-info   capitalize text-white-normal'>
                                                    {user?.rol}
                                                </td>
                                            </tr>

                                        </tbody>
                                    ))}
                                </table>
                            </>
                        ) :
                            (
                                <>
                                    <table className='table p-4 shadow rounded-lg w-full'>
                                        <thead className='bg-white-primary'>
                                            <tr>
                                                <th className='border p-4 dark:border-gray-info whitespace-nowrap font-semibold text-black-background uppercase'>
                                                    No users found
                                                </th>
                                            </tr>
                                        </thead>

                                    </table>
                                </>
                            )
                    }
                </div>
            </div>

        </>
    )

}

export default ReferredList

ReferredList.propTypes = {
    referrers: PropTypes.any,
    setReferredSeach: PropTypes.func,
    referredSeach: PropTypes.string,
    closeModal: PropTypes.func,
}