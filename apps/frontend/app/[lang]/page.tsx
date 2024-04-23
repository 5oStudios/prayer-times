import { HadithSection } from '../../sections/hadith';
import { PrayerTimesSection } from '../../sections/times';
import { SupportedLanguages } from '../i18n/dictionaries';

export default async function MainPage({
  params: { lang },
}: {
  params: { lang: SupportedLanguages };
}) {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        background: 'linear-gradient(180deg, #FFC371 0%, #FF5F6D 100%)',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          bottom: '18px',
        }}
      >
        <PrayerTimesSection lang={lang} />
        <HadithSection lang={lang} />
      </div>
    </div>
  );
}
