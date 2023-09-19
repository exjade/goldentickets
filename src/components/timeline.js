import React from 'react'
import PropTypes from 'prop-types'


const Timeline = () => {

    return (
       <></>
    )
}

export default Timeline

Timeline.propTypes = {
    coins: PropTypes.array,
    search: PropTypes.string,
    isOpen: PropTypes.bool,
    setIsOpen: PropTypes.func,
    theme: PropTypes.bool,
    setTheme: PropTypes.func,
    handleClose: PropTypes.func
}

Timeline.whyDidYouRender = true