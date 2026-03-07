import Globe from "react-globe.gl";
import { useRef, useEffect, useState } from "react";
import countriesGeo from "geojson-world-map";
import * as THREE from "three";
import { blur } from "three/tsl";


export default function GlobeComponent({ onSiteSelect }) {

  const globeRef = useRef();
  const [activeSite, setActiveSite] = useState(null);

  const initialView = {
    lat: 20,
    lng: 0,
    altitude: 2
  };

  const sites = [
    { name: "Medusa", lat: 37.98, lng: 23.73, img:"/images/medusa.png", link: "https://ipsitabosecreatrix.github.io/Medusa/", desc: "Interactive Product Viewer for a Tattoo Machine, Medusa" },
    { name: "Ipsi", lat: 12.97, lng: 77.59, desc: "AI Chatbot Avatar" },
    { name: "Dairy Plant", lat: 52.52, lng: 13.41, desc: "Dairy Plant Visualisation"}
  ]


  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      globeRef.current.pointOfView(initialView, 0);
    }
  }, []);

  const handlePointClick = (point) => {
    if (!globeRef.current) return;

    const controls = globeRef.current.controls();

    // If clicking the same site again → zoom out
    if (activeSite && activeSite.name === point.name) {
      globeRef.current.pointOfView(initialView, 1000);
      controls.autoRotate = true;
      setActiveSite(null);
      if (onSiteSelect) onSiteSelect(null);
      return;
    }

    // Otherwise zoom in
    controls.autoRotate = false;

    globeRef.current.pointOfView(
      {
        lat: point.lat,
        lng: point.lng,
        altitude: 0.8
      },
      1000
    );

    setActiveSite(point);
    if (onSiteSelect) onSiteSelect(point);
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>

      <Globe

        ref={globeRef}
        globeImageUrl="/images/earthred.png"
        backgroundColor="#ffffff"
        showAtmosphere={false}  

        polygonsData={countriesGeo.features}
        polygonCapColor={() => "rgba(0, 0, 0, 0)"}
        polygonSideColor={() => "transparent"}
        polygonAltitude={0}

        pointsData={sites}
        pointLat="lat"
        pointLng="lng"
        pointColor={() => "#ffffff"}
        pointRadius={0.8}
        pointAltitude={0.005}

        labelsData={sites}
        labelLat="lat"
        labelLng="lng"
        labelText="name"
        labelSize={1.2}
        labelDotRadius={0}
        labelColor={() => "#ffffff"}

        onPointClick={handlePointClick}
      />

      <button
        onClick={() => {
          if (!globeRef.current) return;

          const controls = globeRef.current.controls();

          globeRef.current.pointOfView(initialView, 1000);
          controls.autoRotate = true;
          controls.autoRotateSpeed = 0.51;
          setActiveSite(null);
          if (onSiteSelect) onSiteSelect(null);
        }}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          padding: "8px 14px",
          background: "#9b0000",
          color: "#ffffff",
          fontWeight: "bold",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          zIndex: 10
        }}
      >
        Reset View
      </button>

      {/* Dashboard */}
      <SiteDashboard
        site={activeSite}
        onClose={() => setActiveSite(null)}
      />
    </div>
  );

}

function SiteDashboard({ site, onClose }) {
  if (!site) return null;

  return (
    <div
      style={{
        position: "absolute",
        bottom: "20px",
        right: "20px",
        width: "400px",
        background: "#ffffffaa",
        backdropFilter: "blur(12px)",
        color: "#000",
        padding: "16px",
        borderRadius: "8px",
        zIndex: 20,
        fontFamily: "nexa"
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          background: "transparent",
          border: "none",
          color: "#000",
          fontWeight: "bold",
          fontSize: "18px",
          cursor: "pointer"
        }}
      >
        ×
      </button>

      {/* BU Image */}
      {site.img && (
        <img
          src={site.img}
          alt={site.name}
          style={{
            width: "100%",
            maxHeight: "207px",
            objectFit: "cover",
            borderRadius: "6px",
            marginBottom: "12px"
          }}
        />
      )}

      {/* Site Name with BU Color Circle */}
      <h3 style={{ display: "flex", alignItems: "center", margin: "0 0 8px 0" }}>
        <span
          style={{
            display: "inline-block",
            width: "18px",
            height: "18px",
            borderRadius: "50%",
            background: "#9b0000",
            marginRight: "10px"
          }}
        ></span>

        <a
          href={site.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          style={{
            color: "black",
            textDecoration: "none",
            cursor: "pointer"
          }}
          onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
          onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
        >
          {site.name}
          <span style={{ fontSize: "1.5em" }}> ↗</span>
        </a>
      </h3>

      {/* Site description */}
      <p style={{ margin: "2px 0" }}>
        <strong>Description:</strong> {site.desc}
      </p>

    </div>
  );
}


