import React, { useState } from 'react';
import { Cloud, CloudCog, ServerCog, Container } from 'lucide-react';
import { useNavigationContext } from './NavigationContext';

const navLinks = [
  { name: 'amazon.aws', icon: Cloud },
  { name: 'community.aws', icon: CloudCog },
  { name: 'cloud.terraform', icon: ServerCog },
  { name: 'kubernetes.core', icon: Container },
];

function NavigationBar() {
  const [activeNavIndex, setActiveNavIndex] = useState(0);
  const { setCollection } = useNavigationContext();

  const handleNavLinkClick = (item, index) => {
    setActiveNavIndex(index);
    setCollection(item.name);
  };

  return (
    <div className='flex flex-col border text-white w-1/6 h-screen bg-[#344767]'>
      <div className='flex flex-col py-20'>
        <div className='mt-10 flex flex-col space-y-8'>
          {navLinks.map((item, index) => (
            <div
              key={index}
              className={
                'flex space-x-3 p-2 rounded' + (activeNavIndex === index ? ' bg-[#f0eeeb] text-black font-semibold' : ' ')
              }
              onClick={() => handleNavLinkClick(item, index)}>
              <item.icon />
              <span className=''>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
