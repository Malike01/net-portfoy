import React, { useState, useEffect } from 'react';
import { Tour, type TourProps } from 'antd';
import { useLocation } from 'react-router-dom';
import { TOUR_STEPS_DATA } from '@/constant/General';

const AppTour: React.FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const steps: TourProps['steps'] = TOUR_STEPS_DATA.map((step) => ({
    title: step.title,
    description: step.description,
    target: step.target 
      ? () => document.querySelector(step.target) as HTMLElement 
      : null,
  }));

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('hasSeenTour');
    
    if (!hasSeenTour && location.pathname === '/') {
      const timer = setTimeout(() => setOpen(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem('hasSeenTour', 'true');
  };

  return (
    <Tour 
      open={open} 
      onClose={handleClose} 
      steps={steps} 
      type="primary"
    />
  );
};

export default AppTour;