import FooterBar from '@/components/FooterBar';
import NavBar from '@/components/NavBar';
import React from 'react';

const MainLayout = ({children}) => {
  return (
    <div>
      <NavBar/>
      {children}
      <FooterBar/>
      
    </div>
  );
};

export default MainLayout;