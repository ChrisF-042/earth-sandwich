import { useEffect, useRef, useState } from 'react';
import Globe from 'globe.gl';


export default function GlobeScene() {
  const globeRef = useRef();
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (!globeRef.current) return;

    const globe = Globe()(globeRef.current)
      .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-dark.jpg')
      .backgroundColor('#000');

    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.3;

    globe.onGlobeClick(({ lat, lng }) => {
        setLocation({ lat, lng });
    });
  }, []);

  return (
  <>
    <div
      ref={globeRef}
      style={{
        width: '100vw',
        height: '100vh',
      }}
    />

    {location && (
      <div
        style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          color: 'white',
          background: 'rgba(0,0,0,0.8)',
          padding: '12px',
          borderRadius: '8px',
          zIndex: 9999,
          pointerEvents: 'none',
        }}
      >
        <div>Latitude: {location.lat.toFixed(4)}</div>
        <div>Longitude: {location.lng.toFixed(4)}</div>
      </div>
    )}
  </>
);
}