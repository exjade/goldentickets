import { useState, useEffect } from 'react'
// import Withdrawal from '../../pages/withdrawal'
import Transaction from '../../pages/transactions'
import * as ROUTES from '../../constants/routes'
import { useHistory } from 'react-router-dom'
import PlatformEarningsTimeline from './users/admin-earnings-timeline'

const AdminDashboard = () => {

    const history = useHistory()

    useEffect(() => {
        document.title = 'admin - GOLDENTICKETS.CLUB'
    }, []) //eslint-disable-line


    const [page, setPage] = useState({
        transactions: false,
        walletWithdrawals: false,
        users: true,
        withdrawals: false,
        earnings: false,
        sponsored: false,
    })

    const goDashboard = () => {
        history.push(ROUTES.DASHBOARD)
    }

    return (
        <>
            <div>
                <header className=' flex justify-center items-center w-full overflow-hidden text-black-normal bg-white-normal'>
                    <h1 className='font-bold font-2xl text-center cursor-pointer' onClick={() => goDashboard()}>Admin Dashboard</h1>
                </header>

                <section className="p-4 bg-black-background text-white-normal overflow-scroll bg-black-normal">
                    <div className="container flex justify-between h-16 mx-auto md:justify-center md:space-x-8">
                        <ul className="space-x-3 md:flex flex justify-center items-center">
                            <li className="flex">
                                <button className="flex items-center px-4 font-bold -mb-1 border-b-2 border-transparent"
                                    onClick={() => setPage({
                                        transactions: true,
                                        users: false,
                                        withdrawals: false,
                                        earnings: false,
                                        sponsored: false
                                    })}
                                >Transactions</button>
                            </li>
                            <li className="flex">
                                <button className="flex items-center px-4 font-bold -mb-1 border-b-2 border-transparent"
                                    onClick={() => setPage({
                                        transactions: false,
                                        users: false,
                                        withdrawals: true,
                                        earnings: false,
                                        sponsored: false
                                    })}
                                >Withdrawals</button>
                            </li>

                        </ul>
                        <a rel="noopener noreferrer" href="#" aria-label="Back to homepage" className="flex items-center p-2">
                            <span className="material-symbols-sharp text-red-logo">
                                admin_panel_settings
                            </span>
                        </a>
                        <ul className="space-x-3 md:flex flex justify-center items-center">
                            <li className="flex">
                                <button className="flex items-center px-4 -mb-1 border-b-2 border-transparent font-bold"
                                    onClick={() => setPage({
                                        transactions: false,
                                        users: true,
                                        withdrawals: false,
                                        earnings: false,
                                        sponsored: false
                                    })}
                                >Users</button>
                            </li>
                        </ul>
                    </div>
                </section>

                <section className='overflow-hidden'>
                    {
                        page.transactions && !page.users && !page.withdrawals && !page.earnings && !page.sponsored &&
                        <Transaction />
                    }
                    {
                        page.withdrawals && !page.transactions && !page.users && !page.earnings && !page.sponsored &&
                        // <Withdrawal />
                        <></>
                    }
                    {
                        page.users && !page.transactions && !page.withdrawals && !page.earnings && !page.sponsored && (
                            <PlatformEarningsTimeline />
                        )
                    }
                </section>
            </div>
        </>
    )
}

export default AdminDashboard