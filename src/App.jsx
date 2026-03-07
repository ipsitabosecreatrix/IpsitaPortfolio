import { useState } from "react";
import GlobeComponent from "./components/Globe";
import logo from "./assets/logo.png";
import legend from "./assets/legend.png";
import "./App.css";

export default function App() {
  const [selectedSite, setSelectedSite] = useState(null);
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <div className="appContainer">

      <div className="globeLayer">
        <GlobeComponent onSiteSelect={setSelectedSite} />
      </div>

      <img
        className="siteLogo"
        src={logo}
        alt="logo"
        onClick={() => setInfoOpen(!infoOpen)}
      />

       <img
        className="legendImg"
        src={legend}
        alt="legend"
      />

      <div className={`infoPanelLeft ${infoOpen ? "open" : ""}`}>
        <h2>Welcome to my world</h2>

        <p>
          Explore the globe to discover my projects.
        </p>

        <p>
          Each point marks a location connected to a project. Click on any marker to
          open its information panel.
        </p>

        <p>
          From there, follow the project link to learn more.
        </p>
      </div>

    </div>
  );
}
