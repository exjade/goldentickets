import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next';
//styles
import styles from '../../../styles/modules/withdrawal/withdrawal.module.css';
import RequestLoader from '../loader/request-loader';

const ModalWithdrawal = ({
    handleCloseModal,
    updateWithdrawal,
    customerName,
    customerWallet,
    withdrawalId,
    withdrawalAmount,
    withdrawalStatus,
    setBlockchainURL,
    processing,
    withdrawalCurrency
}) => {
    const { t } = useTranslation()
    return (
        <>

            <dh-component>
                <div className="py-12 bg-white-primary transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
                    <div role="alert" className={` ${styles.centerModal} container mx-auto w-11/12 md:w-2/3 max-w-lg`} >
                        <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                            <div className={`${styles.svg}w-full flex justify-start text-white-normal mb-3 `} >
                                <span className="material-icons-outlined text-black-normal text-5xl">
                                    account_balance_wallet
                                </span>
                            </div>
                            <h1 className="text-black-normal font-lg font-bold tracking-normal leading-tight mb-4">{t('Enter Withdrawal Details')}</h1>
                            {/* Holder Name */}
                            <label htmlFor="HolderName" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">{t('Holder Name')}</label>
                            <input
                                id="HolderName"
                                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-bold w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                defaultValue={customerName}
                                disabled
                            />
                            {/* Bank Name */}
                            <label htmlFor="BankName" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">{t('Bank Name')}</label>
                            <input
                                id="BankName"
                                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-bold w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                defaultValue={withdrawalCurrency}
                                disabled
                            />

                            {/* Account Number */}
                            <label htmlFor="email2" className="text-gray-800 text-sm font-bold leading-tight 
                            tracking-normal">{t('Account Number')}</label>
                            <div className="relative mb-5 mt-2">
                                <div className="absolute text-gray-600 flex items-center px-4 border-r h-full">
                                    <span className="material-icons-outlined">
                                        credit_card
                                    </span>
                                </div>
                                <input
                                    id="email2"
                                    className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-semibold w-full h-10 flex items-center pl-16 text-sm border-gray-300 rounded border"
                                    defaultValue={customerWallet}
                                    disabled
                                />
                            </div>

                            {/* ID */}
                            <label htmlFor="expiry" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">{t('ID Code')}</label>
                            <div className="relative mb-5 mt-2">
                                <div className="absolute right-0 text-gray-600 flex items-center pr-3 h-full cursor-pointer">
                                    <span className="material-icons-sharp">
                                        fingerprint
                                    </span>
                                </div>
                                <input
                                    id="expiry"
                                    className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-semibold w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                    defaultValue={withdrawalId}
                                    disabled
                                />
                            </div>
                            {/* STATUS */}
                            <label htmlFor="status" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">{t('Withdrawal Status')}</label>
                            <div className="relative mb-5 mt-2">
                                <div className="absolute right-0 text-gray-600 flex items-center pr-3 h-full cursor-pointer">
                                    <span className="material-icons-sharp">
                                        receipt_long
                                    </span>
                                </div>
                                <input
                                    id="status"
                                    className="text-badges-gold font-semibold text-base focus:outline-none focus:border focus:border-indigo-700 w-full h-10 flex items-center pl-3 border-gray-300 rounded border"
                                    defaultValue={t(`${withdrawalStatus}`)}
                                    disabled
                                />
                            </div>
                            {/* AMOUNT */}
                            <label htmlFor="cvc" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">{t('Withdrawal Amount')}</label>
                            <div className="relative mb-5 mt-2">
                                <div className="absolute right-0 text-gray-600 flex items-center pr-3 h-full cursor-pointer">
                                    <span className="material-icons-sharp">
                                        attach_money
                                    </span>
                                </div>
                                <input
                                    id="cvc"
                                    className="mb-8 text-xl focus:outline-none focus:border focus:border-indigo-700 font-semibold w-full h-10 flex items-center pl-3 border-gray-300 rounded border"
                                    defaultValue={`$${parseFloat(withdrawalAmount).toFixed(2)}`}
                                    disabled
                                />
                            </div>
                            {/* FEE */}
                            <label htmlFor="cvc" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">{t('Withdrawal Fee')}</label>
                            <div className="relative mb-5 mt-2">
                                <div className="absolute right-0 text-gray-600 flex items-center pr-3 h-full cursor-pointer">
                                    <span className="material-icons-sharp">
                                        attach_money
                                    </span>
                                </div>
                                <input
                                    id="cvc"
                                    className="mb-8 text-xl focus:outline-none focus:border focus:border-indigo-700 font-semibold w-full h-10 flex items-center pl-3 border-gray-300 rounded border text-red-card"
                                    defaultValue={`$${parseFloat(withdrawalAmount * 0.05).toFixed(2)}`}
                                    disabled
                                />
                            </div>
                            {/* BLOCKCHAIN URL */}
                            <label htmlFor="blockchain" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">{t('Payment URL')}</label>
                            <div className="relative mb-5 mt-2">
                                <div className="absolute right-0 text-gray-600 flex items-center pr-3 h-full cursor-pointer">
                                    <span className="material-icons-sharp">
                                        link
                                    </span>
                                </div>
                                <input
                                    id="blockchain"
                                    className="text-badges-gold font-semibold text-base focus:outline-none focus:border focus:border-indigo-700 w-full h-10 flex items-center pl-3 border-gray-300 rounded border"
                                    onChange={(e) => setBlockchainURL(e.target.value)}
                                />
                            </div>
                            {
                                processing && (
                                    <RequestLoader />
                                )
                            }
                            {/* SUBMIT BUTTON */}
                            <div className="flex items-center justify-start w-full">
                                <button
                                    className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-blue-primary bg-blue-emblema rounded text-white-normal px-8 py-2 text-sm"
                                    onClick={() => updateWithdrawal()}
                                >
                                    {t('Submit')}
                                </button>
                                {/* CANCEL BUTTON */}
                                <button
                                    className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-info transition duration-150 text-white-normal ease-in-out hover:border-gray-400 hover:bg-gray-button border rounded px-8 py-2 text-sm"
                                    onClick={() => handleCloseModal()}
                                >
                                    {t('Cancel')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </dh-component>

        </>
    )
}

export default ModalWithdrawal

ModalWithdrawal.propTypes = {
    handleCloseModal: PropTypes.func,
    updateWithdrawal: PropTypes.func,
    customerName: PropTypes.string,
    customerWallet: PropTypes.string,
    withdrawalStatus: PropTypes.string,
    withdrawalAmount: PropTypes.number,
    withdrawalId: PropTypes.string,
    setBlockchainURL: PropTypes.func,
    processing: PropTypes.bool,
    withdrawal: PropTypes.object,
    withdrawalHolderName: PropTypes.string,
    withdrawalAccountNumber: PropTypes.string,
    withdrawalBankName: PropTypes.string,
    CustomerAgencia: PropTypes.string,
    CustomerChavePix: PropTypes.string,
    withdrawalCurrency: PropTypes.string,
}
