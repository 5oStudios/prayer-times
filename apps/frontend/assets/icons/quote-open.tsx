import * as React from 'react';
import { memo, SVGProps } from 'react';

const Quote = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    data-name="Layer 1"
    viewBox="0 0 75.4 226.3"
    width="0.70em"
    {...props}
  >
    <defs>
      <clipPath id="a">
        <path
          d="M0 0h75.4v226.3H0z"
          style={{
            fill: 'none',
            strokeWidth: 0,
          }}
        />
      </clipPath>
    </defs>
    <g
      data-name="Group 18"
      style={{
        clipPath: 'url(#a)',
      }}
    >
      <path
        d="M61 .6c1.1.6 2.2 1.4 3.2 2.3C65.7 4.4 67 6.1 67.9 8c1.2 2.6 2 5.4 2.4 8.2.9 6.4.3 14.6-2.2 23.6-.6 2.3-1.4 4.4-2.4 6.9-.6 1.8-1.3 3.6-1.9 5.5-.1 0-.3.1-.4.2-3.1 1.4-6 3.1-8.8 4.9-.8.5-1.6 1.1-2.4 1.7-.6.4-1.2.9-1.8 1.4-2.4 1.8-4.6 3.9-6.7 6.1-4.1 4.4-7.3 9.8-8.5 15.2-.6 2.5-.7 5.1-.4 7.6.2 1.1.4 2.2.8 3.2.3.9.8 1.8 1.4 2.6 1.1 1.5 2.4 2.8 3.8 3.8-.3-.2-.7-.3-1-.4-.9-.4-1.9-.7-2.9-.9-1-.2-2-.3-3.1-.4-2.1 0-4.3.1-6.4.6-4.3 1.2-8.3 3.2-11.9 5.8l-5.5 3.8-1.4.9-1.8 1.2c-1.9 1.2-4.2 2.3-6.3 3.5l-.5.3c2.1 1.1 4.3 2.2 6.3 3.4l1.5.9.7.4 1.4.9c1.8 1.2 3.6 2.5 5.3 3.7 1.8 1.3 3.6 2.5 5.6 3.6 3.8 2.2 8.1 3.3 12.5 3.1h1.5c.6 0 1.1-.2 1.7-.3.9-.3 1.9-.6 2.8-1 1.5-.7 3-1.4 4.3-2.1-2.6 1.4-4.8 3.3-6.6 5.6-.6.8-1 1.7-1.4 2.6-.4 1-.6 2.1-.8 3.2-.3 2.5-.2 5.1.4 7.6 1.2 5.4 4.5 10.8 8.5 15.2 2.1 2.2 4.3 4.3 6.7 6.1.6.5 1.2.9 1.8 1.4.8.6 1.6 1.1 2.5 1.7 2.8 1.9 5.7 3.5 8.8 4.9.2 0 .4.2.6.3.5 1.6 1 3.1 1.6 4.6.9 2.5 1.7 4.6 2.4 6.9 2.5 8.9 3.2 17.1 2.4 23.6-.3 2.9-1.1 5.7-2.3 8.4-.9 1.9-2.2 3.7-3.7 5.2-1.3 1.3-2.8 2.3-4.5 3 0 0 .4-.1 1.3-.4 1.3-.5 2.5-1.1 3.6-1.9 1.8-1.3 3.4-3 4.6-4.9 1.6-2.6 2.8-5.5 3.5-8.5 1.7-6.8 1.9-15.4 0-25.2-.4-2.4-1.2-5-1.9-7.5-.7-2.4-1.3-5-1.8-7.5-.6-2.5-.8-5.1-.8-7.6-.1-6.7 1.6-9.3 1.6-9.3-.6-.2-1.2-.3-1.8-.3-.7 0-1.5.2-2.1.5-1.3.6-2.5 1.5-3.2 2.8-.4.6-.6 1.2-.8 1.9-.2.5-.3 1-.4 1.6-.1.9-.2 1.8-.2 2.7.2 3.1.7 6.1 1.5 9 .3 1 .6 1.9.9 2.9-1-1.4-1.9-2.8-2.6-4.4-.2-.4-.3-.8-.4-1.1 0-.2-.1-.4-.2-.6 0-.4-.2-.7-.3-1.1-.3-1.4-.4-2.8-.4-4.2v-4.4c0-1.6 0-3.2-.2-4.9l-.6-5.1c0-.4 0-.8-.1-1.2 0-.6-.2-1-.3-1.4-.2-.9-.4-1.6-.6-2.4-.7-2.7-1.2-5.4-1.4-8.1-.1-1.9 0-3.7.3-5.5 0 2.3.3 4.6.9 6.7 1 3.2 2.5 6.2 4.6 8.9 1.6 2.1 3.5 4.1 5.5 5.8 1.9 1.6 3.9 2.9 6 4.1 0 0-.7-2.5-1.6-6.5-.5-2.3-.9-4.6-1.2-6.9-.4-2.6-.3-5.2.1-7.8.2-1.2.6-2.4 1.2-3.4.1-.3.3-.5.4-.7s.3-.4.6-.9c.5-.7.9-1.6 1.2-2.4.9-2.7.7-5.7-.6-8.3-.5-1-1.3-1.8-2.2-2.4-.1 0-.3-.2-.4-.2.2-.1.5-.2.7-.3.6-.3 1.2-.4 1.8-.4-.6-.3-1.2-.4-1.9-.4-1.1 0-2.2.2-3.2.5.2 0 1.1-.4 0 0-.2 0-.4 0-.6.2-.4.1-.8.2-1.2.4-1 .4-2.2.8-3.3 1.2-.3 0-.6.2-.8.2h-.7c-.6 0-1.2-.2-1.8-.4-1.3-.6-2.5-1.4-3.5-2.4l-1-.9c-.1 0 0 0 0 0h.1l1-.9c.2-.1.3-.2.4-.4h.1c.9-.8 2-1.5 3.1-1.9s2.2-.6 3.4-.3c1.1.3 2.2.8 3.2 1.3 2 1 3.8 1.7 5.1 1.5.7 0 1.3-.3 1.9-.6-.6.1-1.2 0-1.8-.2-.4-.1-.8-.3-1.2-.6.3-.1.7-.3 1-.5.9-.6 1.7-1.4 2.2-2.4 1.3-2.6 1.5-5.6.6-8.3-.3-.9-.7-1.7-1.2-2.4-.4-.5-.5-.6-.6-.9s-.3-.5-.4-.7c-.6-1.1-1-2.2-1.2-3.4-.4-2.6-.5-5.2-.1-7.8.3-2.3.7-4.6 1.2-6.9.9-4 1.7-6.5 1.6-6.5-2.1 1.1-4.1 2.5-6 4.1-2 1.7-3.9 3.6-5.5 5.8-2 2.7-3.6 5.7-4.6 8.9-.7 2.2-1 4.5-.9 6.7-.3-1.8-.4-3.7-.3-5.5.2-2.8.6-5.5 1.4-8.1.2-.8.4-1.5.6-2.4 0-.4.2-.8.3-1.4 0-.4 0-.8.1-1.2.2-1.6.4-3.3.6-5.1s.2-3.4.2-4.9v-4.4c0-1.4.1-2.8.4-4.2 0-.4.2-.7.3-1.1 0-.2.1-.4.2-.6.1-.4.3-.8.4-1.1.6-1.4 1.4-2.7 2.3-4-.2.6-.3 1.1-.5 1.7-.9 3-1.4 6-1.6 9.1 0 .9 0 1.8.1 2.8 0 .5.2 1.1.3 1.6.2.7.5 1.3.8 1.9.7 1.3 1.9 2.3 3.2 2.9.7.3 1.4.5 2.2.5h2s-2.5-2.1-1.9-9.5c0-2.5.2-5 .8-7.5.5-2.5 1.1-5 1.8-7.5.7-2.4 1.4-5 1.9-7.4 1.9-9.7 1.7-18.4 0-25.3-.7-3-1.9-6-3.5-8.6-1.2-1.9-2.8-3.7-4.6-5-1.1-.8-2.3-1.5-3.6-2-.9-.3-1.3-.4-1.3-.5l1.2.6m10.5 118.2c.3 2 0 4-1 5.8-.2.4-.5.8-.8 1.2 0 0-.5.5-.7.8-.3.3-.6.7-.8 1.1-1 1.5-1.7 3.2-2.1 5-.6 3.2-.3 6.6.7 9.7.7 2.3 1.7 4.5 2.9 6.6-3-4.4-5.4-9.2-7-14.3-.8-2.7-1.2-5.4-1.1-8.2 0-2.1.6-4.2 1.5-6.1h.2c.3-.1.7-.3 1-.5 1.2-.7 2.3-1.4 3.2-2.1s1.8-1.2 2.6-1.7c.9.7 1.4 1.7 1.6 2.8m-9.2-27.9c1.6-5.1 4-9.9 7-14.3-1.2 2.1-2.2 4.3-2.9 6.6-1 3.1-1.2 6.5-.7 9.7.3 1.8 1.1 3.5 2.1 5 .3.4.5.7.8 1.1.3.3.6.7.7.8.3.4.6.8.8 1.2.9 1.8 1.3 3.8 1 5.8-.2 1.2-.9 2.3-1.9 3.1-.7-.5-1.4-1.1-2.2-1.8-1-.9-2.1-1.7-3.3-2.4-.4-.2-.9-.4-1.3-.5-.9-1.9-1.4-4-1.5-6.1 0-2.8.3-5.6 1.1-8.2m-7.3-31.3v.6c0 .4 0 .8-.1 1.2 0 1.5 0 3 .3 4.4.6 2.6 1 5.3 1.1 8v5.4c0 .2 0 .6-.1.9-.1.7-.3 1.4-.4 2.1-.6 2.8-.9 5.6-.9 8.4 0 3.7 1 7.4 3 10.5.4 1.4 1.1 2.8 1.9 4.1-1.6.4-3.1 1.2-4.4 2.2l-3 2.2c-1.5 1-3.4 2-5 3 1.6 1 3.4 2 4.9 3 .4.2.7.5 1.1.8l.9.7 1 .8c1.3 1.1 2.8 1.9 4.5 2.4-.8 1.2-1.5 2.6-1.9 4-2 3.2-3 6.8-3 10.5 0 2.8.3 5.7.9 8.4.1.7.3 1.5.4 2.1 0 .3.1.7.1.9v1.1c0 1.5.1 2.9 0 4.3-.1 2.7-.5 5.4-1.1 8-.3 1.5-.4 2.9-.3 4.4 0 .4 0 .8.1 1.2v.6c-.1 0-.2-.2-.4-.3-.3-.2-.6-.5-.9-.7-.6-.4-1.2-.9-1.8-1.4-2.2-1.8-4.3-3.7-6.2-5.8-3.4-3.6-6-8-7.5-12.8-.6-2-.8-4-.7-6.1 0-.9.2-1.8.4-2.7.2-.8.5-1.5.8-2.2 1.4-2.5 3.3-4.7 5.6-6.4 2.1-1.7 4.1-3 5.9-4.3 1.6-1.1 3.2-2.3 4.6-3.6.2-.2.4-.3.5-.5-.6-.4-1.3-.9-1.9-1.4-2 .8-4.3 1.8-6.7 2.8-2.8 1.1-5.9 2.4-9.1 3.5-.8.3-1.6.5-2.4.7-.3 0-.7.1-1 .1h-1.3c-1.8-.1-3.5-.4-5.2-.9-3.4-1-6.6-3.2-10-5.9-1.7-1.3-3.5-2.7-5.4-4l-1.5-1-.7-.5.3-.2.7-.5 1.4-1 5.4-3.9c3.1-2.4 6.6-4.3 10.3-5.7 1.7-.5 3.4-.8 5.2-.9h2.5c.8 0 1.6.3 2.3.5 3 1.1 5.9 2.4 8.7 4 2.1 1.1 4 2.1 5.8 2.9.4-.3.8-.6 1.2-.8l1.5-.9-.6-.6c-1.5-1.3-3-2.5-4.6-3.6-1.8-1.3-3.9-2.7-5.9-4.3-2.3-1.7-4.2-3.9-5.6-6.4-.4-.7-.6-1.4-.8-2.2-.2-.9-.3-1.8-.4-2.7 0-2.1.1-4.1.7-6.1 1.5-4.8 4-9.2 7.5-12.8 1.9-2.1 4-4.1 6.2-5.8.6-.5 1.2-.9 1.8-1.4.3-.2.6-.5.9-.7.1 0 .2-.2.4-.3m-6.5 63.5c1-.5 1.9-1 2.8-1.4-.5.3-1 .5-1.5.8l-1.2.6"
        data-name="Path 21"
        style={{
          fill: '#99762c',
          strokeWidth: 0,
        }}
      />
      <path
        d="M37 105.9c-2.3.4-4.6 1.2-6.7 2.2l-4.4 2.2c-2.1 1-4.9 2-7.3 3h-.1c2.3 1 4.9 2 7.1 3 .6.2 1.1.5 1.6.8l1.4.7 1.5.8c2.1 1.2 4.4 2 6.7 2.4 1.1.1 2.2.2 3.4 0 .6 0 1.2-.1 1.8-.3.5-.1 1-.3 1.5-.5 1.8-.7 3.3-1.4 4.7-2.1 1.3-.6 2.4-1.1 3.5-1.6-.3-.2-.7-.4-1-.6-.4-.2-.9-.5-1.3-.7-.6.1-1.3.3-2 .5-1.5.4-3.2.8-4.9 1.2-.4 0-.8.2-1.2.2h-1.1c-.9 0-1.7-.2-2.6-.4-1.8-.5-3.6-1.3-5.1-2.4l-1.5-.9h-.1.2l1.4-.9c1.7-1 3.4-1.8 5.3-2.4 1.6-.4 3.3-.6 4.9-.3 1.6.3 3.1.8 4.7 1.3.6.2 1.2.4 1.7.6.8-.4 1.5-.8 2.3-1.2-.9-.5-1.9-1-3-1.7-1.5-.9-3.1-1.7-4.8-2.4-2.1-.7-4.4-.9-6.6-.5"
        data-name="Path 23"
        style={{
          fill: '#99762c',
          strokeWidth: 0,
        }}
      />
      <path
        d="M45.2 78.4c-.8 1.7-1.5 3.4-2 5.2-.8 2.5-1.1 5.1-.9 7.8.2 2.2 1 4.4 2.4 6.1 1.1 1.1 2.3 2.1 3.7 2.9 1.9 1 3.7 2.1 5.4 3.3.6.5 1.2 1.1 1.7 1.7-.3-.8-.8-1.5-1.3-2.2-1.5-1.7-3.1-3.4-4.8-4.9-1-1-2-2.1-2.7-3.4-.7-1.5-1.1-3.1-1.1-4.7 0-2 .4-4.1 1.1-6 .2-.6.4-1.1.6-1.7v-.2c0-.1 0 0 0 0 .2.4.5.7.7 1.1.9 1.2 1.7 2.5 2.3 3.9.3.7.5 1.4.8 2.1l.3.9c0 .3.1.7.2 1.1.2 1.5.5 3 .9 4.5.5 2.2 1.5 4.3 2.9 6.1.5.6 1.1 1.2 1.9 1.6-.6-.6-1-1.2-1.3-1.9-.9-1.9-1.4-4-1.5-6.1-.1-1.3-.2-2.8-.2-4.5v-1.4c0-.5 0-1-.2-1.6-.2-.9-.3-1.8-.6-2.8-.5-1.8-1.1-3.6-2-5.3-.5-1.2-.3-.8-.5-1.2-.1-.4-.3-.7-.4-1.1-.1-.4-.3-.8-.4-1.3-.4-2-.6-4.1-.5-6.1v.1c-1.7 2.5-3.1 5.2-4.2 7.9"
        data-name="Path 24"
        style={{
          fill: '#99762c',
          strokeWidth: 0,
        }}
      />
      <path
        d="M47.2 144.3c-.2-.6-.4-1.1-.6-1.7-.7-1.9-1.1-4-1.1-6 0-1.6.4-3.2 1.1-4.7.8-1.2 1.7-2.4 2.7-3.4 1.7-1.5 3.3-3.2 4.8-4.9.5-.7 1-1.4 1.3-2.2-.5.6-1.1 1.2-1.7 1.7-1.7 1.2-3.5 2.3-5.4 3.3-1.4.8-2.6 1.7-3.7 2.9-1.4 1.7-2.2 3.9-2.4 6.1-.2 2.6.1 5.3.9 7.8.6 1.8 1.2 3.5 2 5.2 1.2 2.8 2.6 5.4 4.2 7.9 0-1.9.1-4 .5-6 0-.5.2-.9.4-1.3.1-.4.3-.7.4-1.1.2-.4.5-1.2.5-1.2.8-1.7 1.5-3.5 2-5.3.2-1 .4-1.9.6-2.8.1-.5.2-1 .2-1.6v-1.4c0-1.7 0-3.2.2-4.5.1-2.1.7-4.2 1.5-6.1.3-.7.8-1.4 1.3-1.9-.7.4-1.4 1-1.9 1.6-1.4 1.8-2.4 3.9-2.9 6.1-.4 1.5-.7 3-.9 4.5 0 .4-.1.8-.2 1.1 0 .3-.1.6-.3.9-.2.7-.5 1.4-.8 2.1-.6 1.4-1.4 2.7-2.3 3.9-.2.4-.5.7-.7 1.1 0 .1 0 0 0 0v-.2"
        data-name="Path 25"
        style={{
          fill: '#99762c',
          strokeWidth: 0,
        }}
      />
      <path
        d="M59.7 113.7c0 3.2 4.9 3.2 4.9 0s-4.9-3.2-4.9 0"
        data-name="Path 26"
        style={{
          fill: '#99762c',
          strokeWidth: 0,
        }}
      />
      <path
        d="M37.8 113.7c0 3.2 4.9 3.2 4.9 0s-4.9-3.2-4.9 0"
        data-name="Path 27"
        style={{
          fill: '#99762c',
          strokeWidth: 0,
        }}
      />
      <path
        d="M65.3 123.9c0 1 .8 1.8 1.8 1.8s1.8-.8 1.8-1.8-.8-1.8-1.8-1.8-1.8.8-1.8 1.8"
        data-name="Path 28"
        style={{
          fill: '#99762c',
          strokeWidth: 0,
        }}
      />
      <path
        d="M65.8 104.1c0 1 .8 1.8 1.8 1.8s1.8-.8 1.8-1.8-.8-1.8-1.8-1.8-1.8.8-1.8 1.8"
        data-name="Path 29"
        style={{
          fill: '#99762c',
          strokeWidth: 0,
        }}
      />
      <path
        d="M46.5 136.5c0 1 .8 1.8 1.8 1.8s1.8-.8 1.8-1.8-.8-1.8-1.8-1.8-1.8.8-1.8 1.8"
        data-name="Path 30"
        style={{
          fill: '#99762c',
          strokeWidth: 0,
        }}
      />
      <path
        d="M46.7 91.5c0 1 .8 1.8 1.8 1.8s1.8-.8 1.8-1.8-.8-1.8-1.8-1.8-1.8.8-1.8 1.8"
        data-name="Path 31"
        style={{
          fill: '#99762c',
          strokeWidth: 0,
        }}
      />
    </g>
  </svg>
);

export const QuoteOpenSvg = memo(Quote);
