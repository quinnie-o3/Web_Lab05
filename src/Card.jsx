import React from 'react';
import './index.css';

export default function Card({ title, children }) {
  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>
      <hr className="card-line" />
      <div className="card-body">{children}</div>
    </div>
  );
}
