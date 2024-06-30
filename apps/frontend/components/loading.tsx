import { Loader } from '@mantine/core';

export default function Loading() {
  const isBrowser = typeof window !== 'undefined';
  return (
    !isBrowser && (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          height: '100%',
          width: '100%',
          backgroundColor: '#ffffff',
          zIndex: '60',
        }}
      >
        <Loader color="blue" />
      </div>
    )
  );
}
