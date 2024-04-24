'use client';

import { Azkar, AzkarClient } from '@islamic-kit/azkar';
import { useEffect, useState } from 'react';

const azkarClient = new AzkarClient();

export const AzkarSection = () => {
  const [azkar, setAzkar] = useState<Azkar[] | null>(null);

  useEffect(() => {
    const fetchData = () => {
      const azkarData = azkarClient.eveningRemembrances();
      setAzkar(azkarData);
    };

    fetchData();
  }, []);

  if (!azkar) {
    return (
      <>
        <div>Loading...</div>
      </>
    );
  }
  const randomAzkar = azkar[Math.floor(Math.random() * azkar.length)];

  return <>{randomAzkar.content}</>;
};
