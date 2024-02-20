import { useEffect, useRef } from 'react';
import Map from 'ol/Map';
import './index.css';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';

const Openlayers = () => {
  const mapRef = useRef();

  useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });
  }, []);

  const addPoint = (point) => {};

  return <div id={'map'} ref={mapRef}></div>;
};

export default Openlayers;
