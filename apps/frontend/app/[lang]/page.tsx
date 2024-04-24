import { HadithSection } from '../../sections/hadith';
import { PrayerTimesSection } from '../../sections/times';
import { SupportedLanguages } from '../i18n/dictionaries';
import background from '../../assets/images/bg-3.jpeg';
import '../../assets/css/global.css';
import { AzkarSection } from '../../sections/azkar';
import { ClockSection } from '../../sections/clock';
import HijriDateSection from '../../sections/date';

export default async function MainPage({
  params: { lang },
}: {
  params: { lang: SupportedLanguages };
}) {
  return (
    <>
      <div
        style={{
          width: '100%',
          height: '100vh',
          position: 'relative',
          backgroundImage: `url(${background.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        className="theme-red"
      >
        <HijriDateSection language={lang} />
        <ClockSection lang={lang} />
        <AzkarSection lang={lang} />

        <PrayerTimesSection lang={lang} />

        <div
          style={{
            position: 'absolute',
            bottom: '18px',
          }}
        >
          <HadithSection lang={lang} />
        </div>
      </div>
    </>
  );
}
