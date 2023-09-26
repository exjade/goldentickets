import React from 'react';
import PropTypes from 'prop-types';

const Index = ({ setWithdrawalTab, withdrawalTab }) => {
    return (

        <ul className="flex flex-wrap text-xl font-medium text-center text-gray-adminParagraph bg-white-normal w-full items-center justify-center gap-10">
            <div className="mr-2">
                <button
                    className={`${withdrawalTab.withdrawal ? 'text-white-normal bg-badges-diamond' : 'text-black-normal bg-transparent' } inline-block p-4 rounded-t-lg active `}
                    onClick={() => setWithdrawalTab({ withdrawal: true, reinvestment: false })}
                >
                    Withdrawals
                </button>
            </div>
            <div className="mr-2">
                <button
                    className={`${withdrawalTab.reinvestment ? 'text-white-normal bg-badges-model' : 'text-black-normal bg-transparent' } inline-block p-4 rounded-t-lg`}
                    onClick={() => setWithdrawalTab({ withdrawal: false, reinvestment: true })}
                >
                    Reinvestments
                </button>
            </div>

        </ul>

    );
};
export default Index;

Index.propTypes = {
    setWithdrawalTab: PropTypes.func.isRequired,
    withdrawalTab: PropTypes.object.isRequired,
};
