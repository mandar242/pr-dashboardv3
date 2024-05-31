import React from 'react';
import Logo from "./../assets/Logo.png"
import PrList from "./PrList";

function DashBoard({ activeCollection }) {
  console.log(activeCollection)

  return (
    // top navbar
    <div className='bg-[#f0eeeb] h-screen w-screen-2'>
    <div className='flex flex-col py-20 px-14'>
      <div className="w-full bg-[#344767] py-4 px-6 flex items-center justify-between fixed top-0 left-0 z-10">
        <div className="flex items-center">
          <img src={Logo} alt="Logo" width={40} />
          <h1 className="text-xl text-white ml-2">Cloud Content PR Tracker</h1>
        </div></div>
      {/* display table of PRs */}
      <div className='h-[90-vh] border rounded flex flex-col  p-4 mt-5 text-gray-600 '>
        <PrList />
      </div>
    </div>
    </div>
  );
}

export default DashBoard;