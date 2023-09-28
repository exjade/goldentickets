import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/countdown.module.css';
import useHourlyCountdown from './hooks/Hourly-countdown/use-hourlyCountdown';

const DrawCountDown = () => {

    const {
        days,
        hours,
        minutes,
        seconds,
    } = useHourlyCountdown()


    return (
        <div className={`${styles.container}`} >
            <div className={`${styles.wrapper}`} >

                <span className={`${styles.countdownTitle}`} >Draw ends in</span>

                <div className={`${styles.countdown}`} >

                    {/* DAYS */}
                    <div className={`${styles.numberWrapper}`}>
                        <div className={`${styles.numbers}`} >

                            <span className={`${styles.numberBox}`}>
                                <p> {days[0]} </p>
                            </span>
                            <span className={`${styles.numberBox}`}>
                                <p> {days[1]} </p>
                            </span>
                        </div>
                        <h3>Days</h3>

                    </div>

                    {/* HOURS */}
                    <div className={`${styles.numberWrapper}`}>
                        <div className={`${styles.numbers}`} >

                            <span className={`${styles.numberBox}`}>
                                <p> {hours[0]} </p>
                            </span>
                            <span className={`${styles.numberBox}`}>
                                <p> {hours[1]} </p>
                            </span>
                        </div>
                        <h3>Hours</h3>
                    </div>


                    {/* Minutes */}
                    <div className={`${styles.numberWrapper}`}>
                        <div className={`${styles.numbers}`} >

                            <span className={`${styles.numberBox}`}>
                                <p> {minutes[0]} </p>
                            </span>
                            <span className={`${styles.numberBox}`}>
                                <p> {minutes[1]} </p>
                            </span>
                        </div>
                        <h3>Minutes</h3>
                    </div>

                    {/* Seconds */}
                    <div className={`${styles.numberWrapper}`}>
                        <div className={`${styles.numbers}`} >

                            <span className={`${styles.numberBox}`}>
                                <p> {seconds[0]} </p>
                            </span>
                            <span className={`${styles.numberBox}`}>
                                <p> {seconds[1]} </p>
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