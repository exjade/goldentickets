import { useState, useEffect } from 'react';
import useWeeklyLottery from '../../../../../hooks/draw/weekly-prize/use-weeklyPrize';

export default function useHourlyCountdown() {

  const { loterry } = useWeeklyLottery()


  const [timeRemaining, setTimeRemaining] = useState(null);
  const [days, setDays] = useState([0, 0]);
  const [hours, setHours] = useState([0, 0]);
  const [minutes, setMinutes] = useState([0, 0]);
  const [seconds, setSeconds] = useState([0, 0]);


  useEffect(() => {
    function countdownAndRestart() {
      const now = new Date();
      const nextFriday = new Date(now);

      // Avanzar al próximo viernes
      nextFriday.setDate(now.getDate() + ((5 - now.getDay() + 7) % 7));
      nextFriday.setHours(20, 0, 0, 0); // Establecer a las 8 PM

      const interval = 1000; // Actualizar cada segundo

      const countdownInterval = setInterval(() => {
        const currentTime = new Date().getTime();
        const timeDiff = nextFriday - currentTime;

        if (timeDiff <= 0) {
          clearInterval(countdownInterval);
          console.log('Reiniciando para el próximo viernes a las 8 PM.');
          countdownAndRestart();
        } else {
          setTimeRemaining(timeDiff);
        }
      }, interval);
    }

    countdownAndRestart();

    return () => clearInterval(countdownAndRestart);
  }, [loterry]);

  useEffect(() => {
    if (timeRemaining !== null) {
      const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hoursRemaining = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
      const minutesRemaining = Math.floor((timeRemaining / (1000 * 60)) % 60);
      const secondsRemaining = Math.floor((timeRemaining / 1000) % 60);

      const daysArray = formatDigit(daysRemaining).split('');
      const hoursArray = formatDigit(hoursRemaining).split('');
      const minutesArray = formatDigit(minutesRemaining).split('');
      const secondsArray = formatDigit(secondsRemaining).split('');

      if (daysArray.length === 1) {
        setDays([0, Number(daysArray[0])]);
      } else if (daysArray.length === 2) {
        setDays([Number(daysArray[0]), Number(daysArray[1])]);
      }

      if (hoursArray.length === 1) {
        setHours([0, Number(hoursArray[0])]);
      } else if (hoursArray.length === 2) {
        setHours([Number(hoursArray[0]), Number(hoursArray[1])]);
      }

      if (minutesArray.length === 1) {
        setMinutes([0, Number(minutesArray[0])]);
      } else if (minutesArray.length === 2) {
        setMinutes([Number(minutesArray[0]), Number(minutesArray[1])]);
      }

      if (secondsArray.length === 1) {
        setSeconds([0, Number(secondsArray[0])]);
      } else if (secondsArray.length === 2) {
        setSeconds([Number(secondsArray[0]), Number(secondsArray[1])]);
      }
    }
  }, [timeRemaining]);

  const formatDigit = (value) => (value < 10 ? `0${value}` : value.toString());

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}
