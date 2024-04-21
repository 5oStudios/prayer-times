'use client';

import { HadithSection } from '../sections/hadith';
import { PrayerTimesSection } from '../sections/prayer-times';

export default function HomePage() {
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
        <PrayerTimesSection />
        <HadithSection />
      </div>
    </div>
  );
}
