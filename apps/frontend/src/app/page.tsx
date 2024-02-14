'use client';
import { Link } from '@nextui-org/link';
import { Snippet } from '@nextui-org/snippet';
import { Code } from '@nextui-org/code';
import { button as buttonStyles } from '@nextui-org/theme';
import { subtitle, title } from '../components/primitives';
import { siteConfig } from '../config/site';
import { GithubIcon } from '../components/icons';
import { PrayerTimesClient } from 'prayer-times';
import { Strategies } from '../../../../libs/prayer-times/src/interfaces/strategies.interface';
import { Schools } from '../../../../libs/prayer-times/src/interfaces/schools.interface';

export default function Home() {
  // const test = DefaultService.getCalendar({
  //   year: 2022,
  //   month: 1,
  //   latitude: 31.111704,
  //   longitude: 29.790397,
  // });
  // console.log(
  //   test.then((res) => {
  //     const data = res.data;
  //     data.forEach((item) => {
  //       console.log(item.timings);
  //     });
  //   })
  // );
  //

  const onlineClient = new PrayerTimesClient({
    strategy: Strategies.ONLINE,
    region: 'Egyptian',
    school: Schools.HANAFI,
  });
  const onlineTimingsPromise = onlineClient.getTimings({
    date: new Date(),
    coordinates: { latitude: 31.111704, longitude: 29.790397 },
  });

  onlineTimingsPromise
    .then((onlineTimings: any) => {
      console.log(onlineTimings);
    })
    .catch((error) => {
      console.error('Error fetching online timings:', error);
    });

  const offlineClient = new PrayerTimesClient({
    strategy: Strategies.OFFLINE,
    region: 'Egyptian',
    school: Schools.HANAFI,
  });
  const timingsOffline = offlineClient.getTimings({
    date: new Date(),
    coordinates: { latitude: 31.111704, longitude: 29.790397 },
  });
  console.log(timingsOffline);

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
