import './App.css';
import SensorDataDisplay from './components/SensorDataDisplay';
import SensorDataLiveStream from './components/SensorDataLiveStream';

function App() {
  return (
    <div className='App'>
      <div className='w-screen h-screen bg-[#161A30]'>
        <header className='flex justify-center items-center p-5 text-4xl font-bold text-[#F0ECE5] bg-[#31304D]'>
          <h1 className='p-2'>Spectrum Dashboard</h1>
          <img src='./launch-vehicle.png' style={{ width: '30px', height: '30px' }} />
        </header>
        <div className='flex justify-between'>
          <SensorDataDisplay className='basis-2/5' />
          <SensorDataLiveStream className='basis-3/5' />
        </div>
      </div>
    </div>
  );
}

export default App;
