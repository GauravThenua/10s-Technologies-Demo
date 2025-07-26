import React, { useEffect } from 'react';

const ResetShortcut = () => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'r') {
        e.preventDefault();
        alert('Reset shortcut triggered!');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return null;
};

export default ResetShortcut;
