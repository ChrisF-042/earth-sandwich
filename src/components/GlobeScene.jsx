import { useEffect, useRef } from 'react';
import Globe from 'globe.gl';

export default function GlobeScene() {
  const globeRef = useRef();

  useEffect(() => {
    if (!globeRef.current) return;

    const globe = Globe()(globeRef.current)
      .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-dark.jpg')
      .backgroundColor('#000');

    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.5;
  }, []);

  return (
    <div
      ref={globeRef}
      style={{
        width: '100vw',
        height: '100vh',
      }}
    />
  );
}