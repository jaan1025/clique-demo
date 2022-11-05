import React from 'react';
import { useNavigate } from 'react-router-dom';

export const PageB: React.FC = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/a');
  }
  
  return (
    <div>
      <button onClick={handleClick}>to page a</button>
    </div>
  );
};
