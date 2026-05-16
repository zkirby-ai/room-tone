import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Room Tone',
    short_name: 'Room Tone',
    description: 'Conversation momentum for parties, hangs, and dead-air rescue.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0b10',
    theme_color: '#0a0b10',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
