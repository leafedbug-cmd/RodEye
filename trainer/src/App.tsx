import { Link, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LabelView from "./pages/LabelView";
import TrainView from "./pages/TrainView";
import DeployView from "./pages/DeployView";

import "./styles.css";

export default function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h1>RodEye Trainer</h1>
        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/labels">Label Editor</Link>
          <Link to="/train">Train</Link>
          <Link to="/deploy">Deploy</Link>
        </nav>
      </aside>
      <main className="content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/labels" element={<LabelView />} />
          <Route path="/train" element={<TrainView />} />
          <Route path="/deploy" element={<DeployView />} />
        </Routes>
      </main>
    </div>
  );
}
