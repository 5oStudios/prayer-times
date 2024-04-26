import { Coordinates, PrayerTime, Strategies } from '../interfaces';
import { Schools } from '../interfaces/schools.interface';
import { OfflineClient, OfflineClientProps } from '../strategies';
import { OnlineCalculationMethod } from '../strategies/online/aladhan/aladhan-api.strategy';
import { OfflineCalculationMethod } from '../strategies/offline/adhan/adhan-package.strategy';
import { prayerTimesAdapter } from '../adapter';
import { ITaskOptions, TaskTimer } from 'tasktimer';

interface CalculationMethod {
  ONLINE: OnlineCalculationMethod;
  OFFLINE: OfflineCalculationMethod;
}

export class PrayerTimesClient<T extends keyof typeof Strategies> {
  private readonly client: OfflineClient;
  constructor(
    private readonly props: {
      strategy: T;
      region: CalculationMethod[T];
      school: keyof typeof Schools;
    },
  ) {
    switch (props.strategy) {
      case 'ONLINE':
        throw new Error('Deprecated, please use OFFLINE strategy');
      case 'OFFLINE':
        this.client = new OfflineClient(
          props.region as unknown as OfflineClientProps,
        );
        break;
      default:
        this.client = new OfflineClient(
          props.region as unknown as OfflineClientProps,
        );
    }
  }

  async getTimings({
    date,
    coordinates,
  }: {
    coordinates: Coordinates;
    date: Date;
  }) {
    if (!this.client) throw new Error('Client not available');

    const rawTimings = await this.client.getTimings({
      date,
      coordinates,
    });

    return prayerTimesAdapter(rawTimings);
  }

  async onNextPrayer({
    date,
    coordinates,
    callback,
    options,
  }: {
    date: Date;
    coordinates: Coordinates;
    callback: (prayer: PrayerTime) => void;
    options: Omit<ITaskOptions, 'callback'> & { notifyBeforeInMS: number };
  }) {
    if (!this.client) throw new Error('Client not available');

    const nextPrayer = await this.client.getNextPrayerTime({
      date,
      coordinates,
    });
    if (!nextPrayer) throw new Error('Next prayer not available');

    const taskQueue = new TaskTimer(
      nextPrayer.time.getMilliseconds() - options.notifyBeforeInMS,
    );

    taskQueue.add({
      ...options,
      callback: () => callback(nextPrayer),
    });
  }

  async onNextPrayerTasks({
    date,
    coordinates,
    tasks,
  }: {
    date: Date;
    coordinates: Coordinates;
    tasks: (ITaskOptions & {
      notifyBeforeInMS: number;
      callback: (prayer: PrayerTime) => void;
    })[];
  }) {
    tasks.forEach((task) => {
      this.onNextPrayer({
        date,
        coordinates,
        callback: task.callback,
        options: task,
      });
    });
  }
}
