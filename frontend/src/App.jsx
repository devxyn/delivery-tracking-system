import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [trackingNumbers, setTrackingNumbers] = useState([]);
  const [newTrackingNumber, setNewTrackingNumber] = useState('');
  const [newCourier, setNewCourier] = useState('');

  useEffect(() => {
    fetchTrackingNumbers();
  }, []);

  const fetchTrackingNumbers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/tracking/');
      setTrackingNumbers(response?.data);
    } catch (error) {
      console.error('Error adding fetching number:', error);
    }
  };

  const addTrackingNumber = async () => {
    try {
      await axios.post('http://localhost:3000/api/tracking/add', {
        trackingNumber: newTrackingNumber,
        courier: newCourier,
      });
      // After successfully adding a new tracking number, fetch updated list of tracking numbers
      fetchTrackingNumbers();
      // Clear input fields
      setNewTrackingNumber('');
      setNewCourier('');
    } catch (error) {
      console.error('Error adding tracking number:', error);
    }
  };

  const refreshStatus = async (trackingNumber) => {
    try {
      await axios.put(`http://localhost:3000/api/tracking/${trackingNumber}/refresh`);
      fetchTrackingNumbers();
    } catch (error) {
      console.error('Error refreshing tracking status:', error);
    }
  };

  return (
    <div className='container mx-auto px-10 py-10 md:py-20'>
      <h1 className='text-3xl font-semibold mb-10'>Delivery Tracking System</h1>

      {/* Add Tracking Form */}
      <h2 className='text-xl font-semibold mb-4 md:mb-2'>Add New Delivery</h2>
      <div className='flex justify-between flex-col md:flex-row gap-4 mb-10'>
        <div className='w-full md:w-[80%] flex flex-col md:flex-row gap-6'>
          <div className='relative z-0 w-full group'>
            <input
              type='text'
              name='tracking-number'
              id='tracking-number'
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              value={newTrackingNumber}
              onChange={(e) => setNewTrackingNumber(e.target.value)}
              placeholder=' '
              required
            />
            <label
              htmlFor='tracking-number'
              className='peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
              Tracking number
            </label>
          </div>
          <div className='relative z-0 w-full group'>
            <input
              type='text'
              name='courier'
              id='courier'
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer '
              value={newCourier}
              onChange={(e) => setNewCourier(e.target.value)}
              placeholder=' '
              required
            />
            <label
              htmlFor='courier'
              className='peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
              Courier
            </label>
          </div>
        </div>
        <button
          className='text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-6 py-2 cursor-pointer'
          onClick={addTrackingNumber}
          disabled={!newTrackingNumber && !newCourier}>
          Add
        </button>
      </div>

      {/* Tracking Lists */}
      <div className='mb-4'>
        <h2 className='text-xl font-semibold mb-2'>Current Shipments</h2>
        <ul>
          {trackingNumbers
            .filter((tracking) => tracking.status !== 'Delivered')
            .map((tracking) => (
              <li className='flex justify-between' key={tracking._id}>
                <span>
                  {tracking.trackingNumber} - {tracking.courier}
                </span>
                <button
                  className='text-blue-600 hover:text-blue-700'
                  onClick={() => refreshStatus(tracking.trackingNumber)}>
                  Refresh
                </button>
              </li>
            ))}
        </ul>
      </div>

      <div>
        <h2 className='text-xl font-semibold mb-2'>Past Shipments</h2>
        <ul>
          {trackingNumbers
            .filter((tracking) => tracking.status === 'Delivered')
            .map((tracking) => (
              <li key={tracking._id}>
                {tracking.trackingNumber} - {tracking.courier}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
