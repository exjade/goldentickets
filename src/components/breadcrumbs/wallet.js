import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/wallet.module.css';
import useBreadcrumbs from '../../hooks/use-breakcrumbs';

const Breadcrumbwallet = (props) => {

    const { state, setState } = useBreadcrumbs()

    return (
        <div className={`${styles.container}`} >
            <div className={`${styles.wrapper}`} >
                <button
                    type='button'
                    className={`${state.stateOne ? `${styles.breadcrumActive}` : `${styles.breadcrumBg}`}  `}
                    onClick={() => setState({
                        stateOne: true,
                        stateTwo: false,
                        stateThree: false,
                    })}
                >
                    <span className="material-symbols-outlined text-blue-button ">
                        {props.iconOne}
                    </span>
                    <p className='hidden md:inline'>{props.textOne}</p>
                </button>
                <button
                    type='button'
                    className={`${state.stateTwo ? `${styles.breadcrumActive}` : `${styles.breadcrumBg}`}  `}
                    onClick={() => setState({
                        stateOne: false,
                        stateTwo: true,
                        stateThree: false,
                    })}
                >
                    <span className="material-symbols-outlined text-gray-text ">
                        {props.iconTwo}
                    </span>
                    <p className='hidden md:inline'>{props.textTwo}</p>
                </button>
                <button
                    type='button'
                    className={`${state.stateThree ? `${styles.breadcrumActive}` : `${styles.breadcrumBg}`} `}
                    onClick={() => setState({
                        stateOne: false,
                        stateTwo: false,
                        stateThree: true,
                    })}
                >
                    <span className="material-symbols-outlined text-gray-text ">
                        {props.iconThree}
                    </span>
                    <p className='hidden md:inline'>{props.textThree}</p>
                </button>
            </div>

            <button
                type='button'
                className={`${styles.close}`}
                onClick={() => props.closeModal()}
            >
                <span className="material-symbols-outlined">
                    close
                </span>
            </button>
        </div>
    )
}

export default Breadcrumbwallet

Breadcrumbwallet.propTypes = {
    iconOne: PropTypes.any,
    textOne: PropTypes.string,
    iconTwo: PropTypes.any,
    textTwo: PropTypes.string,
    iconThree: PropTypes.any,
    textThree: PropTypes.string,
    closeModal: PropTypes.func,
}