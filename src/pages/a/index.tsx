import React from 'react';
import { useNavigate } from "react-router-dom";

export const PageA: React.FC = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/b');
  }

  return (
    <div>
      <button onClick={handleClick}>to page b</button>
    </div>
  );
};
