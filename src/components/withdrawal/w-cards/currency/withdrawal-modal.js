import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../../../styles/modules/withdrawal/withdrawal.module.css';
import RequestLoader from '../../loader/request-loader';

function WithdrawalModal({
    closeModal,
    user,
    withdrawalAmount,
    setWithdrawalAmount,
    withdrawalAmountError,
    isInvalid,
    makeWithdrawalRequest,
    loader,
    loaderError,
}) {

    const invalid = user?.Withdrawal < 20 || user?.bankInformationTether?.Wallet === '' || parseInt(withdrawalAmount) < 19;

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black-background text-white-normal z-50">
            <div className="bg-white-primary w-10/12 xl:w-1/3  h-auto sm:h-6/12 py-10 p-6 rounded-lg shadow-xl flex flex-col items-center justify-around gap-8">
                {/* TITLE */}
                <h3 className="text-black-normal font-bold mb-4 uppercase text-center">Withdraw Investment</h3>


                <div className="flex flex-col items-center justify-around ">
                    {/* AMOUNT LABEL */}
                    <label className="block text-black-normal font-bold mb-2" htmlFor="amount">
                        Available Withdrawal:
                    </label>
                    {/* MONEY INPUT */}
                    <input
                        className="border p-2 rounded text-black-textBg font-xl text-xl"
                        type="number"
                        id="amount"
                        value={user?.Withdrawal - withdrawalAmount}
                        readOnly
                    />
                </div>


                <div className="flex flex-col items-center justify-around ">
                    {/* AMOUNT LABEL */}
                    <label className="block text-black-normal font-bold mb-2" htmlFor="amount">
                        Amount:
                    </label>
                    {/* MONEY INPUT */}
                    <input
                        className="border p-2 rounded text-black-textBg font-xl text-xl"
                        type="number"
                        id="amount"
                        value={withdrawalAmount}
                        onChange={(e) => setWithdrawalAmount(e.target.value)}
                    />
                </div>

                <span className='text-green-radored'>Minimum withdrawal amount is $20 USD</span>

                {/* ERRORS */}
                {
                    withdrawalAmountError || parseInt(user?.Withdrawal) < 20 || parseInt(withdrawalAmount) < 20 && (
                        <>
                            <p className='text-2xl font-semibold text-red-warning break-normal text-center'>
                                {withdrawalAmountError}
                            </p>
                        </>
                    )
                }

                {
                    loaderError !== '' && (
                        <p className='font-bold text-red-warning text-lg mb-8'>{loaderError}</p>
                    )
                }

                {/* REQUEST LOADING */}
                {
                    loader && (
                        <RequestLoader />
                    )
                }

                {/* BUTTONS */}
                <div className='grid grid-rows-2 xl:grid-cols-2 place-items-center justify-center gap-3 w-2/3 p-10 sm:p-5 '>

                    {
                        !isInvalid ?
                            (
                                <button
                                    className={`${styles.bggradienttoorange} 
                                    ${user?.Withdrawal >= 20 && user?.bankInformationTether?.Wallet !== '' ? 'cursor-pointer hover:bg-black-login_button' : 'cursor-not-allowed'} 
                                        hover:bg-blue-teal text-white font-bold py-4 px-6 rounded-md active:transform active:scale-95 w-44 `}
                                    disabled={invalid}
                                    onClick={() => makeWithdrawalRequest()}
                                >
                                    Withdraw
                                </button>
                            )
                            :
                            (
                                <button
                                    className={`${styles.bggradienttoorange}
                                ${user?.Withdrawal <= 20 &&
                                            user?.bankInformationTether?.Wallet !== '' ?
                                            'cursor-not-allowed hover:bg-red-warning' : 'cursor-pointer'}
                                hover:bg-blue-teal text-white font-bold py-4 px-6 rounded-md active:transform active:scale-95 w-44 `}
                                    disabled
                                >
                                    Withdraw
                                </button>
                            )
                    }



                    <button
                        className="bg-gray-button hover:bg-green-button text-white-normal text-white font-bold py-4 px-6 rounded-md active:transform active:scale-95 w-44 "
                        onClick={() => closeModal()}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default WithdrawalModal;

WithdrawalModal.propTypes = {
    user: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    toggleModal: PropTypes.func.isRequired,
    setWithdrawalAmount: PropTypes.func.isRequired,
    withdrawalAmount: PropTypes.number,
    withdrawalAmountError: PropTypes.string,
    isInvalid: PropTypes.bool,
    makeWithdrawalRequest: PropTypes.func.isRequired,
    loader: PropTypes.bool,
    loaderError: PropTypes.string,
}