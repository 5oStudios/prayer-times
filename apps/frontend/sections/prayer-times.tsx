'use client';

import { Card, Flex } from '@mantine/core';
import { Reem_Kufi } from 'next/font/google';

const font = Reem_Kufi({
  subsets: ['arabic'],
});

export const PrayerTimesSection = () => {
  const prayers = [
    {
      title: 'Fajr',
      time: '5:00 AM',
    },
    {
      name: 'Dhuhr',
      time: '1:00 PM',
    },
    {
      name: 'Asr',
      time: '4:00 PM',
    },
    {
      name: 'Maghrib',
      time: '7:00 PM',
    },
    {
      name: 'Isha',
      time: '9:00 PM',
    },
  ];

  return (
    <Flex align="center" justify="space-evenly" gap="md">
      {prayers.map((prayer) => (
        <PrayerTimesCard prayer={prayer} />
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
