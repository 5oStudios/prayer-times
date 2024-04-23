import { Card } from '@mantine/core';
import localFont from 'next/font/local';

const font = localFont({ src: '../../assets/fonts/ReemKufi-Regular.ttf' });

export const PrayerTimesCard = ({
  prayer,
}: {
  prayer: {
    name: string;
    time: string;
    remaining: string;
    isNext: boolean;
  };
}) => (
  <Card
    className={font.className}
    style={{
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: 18,
      paddingInline: 40,
      paddingBlock: 20,
      fontSize: 50,
      textAlign: 'center',
    }}
  >
    <div>{prayer.name}</div>
    <div>{prayer.time}</div>
  </Card>
);
