import React, { useEffect, useState } from 'react';

const Timer = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="text-sm text-gray-700">{time.toLocaleTimeString()}</div>
  );
};

export default Timer;
