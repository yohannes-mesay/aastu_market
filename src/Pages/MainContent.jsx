import React, { useState } from 'react';
import PostForm from './EditedPostForm';
import ServiceForm from './ServicePostForm';
import EventForm from './EventPostForm';
import backgroundImage from '../Assets/post_background.jpg';
import logo from '../Assets/logo.png'; 

const MainContent = () => {
  const [selectedPage, setSelectedPage] = useState('product');

  const renderPage = () => {
    switch (selectedPage) {
      case 'product':
        return <PostForm />;
      case 'service':
        return <ServiceForm />;
      case 'event':
        return <EventForm />;
      default:
        return null;
    }
  };

  return (
    
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', 
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '67px',
      }}
    >
      <div
        className="max-w-lg mx-auto shadow-lg rounded-lg p-4"
        style={{
          width: '100%',
          maxWidth: '480px',
          paddingLeft: '54px',
          paddingRight: '54px',
          paddingTop: '60px', 
          background: 'rgba(255, 255, 255, 1)', 
          marginBottom: '20px',
          
        }}
      >
       
        <img src={logo} alt="Logo" style={{ width: '170px', height: 'auto', margin: '-10px auto 0', display: 'block', verticalAlign: 'top', marginBottom: '20px' }} />

        <nav
          className="flex justify-between items-center mb-4"
          style={{
            position: 'static',
            top: '0',
            left: '0',
            right: '0',
            zIndex: '1', 
            padding: '10px', 
            paddingLeft: '0px',
            borderRadius: '8px', 
            background: 'none', 
            marginBottom: '4px', 
          }}
        >
          <div className="flex items-center space-x-4">
            <button className={`mr-2 ${selectedPage === 'product' ? 'text-blue-900' : 'text-blue-900'} focus:outline-none focus:text-blue-600`} onClick={() => setSelectedPage('product')}>Product</button>
            <button className={`mr-2 ${selectedPage === 'service' ? 'text-blue-900' : 'text-blue-900'} focus:outline-none focus:text-blue-600`} onClick={() => setSelectedPage('service')}>Service</button>
            <button className={`mr-2 ${selectedPage === 'event' ? 'text-blue-900' : 'text-blue-900'} focus:outline-none focus:text-blue-600`} onClick={() => setSelectedPage('event')}>Event</button>
          </div>
        </nav>
        {renderPage()}
      </div>
    </div>

  );
};

export default MainContent;
