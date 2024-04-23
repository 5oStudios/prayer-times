'use client';

import { Card, Flex } from '@mantine/core';
import { Reem_Kufi } from 'next/font/google';
import { PrayerTimesClient } from '@islamic-kit/prayer-times';
import { useEffect, useState } from 'react';

const font = Reem_Kufi({
  subsets: ['arabic'],
});

export const PrayerTimesSection = () => {
  const [prayers, setPrayers] = useState({
    faajr: '',
    dhuhr: '',
    asr: '',
    maghrib: '',
    isha: '',
  });
  const prayerTimesClient = new PrayerTimesClient({
    school: 'HANAFI',
    region: 'Egyptian_General_Authority_of_Survey',
    strategy: 'ONLINE',
  });

  useEffect(() => {
    prayerTimesClient
      .getTimings({
        date: new Date(),
        coordinates: {
          latitude: 30.0444,
          longitude: 31.2357,
        },
      })
      .then((data) => {
        setPrayers(data as any);
      });
  }, []);

  console.log(prayers);

  return (
    <Flex align="center" justify="space-evenly" gap="md">
      {Object.entries(prayers).map(([name, time]) => (
        <PrayerTimesCard key={name} prayer={{ name, time }} />
      ))}
    </Flex>
  );
};

const PrayerTimesCard = ({
  prayer,
}: {
  prayer: {
    name: string;
    time: string;
  };
}) => (
  <Card
    className={font.className}
    style={{
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: 10,
      padding: 50,
      fontSize: 50,
      textAlign: 'center',
    }}
  >
    <div>{prayer.name}</div>
    <div>{prayer.time}</div>
  </Card>
);
