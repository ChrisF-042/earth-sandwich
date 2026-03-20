import GlobeScene from './components/GlobeScene';

export default function App() {
  return (
    <>
      <div style={{
        position: 'absolute',
        top: 20,
        left: 20,
        color: 'white',
        zIndex: 1,
        fontSize: '24px'
      }}>
        Welcome to Earth Sandwich 
      </div>
      <GlobeScene />
    </>
  );
}