import {
  Circle,
  LayerGroup,
  LayersControl,
  MapContainer,
  Marker,
  Polygon,
  Popup,
  GeoJSON,
  TileLayer,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { SetViewOnCurrentLocation, ZoomButtons } from '@/components';
import { useEffect, useState } from 'react';
import { FaLocationArrow } from 'react-icons/fa6';
import { Button, Tooltip } from '@nextui-org/react';
import L from 'leaflet';
import geojson from './../../geojson.json';
interface GeoJsonFeature {
  type: string;
  properties: {
    name: string;
    capital: string;
    lat: number;
    lng: number;
  };
  geometry: {
    type: string;
    coordinates: [number, number] | number[];
  };
}

interface GeoJsonData {
  type: string;
  features: GeoJsonFeature[];
}
export const HomePage = () => {
  const position: [number, number] = [51.505, -0.09];

  const [userPosition, setUserPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [loader, setLoader] = useState<boolean>(false);

  const locateUser = () => {
    setLoader(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setLoader(false);
      },
      (err) => {
        console.error(err);
        setLoader(false);
      },
    );
  };

  const { BaseLayer, Overlay } = LayersControl;
  const [geojsonData, setGeojsonData] = useState<GeoJsonData | null>(null);

  useEffect(() => {
    setGeojsonData(geojson);
  }, []);

  const randomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const style = () => ({
    fillColor: randomColor(), // Tasodifiy rang
    weight: 1,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7,
  });
  return (
    <div>
      <MapContainer
        center={position}
        zoom={2}
        className='min-h-screen w-full -z-10 absolute top-0 left-0'
        attributionControl={true}
        zoomControl={false}
        maxBounds={[
          [-90, -180], // Janubiy-g'arbiy burchak (butun Yer koordinatalari chegarasi)
          [90, 180], // Shimoliy-sharqiy burchak
        ]}
        maxZoom={5} // Maksimal zoom darajasi
        minZoom={1}
        zoomAnimation={true}
        zoomAnimationThreshold={4}
        scrollWheelZoom={true}
        style={{ height: '100vh', width: '100%' }}
      >
        {/* Baza qatlam - OpenStreetMap */}
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

        {/* Marker qo'shish */}
        <Marker position={position}>
          <Popup>Bu joy London markazi.</Popup>
        </Marker>
        <ZoomButtons />
        <Tooltip
          showArrow
          className='bg-black text-white'
          placement='left'
          content={'Locate'}
        >
          <Button
            className='bg-black text-white absolute top-[200px] right-0 z-[1000000]'
            onClick={() => locateUser()}
          >
            <FaLocationArrow />
          </Button>
        </Tooltip>
        {userPosition && (
          <>
            {/* Foydalanuvchining hozirgi joylashuvini xaritada ko‘rsatish */}
            <Marker position={[userPosition.lat, userPosition.lng]}>
              <Popup>Bu sizning joyingiz!</Popup>
            </Marker>
            <Circle
              center={[userPosition.lat, userPosition.lng]}
              radius={500} // Radius metrda beriladi (500m)
              pathOptions={{
                // color: 'blue',
                fillColor: 'blue',
                fillOpacity: 0.2,
              }}
            />
            <SetViewOnCurrentLocation coords={userPosition} />
          </>
        )}
        {loader && (
          <div className='w-full h-screen absolute top-0 left-0 z-[10000000]'>
            <span className='loader absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'></span>
          </div>
        )}

        <div className='absolute top-[100px] right-0 z-[1000000]'>
          <LayersControl position='topright'>
            {/* Base Layers */}
            <BaseLayer checked name='OpenStreetMap'>
              <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
            </BaseLayer>

            <BaseLayer name='OpenTopoMap'>
              <TileLayer url='https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png' />
            </BaseLayer>

            {/* Overlay Layers */}
            <Overlay checked name='Markers'>
              <LayerGroup>
                <Marker position={[51.505, -0.09]}>
                  <Popup>This is a marker.</Popup>
                </Marker>
              </LayerGroup>
            </Overlay>

            <Overlay name='Circles'>
              <LayerGroup>
                <Circle
                  center={[51.508, -0.11]}
                  radius={500}
                  fillColor='blue'
                />
                <Circle center={[51.503, -0.08]} radius={300} fillColor='red' />
              </LayerGroup>
            </Overlay>

            <Overlay name='Polygon'>
              <LayerGroup>
                <Polygon
                  positions={[
                    [51.51, -0.12],
                    [51.5, -0.13],
                    [51.52, -0.14],
                  ]}
                  fillColor='green'
                />
              </LayerGroup>
            </Overlay>
          </LayersControl>
        </div>

        {geojsonData && (
          <GeoJSON style={style} data={geojsonData as GeoJSON.GeoJsonObject}>
            {geojsonData.features.map((feature, index) => {
              const { lat, lng, capital, name } = feature.properties;
              return (
                <Marker key={index} position={[lat, lng]}>
                  <Popup>
                    <strong>{name}</strong>
                    <br />
                    Capital: {capital}
                  </Popup>
                </Marker>
              );
            })}
          </GeoJSON>
        )}
      </MapContainer>
    </div>
  );
};
