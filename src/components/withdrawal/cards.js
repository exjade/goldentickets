import PropTypes from 'prop-types'
import Error from '../../error/error'
// import Card from './w-cards/card'
// import LeftSideCard from './w-cards/left-side-card'
// import RightSideCard from './w-cards/right-side-card'
// currencies
// import TetherCurrency from './w-cards/currency/tetherCurrency'
// import RadoredCard from './w-cards/currency/RadoredCard'
import WithdrawalInformation from './w-cards/currency/withdrawal-information'

const CardsComponent = ({
    makeWithdrawalRequest,
    makeReinvest,
    user,
    loader,
    loaderError,
    isInvalid,
    // currency,
    withdrawalAmountError,
    setWithdrawalAmount,
    withdrawalAmount
}) => {
    return (
        <>
            <div className='flex flex-row justify-center items-center w-full'>

                <Error>

                    {/* <LeftSideCard /> */}
                    {/* {
                        currency?.currencies !== 'TETHER'
                        && (
                            <RadoredCard />
                        )
                    }
                    {
                        currency?.currencies === 'TETHER' && ( */}
                            <>
                                <WithdrawalInformation
                                    makeWithdrawalRequest={makeWithdrawalRequest}
                                    makeReinvest={makeReinvest}
                                    user={user}
                                    loader={loader}
                                    loaderError={loaderError}
                                    isInvalid={isInvalid}
                                    withdrawalAmountError={withdrawalAmountError}
                                    withdrawalAmount={Number(withdrawalAmount)}
                                    setWithdrawalAmount={setWithdrawalAmount}
                                />
                            </>
                        {/* )
                    } */}
                    {/* </div> */}
                    {/* <RightSideCard /> */}
                </Error>
            </div>
        </>
    )
}

export default CardsComponent

CardsComponent.propTypes = {
    makeWithdrawalRequest: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    loader: PropTypes.bool.isRequired,
    loaderError: PropTypes.string,
    isInvalid: PropTypes.bool.isRequired,
    currency: PropTypes.object,
    setWithdrawalAmount: PropTypes.func.isRequired,
    withdrawalAmountError: PropTypes.string,
    withdrawalAmount: PropTypes.number,
    makeReinvest: PropTypes.func

}

{/* <TetherCurrency
                                    makeWithdrawalRequest={makeWithdrawalRequest}
                                    makeReinvest={makeReinvest}
                                    user={user}
                                    loader={loader}
                                    loaderError={loaderError}
                                    isInvalid={isInvalid}
                                    withdrawalAmountError={withdrawalAmountError}
                                    setWithdrawalAmount={setWithdrawalAmount}
                                    withdrawalAmount={withdrawalAmount}
                                /> */}