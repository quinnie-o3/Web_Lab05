import React, { useState } from 'react';
import Panel from './Panel';
import './index.css';

export default function Accordion() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <h2>Accordion Example</h2>
      <Panel
        title="About React"
        isActive={activeIndex === 0}
        onShow={() => setActiveIndex(0)}
      >
        React lets you build user interfaces out of individual pieces called components.
      </Panel>

      <Panel
        title="About Vite"
        isActive={activeIndex === 1}
        onShow={() => setActiveIndex(1)}
      >
        Vite is a next-generation frontend tooling that’s faster and lighter than CRA.
      </Panel>
    </div>
  );
}
