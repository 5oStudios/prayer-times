import { HadithSection } from '../../sections/hadith';
import { PrayerTimesSection } from '../../sections/times';
import { SupportedLanguages } from '../i18n/dictionaries';
import background from '../../assets/images/moon-light-bg.jpg';
import '../../assets/css/global.css';

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
      >
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
