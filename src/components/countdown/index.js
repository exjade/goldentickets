import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/countdown.module.css';

const DrawCountDown = () => {
    return (
        <div className={`${styles.container}`} >
            <div className={`${styles.wrapper}`} >

                <span className={`${styles.countdownTitle}`} >Draw ends in</span>

                <div className={`${styles.countdown}`} >

                    {/* DAYS */}
                    <div className={`${styles.numberWrapper}`}>
                        <div className={`${styles.numbers}`} >

                            <span className={`${styles.numberBox}`}>
                                <p>0</p>
                            </span>
                            <span className={`${styles.numberBox}`}>
                                <p>1</p>
                            </span>
                        </div>
                        <h3>Days</h3>

                    </div>

                    {/* HOURS */}
                    <div className={`${styles.numberWrapper}`}>
                        <div className={`${styles.numbers}`} >

                            <span className={`${styles.numberBox}`}>
                                <p>1</p>
                            </span>
                            <span className={`${styles.numberBox}`}>
                                <p>5</p>
                            </span>
                        </div>
                        <h3>Hours</h3>
                    </div>


                    {/* Minutes */}
                    <div className={`${styles.numberWrapper}`}>
                        <div className={`${styles.numbers}`} >

                            <span className={`${styles.numberBox}`}>
                                <p>4</p>
                            </span>
                            <span className={`${styles.numberBox}`}>
                                <p>6</p>
                            </span>
                        </div>
                        <h3>Minutes</h3>
                    </div>

                    {/* Seconds */}
                    <div className={`${styles.numberWrapper}`}>
                        <div className={`${styles.numbers}`} >

                            <span className={`${styles.numberBox}`}>
                                <p>3</p>
                            </span>
                            <span className={`${styles.numberBox}`}>
                                <p>3</p>
                            </span>
                        </div>
                        <h3>Seconds</h3>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default DrawCountDown

DrawCountDown.propTypes = {

}