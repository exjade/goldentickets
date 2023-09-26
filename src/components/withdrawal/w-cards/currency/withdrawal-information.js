import React from 'react'
import PropTypes from 'prop-types'
import styles from '../../../../styles/modules/withdrawal/withdrawal.module.css';
import useModal from '../../../../hooks/use-modal';
import useWithdrawals from '../../../../hooks/use-withdrawals';
import WithdrawalModal from './withdrawal-modal';
import RequestLoader from '../../loader/request-loader';

const WithdrawalInformation = ({
    makeWithdrawalRequest,
    makeReinvest,
    user,
    loader,
    loaderError,
    isInvalid,
    withdrawalAmountError,
    withdrawalAmount,
    setWithdrawalAmount,
}) => {

    const { toggleModal, open, closeModal } = useModal();
    const invalid = user?.Withdrawal < 20

    // get all withdrawals
    const { withdrawals } = useWithdrawals();
    // filter my withdrawals by user id
    const myWithdrawal = withdrawals?.filter((withdrawal) => withdrawal.CustomerId === user?.userId)
    //filter my withdrawals by status Deposited
    const myWithdrawalCompleted = myWithdrawal?.filter((withdrawal) => withdrawal.WithdrawalStatus === 'Deposited')
    // sum all my withdrawals
    const sumWithdrawals = myWithdrawalCompleted?.reduce((acc, withdrawal) => acc + withdrawal.WithdrawalAmount
        , 0)


    return (
        <>
            {/* CONTAINER */}
            <div className='mx-auto w-full  flex items-center justify-center my-10'>
                {/* WRAPPER */}
                <div className='flex flex-col item-center justify-center w-11/12 xl:w-1/3 py-20 sm:pt-14 px-5 gap-10 bg-white-normal rounded-xl shadow-sm shadow-gray-info '>

                    <div className='flex flex-col items-center justify-around w-full gap-6'>
                        <div className='grid grid-rows-2 sm:grid-cols-2 justify-center place-items-start sm:place-items-center gap-2'>
                            {/* Title */}
                            <h3 className='text-gray-info font-light text-2xl text-start w-full pl-0 sm:pl-8'>Wallet,</h3>
                            <input
                                className={` text-md font-semibold  rounded-md text-start w-full`}
                                value={`${user?.bankInformationTether?.Wallet === '' ||
                                    user?.bankInformationTether?.Wallet === null ||
                                    user?.bankInformationTether?.Wallet === undefined ?
                                    'Update your information' :
                                    user?.bankInformationTether?.Wallet
                                    }`}
                                readOnly
                            />

                        </div>


                        {/* Withdrawal Amount */}
                        <div className='flex flex-col sm:flex-row w-full items-center justify-between px-8 sm:px-16 lg:px-52 xl:px-20 gap-4'>
                            <p className='text-green-amount font-semibold text-4xl '>
                                {parseFloat(user?.Withdrawal).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                })}
                            </p>
                            {/* Open Withdrawal Modal */}
                            <button
                                type='button'
                                className={`${styles.bggradienttoorange} rounded-md p-4 px-14 text-white-normal active:transform active:scale-95 `}
                                onClick={toggleModal}
                            >
                                Withdrawal
                            </button>



                        </div>

                    </div>

                    <div className='grid grid-rows-3 sm:grid-cols-3 place-items-start sm:place-items-center justify-center gap-4 w-full'>
                        {/* Withdrawal Approved */}
                        <span className='flex flex-row sm:flex-col gap-4 w-full items-center justify-center'>
                            <h3 className='text-gray-primary font-light text-xl text-start sm:text-center w-full '>Approved</h3>
                            <p className='text-red-parrafo font-normal text-xl text-end sm:text-center w-full '>
                                {parseFloat(user?.Withdrawal).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                })}
                            </p>
                        </span>
                        {/* Withdrawal Pending  */}
                        <span className='flex flex-row sm:flex-col gap-4 w-full items-center justify-center'>
                            <h3 className='text-gray-primary font-light text-xl text-start sm:text-center w-full '>Pending</h3>
                            <p className='text-red-parrafo font-normal text-xl text-end sm:text-center w-full '>
                                {parseFloat(user?.Balance).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                })}
                            </p>
                        </span>
                        {/* Withdrawal Paid*/}
                        <span className='flex flex-row sm:flex-col gap-4 w-full items-center justify-center'>
                            <h3 className='text-gray-primary font-light text-xl text-start sm:text-center w-full '>Paid</h3>
                            <p className='text-red-parrafo font-normal text-xl text-end sm:text-center w-full '>
                                {parseFloat(sumWithdrawals).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                })}
                            </p>
                        </span>
                    </div>

                    {/* REQUEST LOADING */}
                    {
                        loader && (
                            <RequestLoader />
                        )
                    }
                    <span className='text-green-radored text-center'>Minimum Reinvestment amount is $20 USD</span>

                    {/* REINVEST BUTTON */}
                    <div className='flex flex-col items-center justify-center w-full gap-6'>
                        <button
                            type='button'
                            className={`${styles.bggradienttoorange} 
                            ${!invalid ?
                                    'cursor-pointer hover:bg-black-login_button' : 'cursor-not-allowed bg-red-warning'} 
                            rounded-md p-4 px-14 text-white-normal text-semibold text-xl sm:text-2xl active:transform active:scale-95 `}
                            onClick={() => makeReinvest()}
                            disabled={invalid}
                        >
                            Reinvest & Keep Earning
                        </button>
                    </div>


                </div>
            </div>


            {
                open && (
                    <WithdrawalModal
                        open={open}
                        closeModal={closeModal}
                        user={user}
                        toggleModal={toggleModal}
                        withdrawalAmount={Number(withdrawalAmount)}
                        setWithdrawalAmount={setWithdrawalAmount}
                        withdrawalAmountError={withdrawalAmountError}
                        isInvalid={isInvalid}
                        makeWithdrawalRequest={makeWithdrawalRequest}
                        loader={loader}
                        loaderError={loaderError}
                    />
                )
            }
        </>
    )
}

export default WithdrawalInformation

WithdrawalInformation.propTypes = {
    makeWithdrawalRequest: PropTypes.func.isRequired,
    makeReinvest: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    theme: PropTypes.object,
    loader: PropTypes.bool,
    loaderError: PropTypes.string,
    isInvalid: PropTypes.bool.isRequired,
    setWithdrawalAmount: PropTypes.func.isRequired,
    withdrawalAmount: PropTypes.number,
    withdrawalAmountError: PropTypes.string,
}