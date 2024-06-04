import { Card } from '@mantine/core';
import localFont from 'next/font/local';
import moment from 'moment/moment';
import { Coordinates } from '@islamic-kit/prayer-times';
import Countdown from 'react-countdown';
import { publish } from '@enegix/events';
import 'moment/locale/ar';

const font = localFont({ src: '../../assets/fonts/ReemKufi-Regular.ttf' });

export const PrayerTimesCard = ({
  prayer,
  coordinates,
  lang,
}: {
  prayer: {
    name: string;
    time: string;
    remaining: number;
    isNext: boolean;
  };
  coordinates: Coordinates | null;
  lang: string;
}) => {
  const localizedTime = localTimer(prayer.time, lang);
  const counter = Date.now() + prayer.remaining;

  return (
    <Card className={`prayer-card ${font.className} ${prayer.isNext ? 'active-prayer' : ''} `}>
      {prayer.isNext && (
        <>
          <div className="next-prayer-alert">الصلاة التالية</div>
          <div className="remaining-timer">
            <Countdown
              date={counter}
              daysInHours
              renderer={({ formatted: { hours, minutes, seconds } }) =>
                countDownFormatter({ formatted: { hours, minutes, seconds }, lang })
              }
              onComplete={() => publish('next-prayer', prayer)}
            />
          </div>
        </>
      )}
      <div className="prayer-name">{prayer.name}</div>

      <div className="remaining-timer vrLayout">
        {prayer.isNext && (
          <Countdown
            date={counter}
            renderer={({ formatted: { hours, minutes, seconds } }) =>
              countDownFormatter({ formatted: { hours, minutes, seconds }, lang })
            }
            daysInHours
            onComplete={() => publish('next-prayer', prayer)}
          />
        )}
      </div>
      <div className="prayer-time">{localizedTime}</div>
    </Card>
  );
};

type CountDownFormatterProps = {
  formatted: {
    hours: string;
    minutes: string;
    seconds: string;
  };
  lang: string;
};

const countDownFormatter = ({
  formatted: { hours, minutes, seconds },
  lang,
}: CountDownFormatterProps) => (
  <div className="timer">
    {localNumber(parseInt(hours, 10), lang)}:{localNumber(parseInt(minutes, 10), lang)}:
    {localNumber(parseInt(seconds, 10), lang)}
  </div>
);

function localTimer(time: string, lang: string) {
  moment.locale(lang);
  const [hours, minutes] = time.split(':').map(Number);
  const timeInMilliseconds = (hours * 60 + minutes) * 60 * 1000;
  return moment(timeInMilliseconds).utcOffset(0).format('HH:mm');
}

export function localNumber(number: number, lang: string) {
  return new Intl.NumberFormat(lang).format(number);
}
