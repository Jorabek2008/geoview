import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
interface Proto {
  coords: any;
}
export const SetViewOnCurrentLocation: React.FC<Proto> = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.setView([coords.lat, coords.lng], 13); // Xarita koordinatalarini yangilash
    }
  }, [coords, map]);
  return null;
};
