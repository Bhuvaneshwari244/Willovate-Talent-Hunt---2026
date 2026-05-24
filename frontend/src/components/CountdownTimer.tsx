import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

export default function CountdownTimer({ endDate }: { endDate: string }) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const updateTimer = () => {
      try {
        setTimeLeft(formatDistanceToNow(new Date(endDate), { addSuffix: true }));
      } catch {
        setTimeLeft('Expired');
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, [endDate]);

  return <span>Ends {timeLeft}</span>;
}
