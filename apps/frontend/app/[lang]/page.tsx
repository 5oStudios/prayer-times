import { HadithSection } from '../../sections/hadith';
import { PrayerTimesSection } from '../../sections/times';
import { SupportedLanguages } from '../i18n/dictionaries';
import background from '../../assets/images/gray-bg.jpg';
import '../../assets/css/global.css';
import { AzkarSection } from '../../sections/azkar';
import { ClockSection } from '../../sections/clock';
import HijriDateSection from '../../sections/date';
import ArabicDate from '../../components/dates/date-card';

export default async function MainPage({
  params: { lang },
}: {
  params: { lang: SupportedLanguages };
}) {
  return (
    <>
      <div
        className="screen-wrapper theme-red"
      >
        <div className="dates">
          <HijriDateSection language={lang} />
          <ArabicDate />
        </div>
        <div className="mosquee-name">مسجد الرحمن</div>
        <ClockSection lang={lang} />
        <AzkarSection lang={lang} />
        <PrayerTimesSection lang={lang} />
        <div className="emam-name">إمام المسجد: الشيخ مشاري العفاسي</div>
        <div className="hadith-marquee">
          <HadithSection lang={lang} />
        </div>
      </div>
    </>
  );
}
