import React from 'react';

const ArabicDate = () => {
  // Create a new date object for the current date
  const date = new Date();

  // Use the Intl.DateTimeFormat API to format the date in Arabic
  const arabicDate = new Intl.DateTimeFormat('ar-EG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  }).format(date);

  return <div className="qobtic-date">{arabicDate}</div>;
};

export default ArabicDate;
