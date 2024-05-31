import { React, useEffect } from 'react';
import NavigationBar from './components/NavigationBar';
import { NavigationProvider } from './components/NavigationContext';
import DashBoard from './components/DashBoard';

function App() {
  useEffect(() => {
    // Lock scroll when the component mounts
    document.body.style.overflow = 'hidden';
  }, []);
  return (
    <NavigationProvider>
      <div className='w-full flex'>
        < NavigationBar />
        <main className="grow">
          <DashBoard />
        </main>
      </div>
    </NavigationProvider>
  );
}

export default App;
