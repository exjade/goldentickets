import { useEffect } from 'react'
import WithdrawalTimeline from '../components/withdrawal'

const Withdrawal = () => {
    useEffect(() => { document.title = 'WITHDRAWAL REQ | GOLDENTICKETS.CLUB' }, [])
    return (
        <>
        <WithdrawalTimeline />
        </>
    )
}

export default Withdrawal