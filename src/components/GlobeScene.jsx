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

  // Update React state
  setLocation({
    original: { lat, lng },
    antipode
  });

  // POINTS (blue = you, red = antipode)
  globe
    .pointsData([
      { lat, lng, color: 'blue', size: 1.5 },
      { lat: antipode.lat, lng: antipode.lng, color: 'red', size: 1.5 }
    ])
    .pointAltitude(0.1)
    .pointColor('color');

  // ARC (connect the two points)
  globe
  .arcsData([
    {
      startLat: lat,
      startLng: lng,
      endLat: antipode.lat,
      endLng: antipode.lng
    }
  ])
  .arcColor(() => ['#00aaff', '#ff4444'])
  .arcStroke(1.2)
  .arcAltitude(0.7)
  .arcDashLength(0.03)
  .arcDashGap(0.12)
  .arcDashAnimateTime(1500);

  // CAMERA ANIMATION
  globe.pointOfView({ lat, lng, altitude: 2 }, 1000);

  setTimeout(() => {
    globe.pointOfView(
      { lat: antipode.lat, lng: antipode.lng, altitude: 2 },
      1500
    );
  }, 1200);
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