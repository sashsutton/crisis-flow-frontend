import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';
import { Map as MapIcon, Activity, Zap } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import './App.css';

// --- CONFIGURATION ---
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/data";
const CENTER_LAT = 34.0522; // Los Angeles (Simulated Disaster Zone)
const CENTER_LNG = -118.2437;

// Cluster definitions (mapping AI cluster IDs to human concepts for the demo)
const CLUSTERS = {
  0: { label: 'Critical Rescue', color: '#ef4444' }, 
  1: { label: 'Medical Help', color: '#3b82f6' },    
  2: { label: 'Infrastructure', color: '#f97316' },  
  3: { label: 'Shelter/Supplies', color: '#22c55e' },
  4: { label: 'General/Other', color: '#a855f7' }    
};



function App() {
  const [incidents, setIncidents] = useState([]);
  const [viewMode, setViewMode] = useState('map'); // 'map' or 'neural'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const rawData = await response.json();
        
        // Process data: Add fake coordinates for the map visualization
        // (Since the raw CSV only has text locations like "USA", we simulate points for the map)
        const processed = rawData.map(item => ({
          ...item,
          // Random scatter around the center point
          lat: CENTER_LAT + (Math.random() - 0.5) * 0.15,
          lng: CENTER_LNG + (Math.random() - 0.5) * 0.15,
          // Map cluster ID to properties
          color: CLUSTERS[item.cluster_id]?.color || '#ccc',
          category: CLUSTERS[item.cluster_id]?.label || 'Unknown'
        }));
        
        setIncidents(processed);
        setLoading(false);
      } catch (e) {
        console.error("Error fetching API:", e);
        setLoading(false);
      }
    };

    fetchData();
    // Poll every 10 seconds to check for updates
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-container">
      {/* HEADER */}
      <header className="app-header">

        <div className="logo">
          <Activity size={24} color="#ef4444" />
          <h1>CrisisFlow <span className="tag">AI COMMAND</span></h1>
        </div>

        <div className="view-toggles">
          <button 
            className={viewMode === 'map' ? 'active' : ''} 
            onClick={() => setViewMode('map')}
          >
            <MapIcon size={16} /> Geospatial
          </button>

          <button 
            className={viewMode === 'neural' ? 'active' : ''} 
            onClick={() => setViewMode('neural')}
          >
            <Zap size={16} /> Neural Clusters
          </button>
        </div>

      </header>

      <div className="main-content">
        
        {/* LEFT PANEL: INCIDENT STREAM */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <h2>Incoming Feed</h2>
            <div className="live-indicator">
              <span className="blink"></span> LIVE
            </div>
          </div>
          <div className="feed">
            {loading ? <p className="loading-text">Connecting to AI Engine...</p> : incidents.map(incident => (
              <div key={incident.id} className="feed-item" style={{borderLeftColor: incident.color}}>
                <div className="feed-meta">
                  <span className="category-badge" style={{backgroundColor: incident.color}}>
                    {incident.category}
                  </span>
                  <span className="location-text">{incident.location}</span>
                </div>
                <p className="tweet-text">{incident.text}</p>
              </div>
            ))}
          </div>
        </aside>

        {/* RIGHT PANEL: VISUALIZATION */}
        <main className="viz-container">
          
          {viewMode === 'map' ? (
            <div className="map-wrapper">
              <MapContainer center={[CENTER_LAT, CENTER_LNG]} zoom={12} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  attribution='&copy; OpenStreetMap &copy; CartoDB'
                />
                {incidents.map((incident) => (
                  <CircleMarker
                    key={incident.id}
                    center={[incident.lat, incident.lng]}
                    radius={6}
                    pathOptions={{ 
                      fillColor: incident.color, 
                      color: incident.color, 
                      fillOpacity: 0.7,
                      stroke: false
                    }}
                  >
                    <Popup>
                      <div className="map-popup">
                        <strong>{incident.category}</strong>
                        <p>{incident.text}</p>
                      </div>
                    </Popup>
                  </CircleMarker>
                ))}
              </MapContainer>
              
              {/* Legend Overlay */}
              <div className="map-legend">
                <h3>Priority Index</h3>
                {Object.values(CLUSTERS).map((c, i) => (
                  <div key={i} className="legend-item">
                    <div className="dot" style={{backgroundColor: c.color}}></div>
                    <span>{c.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="charts-wrapper">
              <div className="chart-header">
                <h2>PCA Vector Space (Semantic Similarity)</h2>
                <p>The AI groups messages by meaning. Points closer together have similar intent.</p>
              </div>
              <ResponsiveContainer width="100%" height="90%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <XAxis type="number" dataKey="pca_x" name="PC1" hide />
                  <YAxis type="number" dataKey="pca_y" name="PC2" hide />
                  <RechartsTooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter name="Incidents" data={incidents} fill="#8884d8">
                    {incidents.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
