import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { formatDistance } from 'date-fns'
//hooks
import useAuthListener from '../../hooks/use-auth-listener';
//styles
import styles from '../../styles/modules/withdrawal/withdrawal.module.css';
//loader
import WithdrawalLoader from './loader/withdrawal-loader';
import { useTranslation } from 'react-i18next';
import useReinvestments from '../../hooks/use-reinvestments';

const ReinvestmentHistory = () => {
    const { t } = useTranslation()
    const { reinvestments } = useReinvestments();
    const { user: authUser } = useAuthListener();
    const filteredInvestments = reinvestments?.filter(reinvestment => reinvestment.CustomerId === authUser.uid);
    //Loader
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        document.title = 'Withdrawal History - Artificial';

        setTimeout(() => {
            setIsLoading(false);
        }, 1000);

    }, [])

    //eslint-disable-next-line no-unused-vars
    const orderByDate = filteredInvestments?.sort((a, b) => {
        return new Date(b.WithdrawalStatus === 'PENDING') - new Date(a.date)
    })

    const loader = () => { return <WithdrawalLoader /> }

    if (isLoading) return loader();
    else {
        return (
            <div className={`${styles.historyContainer}  flex w-full justify-center items-center`}>
                <div className={`${styles.historyWrapper}`}>

                    <div className={`bg-white-primary flex flex-row w-full justify-around items-center h-14 rounded-md mb-1 border-b-4 border-black-normal`}>
                        <p className={`${styles.hiddenMobile} text-xl font-semibold text-black-background`} >ID</p>
                        <p className='text-xl font-semibold text-black-background'>{t('Currency')}</p>
                        <p className='text-xl font-semibold text-black-background'>{t('Status')}</p>
                        <p className={`${styles.hiddenMobile} text-xl font-semibold text-black-background`} >{t('Date')}</p>
                        <p className='text-xl font-semibold text-black-background'>{t('Amount')}</p>
                        <p className={`${styles.hiddenMobile} text-xl font-semibold text-black-background`}>{t('Fee')}</p>
                        <p></p>
                    </div>

                    {
                        filteredInvestments?.length > 0 ?
                            (
                                <>
                                    {
                                        filteredInvestments.map((reinvestment, index) => (
                                            <div className={`bg-white-normal flex flex-row w-full justify-around items-center h-32 rounded-md mb-3`} key={index}>
                                                <h3 className='text-md  font-semibold text-black-normal '>{reinvestment?.WithdrawalId}</h3>
                                                {
                                                    reinvestment?.WithdrawalCurrency === 'TETHER' ? (
                                                        <h3 className={`${styles.hiddenMobile} text-md  font-semibold text-black-normal `} >
                                                            USDT
                                                        </h3>
                                                    )
                                                        : null
                                                }
                                                {/* REINVESTMENT */}
                                                {
                                                    reinvestment?.isReinvestment ? (
                                                        <>
                                                            {
                                                                reinvestment?.WithdrawalStatus === 'Pending' ? (
                                                                    <p className='text-base font-semibold text-badges-gold'>{t('Pending')}</p>
                                                                ) : (
                                                                    <p className='text-base font-semibold text-green-button'>{t('Reinvest')}</p>
                                                                )
                                                            }
                                                        </>
                                                    ) : (
                                                        <>
                                                            {
                                                                reinvestment?.WithdrawalStatus === 'Pending' ? (
                                                                    <p className='text-base font-semibold text-badges-gold'>{t('Pending')}</p>
                                                                ) : (
                                                                    <p className='text-base font-semibold text-green-button'>{t('Deposited')}</p>
                                                                )
                                                            }
                                                        </>
                                                    )
                                                }

                                                <p className={`${styles.hiddenMobile}`} >{formatDistance(reinvestment.WithdrawalDate, new Date(), { addSuffix: true })}</p>
                                                <p className='text-2xl font-medium text-green-button'>
                                                    {`${parseInt(reinvestment?.WithdrawalAmount).toLocaleString('en-US', {
                                                        style: 'currency',
                                                        currency: 'USD',
                                                    })}`}
                                                </p>
                                                {reinvestment?.WithdrawalFee >= 1 ? (
                                                    <>
                                                        <p className={`${styles.hiddenMobile} text-2xl font-medium text-green-button`}  >
                                                            {`${parseInt(reinvestment?.WithdrawalFee).toLocaleString('en-US', {
                                                                style: 'currency',
                                                                currency: 'USD',
                                                            })}`}
                                                        </p>
                                                    </>
                                                ) : (
                                                    <p className={`${styles.hiddenMobile} text-2xl font-medium text-green-button`} >
                                                        NO FEE
                                                    </p>
                                                )
                                                }

                                                {
                                                    reinvestment.WithdrawalURL !== '' ? (
                                                        <button className='text-md font-medium text-white-normal bg-blue-emblema hover:bg-blue-primary py-2 px-3 rounded-md'>
                                                            <a href={reinvestment.WithdrawalURL} target='_blank' rel='noreferrer'>{t('View')}</a>
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className='text-md font-medium  py-2 px-3 rounded-md cursor-not-allowed'
                                                            disabled
                                                        >
                                                            
                                                        </button>
                                                    )
                                                }
                                            </div>
                                        ))
                                    }
                                </>
                            )
                            :
                            (
                                <div className={`${styles.withdrawalHistoryNotFound} flex justify-center items-center mt-32 h-full w-full`} >
                                    <p className='text-4xl font-semibold text-black-btnicon '>{t('No recent Reinvestments')}</p>
                                </div>
                            )
                    }
                </div>
            </div>
        )
    }
}

export default ReinvestmentHistory

ReinvestmentHistory.propTypes = {
    reinvestments: PropTypes.array
}