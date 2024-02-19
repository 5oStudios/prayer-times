'use client';
import { Link } from '@nextui-org/link';
import { Snippet } from '@nextui-org/snippet';
import { Code } from '@nextui-org/code';
import { button as buttonStyles } from '@nextui-org/theme';
import { subtitle, title } from '../components/primitives';
import { siteConfig } from '../config/site';
import { GithubIcon } from '../components/icons';
import { AzkarClient } from '@islamic-kit/azkar';
import { HadithClient } from '@islamic-kit/hadith';
import { PrayerTimesClient } from '@islamic-kit/prayer-times';

export default function Home() {
  const onlineClient = new PrayerTimesClient({
    strategy: 'ONLINE',
    region: 'Egyptian_General_Authority_of_Survey',
    school: 'HANAFI',
  });
  onlineClient
    .getTimings({
      date: new Date(),
      coordinates: { latitude: 31.111704, longitude: 29.790397 },
    })
    .then((onlineTimings) => {
      console.log('Online timings:', onlineTimings);
    });

  const offlineClient = new PrayerTimesClient({
    strategy: 'OFFLINE',
    region: 'Egyptian',
    school: 'HANAFI',
  });
  offlineClient
    .getTimings({
      date: new Date(),
      coordinates: { latitude: 31.111704, longitude: 29.790397 },
    })
    .then((offlineTimings) => {
      console.log('Offline timings:', offlineTimings);
    });

  const hadithClient = new HadithClient({
    language: 'ARABIC',
  });
  hadithClient.getCategoryRoots().then((categories) => {
    console.log('Categories:', categories);
  });
  hadithClient
    .getHadithList({ categoryId: 1, page: 1, perPage: 10 })
    .then((hadith) => {
      console.log('Hadith:', hadith);
    });

  const azkarClient = new AzkarClient();
  console.log(azkarClient.morningRemembrances());
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Make&nbsp;</h1>
        <h1 className={title({ color: 'violet' })}>beautiful&nbsp;</h1>
        <br />
        <h1 className={title()}>
          websites regardless of your design experience.
        </h1>
        <h2 className={subtitle({ class: 'mt-4' })}>
          Beautiful, fast and modern React UI library.
        </h2>
      </div>

      <div className="flex gap-3">
        <Link
          isExternal
          href={siteConfig.links.docs}
          className={buttonStyles({
            color: 'primary',
            radius: 'full',
            variant: 'shadow',
          })}
        >
          Documentation
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: 'bordered', radius: 'full' })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>

      <div className="mt-8">
        <Snippet hideSymbol hideCopyButton variant="flat">
          <span>
            Get started by editing <Code color="primary">app/page.tsx</Code>
          </span>
        </Snippet>
      </div>
    </section>
  );
}
