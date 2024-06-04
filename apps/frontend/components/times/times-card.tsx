import { Card } from '@mantine/core';
import localFont from 'next/font/local';
import moment from 'moment/moment';
import { Coordinates } from '@islamic-kit/prayer-times';
import Countdown from 'react-countdown';
import { publish } from '@enegix/events';
import 'moment/locale/ar';

const font = localFont({ src: '../../assets/fonts/ReemKufi-Regular.ttf' });

function formatTime(milliseconds: number) {
  // make it dynamic
  moment.locale('ar');
  return moment(milliseconds).utcOffset(0).format('HH:mm:ss');
}

export const PrayerTimesCard = ({
  prayer,
  coordinates,
}: {
  prayer: {
    name: string;
    time: string;
    remaining: number;
    isNext: boolean;
  };
  coordinates: Coordinates | null;
}) => (
  <Card className={`prayer-card ${font.className} ${prayer.isNext ? 'active-prayer' : ''} `}>
    {prayer.isNext && (
      <>
        <div className="next-prayer-alert">الصلاة التالية</div>
        <div className="remaining-timer">
          <Countdown
            date={formatTime(Date.now() + prayer.remaining)}
            daysInHours
            onComplete={() => publish('next-prayer', prayer)}
          />
        </div>
      </>
    )}
    <div className="prayer-name">{prayer.name}</div>
    <div className="remaining-timer vrLayout">
      {prayer.isNext && (
        <Countdown
          date={formatTime(Date.now() + prayer.remaining)}
          daysInHours
          onComplete={() => publish('next-prayer', prayer)}
        />
      )}
    </div>
    <div className="prayer-time">{formatTime(Number(prayer.time))}</div>
  </Card>
);
