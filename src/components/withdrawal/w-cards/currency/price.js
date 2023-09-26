import React from 'react'
import PropTypes from 'prop-types'

const PriceInput = ({
    setWithdrawalAmount,
    withdrawalAmount
}) => {
    return (
        <>

            <div className='w-[30%] sm:w-[20%] mb-12'>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">
                            $
                        </span>
                    </div>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        className="focus:ring-gray-login_input_bg border-l border-b border-t border-gray-login_input_bg py-8 px-6
                         focus:border-gray-login_input_bg block w-full pl-7 pr-12 text-center text-2xl sm:text-2xl rounded-md p-5"
                        placeholder="0.00"
                        value={withdrawalAmount}
                        onChange={(e) => setWithdrawalAmount(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                        <label htmlFor="currency" className="sr-only">
                            Currency
                        </label>
                        <select
                            id="Currency"
                            name="currency"
                            className="focus:ring-indigo-500 py-2 px-4 border-t border-r border-gray-300 border-b bo focus:border-indigo-500 h-full pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-r-md">
                            <option
                                aria-readonly
                            >
                                USD
                            </option>
                        </select>
                    </div>
                </div>
            </div>

        </>
    )
}

export default PriceInput

PriceInput.propTypes = {
    setWithdrawalAmount: PropTypes.func,
    withdrawalAmount: PropTypes.number,
}