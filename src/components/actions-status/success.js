import React from 'react';
import PropTypes from 'prop-types'
import styles from './styles/actions-status.module.css'
import {
    InformationCircleIcon
} from '@heroicons/react/24/outline';


const ActionSuccess = (props) => {
    return (
        <div className={`${styles.successContainer}`} >
            <div className={`${styles.successwrapper}`} >
                <span className={`${styles.successIcon}`}>
                    < InformationCircleIcon className='w-6 h-6 text-white-normal' />
                </span>

                <div className={`${styles.successMessage}`}>
                    <p className='font-extrabold text-xs'>Success</p>
                    <p className='font-light text-xs'>
                         Your {props.action} has been successfully copied.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ActionSuccess

ActionSuccess.propTypes = {
    action: PropTypes.string,
}