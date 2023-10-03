import React from 'react';
import PropTypes from 'prop-types';
import Wallet from './modal';
import DropDownUserHeader from './dropdown/user-header';

const Timeline = (props) => {


    return (
        <>
            {
                props.open && (
                    <>
                        <Wallet
                            closeModal={props.closeModal}
                        />
                    </>
                )
            }
            
            <DropDownUserHeader />

        </>
    )
}

export default Timeline

Timeline.whyDidYouRender = true

Timeline.propTypes = {
    open: PropTypes.bool,
    closeModal: PropTypes.func,
}