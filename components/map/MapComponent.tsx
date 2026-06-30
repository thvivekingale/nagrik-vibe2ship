'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Issue, categoryIcons } from '@/lib/mockData';
import 'leaflet/dist/leaflet.css';

// Fix for leaflet marker icons
const defaultIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface MapComponentProps {
  issues: Issue[];
  selectedIssue: string | null;
  onSelectIssue: (id: string) => void;
}

export default function MapComponent({ issues, selectedIssue, onSelectIssue }: MapComponentProps) {
  // Center of New Delhi (example city)
  const center: [number, number] = [28.6139, 77.209];

  return (
    <MapContainer center={center} zoom={14} style={{ height: '100%', width: '100%', position: 'absolute', top: 0, left: 0 }} className="!h-full !w-full">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {issues.map((issue) => (
        <Marker
          key={issue.id}
          position={[issue.latitude, issue.longitude]}
          icon={defaultIcon}
          eventHandlers={{
            click: () => {
              onSelectIssue(issue.id);
            },
          }}
        >
          <Popup closeButton={false}>
            <div className="p-2 text-sm" onClick={() => onSelectIssue(issue.id)}>
              <p className="font-semibold">{issue.title}</p>
              <p className="text-xs text-muted-foreground">{issue.status}</p>
              <p className="text-xs">
                {categoryIcons[issue.category]} {issue.category}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
