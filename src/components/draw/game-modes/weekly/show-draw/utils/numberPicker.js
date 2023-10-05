import React, { useState, useEffect } from 'react';
import styles from '../css/draw.module.css';

const NumberPicker = () => {
    const nameArr = Array.from({ length: 100 }, (_, index) => index + 1);

    const nameArrLength = nameArr.length;
    const [isRunning, setIsRunning] = useState(false);
    const [randomName, setRandomName] = useState('');
    let intervalId;

    const handleStartStopClick = () => {
        if (isRunning) {
            clearInterval(intervalId);
            setIsRunning(false);
        } else {
            setIsRunning(true);
            intervalId = setInterval(() => {
                const random = Math.floor(Math.random() * nameArrLength);
                const randomName = nameArr[random];
                setRandomName(randomName);
            }, 10);
        }
    };

    useEffect(() => {

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }

            handleStartStopClick()
        };
    }, []);

    return (
        <div className={styles.numberPickerContainer}>
            <div className={`${styles.gname} g-name`} style={{ display: isRunning ? 'block' : 'none' }}>
                {randomName}
            </div>
        </div>
    );
};

export default NumberPicker;
