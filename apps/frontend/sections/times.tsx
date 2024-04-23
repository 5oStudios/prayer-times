'use client';

import { Card, Flex } from '@mantine/core';
import { Reem_Kufi } from 'next/font/google';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTimes, selectTimes, selectTimesStatus } from '../lib/features/times';

const font = Reem_Kufi({
  subsets: ['arabic'],
});

export const PrayerTimesSection = ({ lang }: { lang: string }) => {
  // const dict = getDictionary(lang);
  const times = useSelector(selectTimes);
  const timesStatus = useSelector(selectTimesStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-expect-error - This expression is not callable.
    if (timesStatus === 'idle') dispatch(fetchTimes());
  }, [dispatch, timesStatus]);

  console.log('times', times);

  return (
    <Flex align="center" justify="space-evenly" gap="md">
      {times?.map(({ name, time }) => <PrayerTimesCard key={name} prayer={{ name, time }} />)}
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
