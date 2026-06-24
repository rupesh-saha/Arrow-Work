import FooterBar from '@/components/FooterBar';
import Navbar from '@/components/NavBar';
import React from 'react';

const AuthLayout = ({children}) => {
  return (
    <div>
      <div className="sm:flex md:hidden">
        <Navbar/>
      </div>
      {children}
      <FooterBar/>
      
    </div>
  );
};

export default AuthLayout;