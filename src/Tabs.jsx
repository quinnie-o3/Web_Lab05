import { createContext, useContext, useMemo, useState } from "react";

const TabsContext = createContext(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error("Tabs components must be used within <Tabs>.");
  }
  return ctx;
}

function Tabs({ defaultIndex = 0, children }) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  const value = useMemo(
    () => ({
      activeIndex,
      setActiveIndex,
    }),
    [activeIndex]
  );

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
}

Tabs.List = function TabsList({ children }) {
  return <div className="tabs__list">{children}</div>;
};

Tabs.Tab = function TabsTab({ index, children }) {
  const { activeIndex, setActiveIndex } = useTabsContext();
  const isActive = activeIndex === index;

  return (
    <button
      className={`tabs__tab ${isActive ? "tabs__tab--active" : ""}`}
      role="tab"
      aria-selected={isActive}
      onClick={() => setActiveIndex(index)}
    >
      {children}
    </button>
  );
};

Tabs.Panel = function TabsPanel({ index, children }) {
  const { activeIndex } = useTabsContext();
  if (activeIndex !== index) return null;

  return (
    <div className="tabs__panel" role="tabpanel">
      {children}
    </div>
  );
};

export default Tabs;
