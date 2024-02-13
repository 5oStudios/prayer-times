/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PrayerTimes } from '../models/PrayerTimes';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * Retrieve prayer times for a specific calendar month
     * Returns all prayer times for a specific calendar month.
 * 
     * @returns any OK
     * @throws ApiError
     */
    public static getCalendar({
year,
month,
latitude,
longitude,
method = null,
shafaq = 'general',
tune,
school = null,
midnightMode = null,
timezonestring,
latitudeAdjustmentMethod = null,
adjustment,
iso8601 = false,
}: {
/**
 * Gregorian calendar year
 */
year: number,
/**
 * Gregorian calendar month
 */
month: number,
/**
 * Decimal value for the latitude coordinate of the location
 */
latitude: number,
/**
 * Decimal value for the longitude coordinate of the location
 */
longitude: number,
/**
 * Prayer times calculation method
 */
method?: 0 | 1 | 2 | 3 | 4 | 5 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 99,
/**
 * Shafaq to use if the method is Moonsighting Committee Worldwide
 */
shafaq?: 'general' | 'ahmer' | 'abyad',
/**
 * Comma Separated String of integers to offset timings returned by the API in minutes
 */
tune?: string,
/**
 * School of thought
 */
school?: 0 | 1,
/**
 * Midnight mode
 */
midnightMode?: 0 | 1,
/**
 * Timezone name
 */
timezonestring?: string,
/**
 * Method for adjusting times at higher latitudes
 */
latitudeAdjustmentMethod?: 1 | 2 | 3,
/**
 * Number of days to adjust hijri date(s)
 */
adjustment?: number,
/**
 * Whether to return the prayer times in the iso8601 format
 */
iso8601?: boolean,
}): CancelablePromise<{
code?: number;
status?: string;
data?: Array<{
timings?: Record<string, string>;
date?: {
readable?: string;
timestamp?: string;
gregorian?: {
date?: string;
format?: string;
day?: string;
weekday?: {
en?: string;
};
month?: {
number?: number;
en?: string;
};
year?: string;
designation?: {
abbreviated?: string;
expanded?: string;
};
};
hijri?: {
date?: string;
format?: string;
day?: string;
weekday?: {
en?: string;
ar?: string;
};
month?: {
number?: number;
en?: string;
ar?: string;
};
year?: string;
designation?: {
abbreviated?: string;
expanded?: string;
};
holidays?: Array<string>;
};
};
meta?: {
latitude?: number;
longitude?: number;
timezone?: string;
method?: {
id?: number;
name?: string;
params?: Record<string, number>;
};
latitudeAdjustmentMethod?: string;
midnightMode?: string;
school?: string;
offset?: {
Imsak?: number;
Fajr?: number;
Sunrise?: number;
Dhuhr?: number;
Asr?: number;
Maghrib?: number;
Sunset?: number;
Isha?: number;
Midnight?: number;
};
};
}>;
}> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/calendar/{year}/{month}',
            path: {
                'year': year,
                'month': month,
            },
            query: {
                'latitude': latitude,
                'longitude': longitude,
                'method': method,
                'shafaq': shafaq,
                'tune': tune,
                'school': school,
                'midnightMode': midnightMode,
                'timezonestring': timezonestring,
                'latitudeAdjustmentMethod': latitudeAdjustmentMethod,
                'adjustment': adjustment,
                'iso8601': iso8601,
            },
        });
    }

    /**
     * Retrieve prayer times by city
     * @returns any Successful response
     * @throws ApiError
     */
    public static getCalendarByCity({
year,
month,
city,
country,
state,
method,
shafaq,
tune,
school,
midnightMode,
latitudeAdjustmentMethod,
adjustment,
iso8601,
}: {
/**
 * Gregorian calendar year
 */
year: number,
/**
 * Gregorian calendar month
 */
month: number,
/**
 * A city name
 */
city: string,
/**
 * A country name or 2 character alpha ISO 3166 code
 */
country: string,
/**
 * State or province
 */
state?: string,
/**
 * Prayer times calculation method
 */
method?: number,
/**
 * Shafaq to use if the method is Moonsighting Committee Worldwide
 */
shafaq?: string,
/**
 * Comma Separated String of integers to offset timings returned by the API in minutes
 */
tune?: string,
/**
 * School of thought
 */
school?: number,
/**
 * Midnight mode
 */
midnightMode?: number,
/**
 * Method for adjusting times higher latitudes
 */
latitudeAdjustmentMethod?: number,
/**
 * Number of days to adjust hijri date(s)
 */
adjustment?: number,
/**
 * Whether to return the prayer times in the iso8601 format
 */
iso8601?: boolean,
}): CancelablePromise<{
code?: number;
status?: string;
data?: Array<PrayerTimes>;
}> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/calendarByCity/{year}/{month}',
            path: {
                'year': year,
                'month': month,
            },
            query: {
                'city': city,
                'country': country,
                'state': state,
                'method': method,
                'shafaq': shafaq,
                'tune': tune,
                'school': school,
                'midnightMode': midnightMode,
                'latitudeAdjustmentMethod': latitudeAdjustmentMethod,
                'adjustment': adjustment,
                'iso8601': iso8601,
            },
        });
    }

    /**
     * Retrieve prayer times by Hijri calendar
     * @returns any Successful response
     * @throws ApiError
     */
    public static getHijriCalendar({
year,
month,
latitude,
longitude,
method,
shafaq,
tune,
school,
midnightMode,
timezonestring,
latitudeAdjustmentMethod,
adjustment,
iso8601,
}: {
/**
 * Hijri calendar year
 */
year: number,
/**
 * Hijri calendar month
 */
month: number,
/**
 * The decimal value for the latitude coordinate of the location
 */
latitude: number,
/**
 * The decimal value for the longitude coordinate of the location
 */
longitude: number,
/**
 * Prayer times calculation method
 */
method?: number,
/**
 * Shafaq to use if the method is Moonsighting Committee Worldwide
 */
shafaq?: string,
/**
 * Comma Separated String of integers to offset timings returned by the API in minutes
 */
tune?: string,
/**
 * School of thought
 */
school?: number,
/**
 * Midnight mode
 */
midnightMode?: number,
/**
 * A valid timezone name
 */
timezonestring?: string,
/**
 * Method for adjusting times higher latitudes
 */
latitudeAdjustmentMethod?: number,
/**
 * Number of days to adjust hijri date(s)
 */
adjustment?: number,
/**
 * Whether to return the prayer times in the iso8601 format
 */
iso8601?: boolean,
}): CancelablePromise<{
code?: number;
status?: string;
data?: Array<PrayerTimes>;
}> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/hijriCalendar/{year}/{month}',
            path: {
                'year': year,
                'month': month,
            },
            query: {
                'latitude': latitude,
                'longitude': longitude,
                'method': method,
                'shafaq': shafaq,
                'tune': tune,
                'school': school,
                'midnightMode': midnightMode,
                'timezonestring': timezonestring,
                'latitudeAdjustmentMethod': latitudeAdjustmentMethod,
                'adjustment': adjustment,
                'iso8601': iso8601,
            },
        });
    }

    /**
     * Retrieve prayer times by address
     * @returns any Successful response
     * @throws ApiError
     */
    public static getHijriCalendarByAddress({
year,
month,
address,
method,
shafaq,
tune,
school,
midnightMode,
latitudeAdjustmentMethod,
adjustment,
iso8601,
}: {
/**
 * Hijri calendar year
 */
year: number,
/**
 * Hijri calendar month
 */
month: number,
/**
 * An address string
 */
address: string,
/**
 * Prayer times calculation method
 */
method?: number,
/**
 * Shafaq to use if the method is Moonsighting Committee Worldwide
 */
shafaq?: string,
/**
 * Comma Separated String of integers to offset timings returned by the API in minutes
 */
tune?: string,
/**
 * School of thought
 */
school?: number,
/**
 * Midnight mode
 */
midnightMode?: number,
/**
 * Method for adjusting times higher latitudes
 */
latitudeAdjustmentMethod?: number,
/**
 * Number of days to adjust hijri date(s)
 */
adjustment?: number,
/**
 * Whether to return the prayer times in the iso8601 format
 */
iso8601?: boolean,
}): CancelablePromise<{
code?: number;
status?: string;
data?: Array<PrayerTimes>;
}> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/hijriCalendarByAddress/{year}/{month}',
            path: {
                'year': year,
                'month': month,
            },
            query: {
                'address': address,
                'method': method,
                'shafaq': shafaq,
                'tune': tune,
                'school': school,
                'midnightMode': midnightMode,
                'latitudeAdjustmentMethod': latitudeAdjustmentMethod,
                'adjustment': adjustment,
                'iso8601': iso8601,
            },
        });
    }

    /**
     * Retrieve prayer times by Hijri calendar and city
     * Returns all prayer times for a specific Hijri calendar month by city.
     * @returns any Successful response
     * @throws ApiError
     */
    public static getHijriCalendarByCity({
year,
month,
city,
country,
state,
method,
shafaq,
tune,
school,
midnightMode,
latitudeAdjustmentMethod,
adjustment,
iso8601,
}: {
/**
 * Hijri calendar year
 */
year: number,
/**
 * Hijri calendar month
 */
month: number,
/**
 * A city name
 */
city: string,
/**
 * A country name or 2 character alpha ISO 3166 code
 */
country: string,
/**
 * State or province
 */
state?: string,
/**
 * Prayer times calculation method
 */
method?: number,
/**
 * Shafaq to use if the method is Moonsighting Committee Worldwide
 */
shafaq?: string,
/**
 * Comma Separated String of integers to offset timings returned by the API in minutes
 */
tune?: string,
/**
 * School of thought
 */
school?: number,
/**
 * Midnight mode
 */
midnightMode?: number,
/**
 * Method for adjusting times higher latitudes
 */
latitudeAdjustmentMethod?: number,
/**
 * Number of days to adjust hijri date(s)
 */
adjustment?: number,
/**
 * Whether to return the prayer times in the iso8601 format
 */
iso8601?: boolean,
}): CancelablePromise<{
code?: number;
status?: string;
data?: Array<PrayerTimes>;
}> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/hijriCalendarByCity/{year}/{month}',
            path: {
                'year': year,
                'month': month,
            },
            query: {
                'city': city,
                'country': country,
                'state': state,
                'method': method,
                'shafaq': shafaq,
                'tune': tune,
                'school': school,
                'midnightMode': midnightMode,
                'latitudeAdjustmentMethod': latitudeAdjustmentMethod,
                'adjustment': adjustment,
                'iso8601': iso8601,
            },
        });
    }

    /**
     * Retrieve prayer times calculation methods
     * Returns all the prayer times calculation methods supported by this API.
     * @returns any Successful response
     * @throws ApiError
     */
    public static getMethods(): CancelablePromise<{
code?: number;
status?: string;
data?: Record<string, {
id?: number;
name?: string;
params?: Record<string, number>;
}>;
}> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/methods',
        });
    }

    /**
     * Retrieve prayer times by date
     * Returns all prayer times for a specific date.
     * @returns any Successful response
     * @throws ApiError
     */
    public static getTimings({
date,
latitude,
longitude,
method,
shafaq,
tune,
school,
midnightMode,
timezonestring,
latitudeAdjustmentMethod,
adjustment,
iso8601,
}: {
/**
 * Date in the DD-MM-YYYY format
 */
date: string,
/**
 * Latitude coordinate of the location
 */
latitude?: number,
/**
 * Longitude coordinate of the location
 */
longitude?: number,
/**
 * Prayer times calculation method
 */
method?: number,
/**
 * Shafaq to use if the method is Moonsighting Committee Worldwide
 */
shafaq?: string,
/**
 * Comma Separated String of integers to offset timings returned by the API in minutes
 */
tune?: string,
/**
 * School of thought
 */
school?: number,
/**
 * Midnight mode
 */
midnightMode?: number,
/**
 * Valid timezone name
 */
timezonestring?: string,
/**
 * Method for adjusting times higher latitudes
 */
latitudeAdjustmentMethod?: number,
/**
 * Number of days to adjust hijri date(s)
 */
adjustment?: number,
/**
 * Whether to return the prayer times in the iso8601 format
 */
iso8601?: boolean,
}): CancelablePromise<{
code?: number;
status?: string;
data?: {
timings?: Record<string, string>;
date?: {
readable?: string;
timestamp?: string;
gregorian?: {
date?: string;
format?: string;
day?: string;
weekday?: {
en?: string;
};
month?: {
number?: number;
en?: string;
};
year?: string;
designation?: {
abbreviated?: string;
expanded?: string;
};
};
hijri?: {
date?: string;
format?: string;
day?: string;
weekday?: {
en?: string;
ar?: string;
};
month?: {
number?: number;
en?: string;
ar?: string;
};
year?: string;
designation?: {
abbreviated?: string;
expanded?: string;
};
holidays?: Array<string>;
};
};
meta?: {
latitude?: number;
longitude?: number;
timezone?: string;
method?: {
id?: number;
name?: string;
params?: Record<string, number>;
};
latitudeAdjustmentMethod?: string;
midnightMode?: string;
school?: string;
offset?: Record<string, number>;
};
};
}> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/timings/{date}',
            path: {
                'date': date,
            },
            query: {
                'latitude': latitude,
                'longitude': longitude,
                'method': method,
                'shafaq': shafaq,
                'tune': tune,
                'school': school,
                'midnightMode': midnightMode,
                'timezonestring': timezonestring,
                'latitudeAdjustmentMethod': latitudeAdjustmentMethod,
                'adjustment': adjustment,
                'iso8601': iso8601,
            },
        });
    }

    /**
     * Retrieve prayer times by address and date
     * Returns all prayer times for a specific date at a particular address.
     * @returns any Successful response
     * @throws ApiError
     */
    public static getTimingsByAddress({
date,
address,
method,
shafaq,
tune,
school,
midnightMode,
latitudeAdjustmentMethod,
adjustment,
iso8601,
}: {
/**
 * Date in the DD-MM-YYYY format
 */
date: string,
/**
 * Address string
 */
address: string,
/**
 * Prayer times calculation method
 */
method?: number,
/**
 * Shafaq to use if the method is Moonsighting Committee Worldwide
 */
shafaq?: string,
/**
 * Comma Separated String of integers to offset timings returned by the API in minutes
 */
tune?: string,
/**
 * School of thought
 */
school?: number,
/**
 * Midnight mode
 */
midnightMode?: number,
/**
 * Method for adjusting times higher latitudes
 */
latitudeAdjustmentMethod?: number,
/**
 * Number of days to adjust hijri date(s)
 */
adjustment?: number,
/**
 * Whether to return the prayer times in the iso8601 format
 */
iso8601?: boolean,
}): CancelablePromise<{
code?: number;
status?: string;
data?: {
timings?: Record<string, string>;
date?: {
readable?: string;
timestamp?: string;
gregorian?: {
date?: string;
format?: string;
day?: string;
weekday?: {
en?: string;
};
month?: {
number?: number;
en?: string;
};
year?: string;
designation?: {
abbreviated?: string;
expanded?: string;
};
};
hijri?: {
date?: string;
format?: string;
day?: string;
weekday?: {
en?: string;
ar?: string;
};
month?: {
number?: number;
en?: string;
ar?: string;
};
year?: string;
designation?: {
abbreviated?: string;
expanded?: string;
};
holidays?: Array<string>;
};
};
meta?: {
latitude?: number;
longitude?: number;
timezone?: string;
method?: {
id?: number;
name?: string;
params?: Record<string, number>;
};
latitudeAdjustmentMethod?: string;
midnightMode?: string;
school?: string;
offset?: Record<string, number>;
};
};
}> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/timingsByAddress/{date}',
            path: {
                'date': date,
            },
            query: {
                'address': address,
                'method': method,
                'shafaq': shafaq,
                'tune': tune,
                'school': school,
                'midnightMode': midnightMode,
                'latitudeAdjustmentMethod': latitudeAdjustmentMethod,
                'adjustment': adjustment,
                'iso8601': iso8601,
            },
        });
    }

}
