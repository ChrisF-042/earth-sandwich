import { useEffect, useRef, useState } from 'react';
import Globe from 'globe.gl';


export default function GlobeScene() {
  const globeRef = useRef();
  const [location, setLocation] = useState(null);
  const globeInstance = useRef();


  function getAntipode(lat, lng) {
  const antiLat = -lat;

  let antiLng = lng + 180;
  if (antiLng > 180) antiLng -= 360;

  return { lat: antiLat, lng: antiLng };
}





  useEffect(() => {
    if (!globeRef.current) return;

    const globe = Globe()(globeRef.current)
      .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-dark.jpg')
      .backgroundColor('#000');

    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.3;

    globeInstance.current = globe;

    globe.onGlobeClick(({ lat, lng }) => {
  const antipode = getAntipode(lat, lng);

  setLocation({
    original: { lat, lng },
    antipode
  });

  // Update globe points
  globe
  .pointsData([
    { lat, lng, color: 'blue', size: 1.5 },
    { lat: antipode.lat, lng: antipode.lng, color: 'red', size: 1.5 }
  ])
  .pointAltitude(0.1)
  .pointColor('color');
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
  <div style={{
    position: 'absolute',
    bottom: 20,
    left: 20,
    color: 'white',
    background: 'rgba(0,0,0,0.8)',
    padding: '12px',
    borderRadius: '8px',
    zIndex: 9999,
    pointerEvents: 'none'
  }}>
    <div><strong>You:</strong></div>
    <div>Lat: {location.original.lat.toFixed(4)}</div>
    <div>Lng: {location.original.lng.toFixed(4)}</div>

    <br />

    <div><strong>Antipode:</strong></div>
    <div>Lat: {location.antipode.lat.toFixed(4)}</div>
    <div>Lng: {location.antipode.lng.toFixed(4)}</div>
  </div>
)}
  </>
);
}