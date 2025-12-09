import React from 'react';
import './index.css';

export default function Panel({ title, children, isActive, onShow }) {
  return (
    <div className="panel">
      <h3>{title}</h3>
      {isActive ? (
        <div className="panel-content">{children}</div>
      ) : (
        <button onClick={onShow}>Show</button>
      )}
    </div>
  );
}
