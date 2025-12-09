import { Suspense, lazy, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import Accordion from "./Accordion";
import Card from "./Card";
import Cart from "./Cart";
import Counter from "./Counter";
import Dashboard from "./Dashboard";
import ErrorBoundary from "./ErrorBoundary";
import LoadingSpinner from "./LoadingSpinner";
import Login from "./Login";
import Modal from "./Modal";
import Tabs from "./Tabs";
import UserProfile from "./UserProfile";
import Bomb from "./Bomb";

const AdminPanel = lazy(() => import("./AdminPanel"));

const profiles = [1, 2];

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [parentClicks, setParentClicks] = useState(0);
  const [shouldExplode, setShouldExplode] = useState(false);

  return (
    <div className="App">
      {profiles.map((id) => (
        <Card key={id} title={`User Profile #${id}`}>
          <UserProfile userId={id} />
        </Card>
      ))}

      <Card title="Interactive Counter">
        <Counter />
      </Card>

      <Card title="Login Form">
        <Login />
      </Card>

      <Card title="Accordion Example">
        <Accordion />
      </Card>

      <Card title="Shopping Cart (Redux Toolkit)">
        <Cart />
      </Card>

      <Card title="Laggy List (useMemo & React.memo)">
        <Dashboard />
      </Card>

      <Card title="Compound Tabs">
        <Tabs defaultIndex={0}>
          <Tabs.List>
            <Tabs.Tab index={0}>React</Tabs.Tab>
            <Tabs.Tab index={1}>Redux</Tabs.Tab>
            <Tabs.Tab index={2}>Vite</Tabs.Tab>
          </Tabs.List>

          <div className="tabs__divider" />

          <Tabs.Panel index={0}>React is a library for building UIs.</Tabs.Panel>
          <Tabs.Panel index={1}>Redux is a state container for JS apps.</Tabs.Panel>
          <Tabs.Panel index={2}>
            Vite is a lightning-fast dev build tool.
          </Tabs.Panel>
        </Tabs>
      </Card>

      <Card title="Trapdoor Modal (Portal)">
        <div
          className="modal-demo"
          onClick={() => setParentClicks((c) => c + 1)}
        >
          <p>
            Clicks inside this box increment the parent counter, even if they
            happen inside the portal.
          </p>
          <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
        </div>
        <p>Parent click count: {parentClicks}</p>
        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Portal Escapes Overflow"
        >
          <p>
            This modal renders into document.body, so it will not be clipped by
            parent overflow or stacking contexts. Clicking the portal button
            also bubbles to the parent counter.
          </p>
        </Modal>
      </Card>

      <Card title="Error Boundary Demo">
        <ErrorBoundary fallback="Something went wrong.">
          <button onClick={() => setShouldExplode(true)}>Trigger Bomb</button>
          {shouldExplode ? <Bomb /> : <p>Click to render the Bomb component.</p>}
        </ErrorBoundary>
      </Card>
    </div>
  );
}

function App() {
  return (
    <div>
      <nav
        style={{
          display: "flex",
          gap: "12px",
          justifyContent: "center",
          marginBottom: "16px",
        }}
      >
        <Link to="/">Home</Link>
        <Link to="/admin">Admin</Link>
      </nav>

      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
