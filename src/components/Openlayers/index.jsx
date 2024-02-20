import { useEffect, useRef } from 'react';
import Map from 'ol/Map';
import './index.css';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import { Feature } from 'ol';
import { Circle, Point, Polygon } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Select from 'ol/interaction/Select.js';
import DragBox from 'ol/interaction/DragBox.js'

import * as ol from 'ol'
import { fromExtent } from 'ol/geom/Polygon';

const Openlayers = () => {
  const mapDomRef = useRef();
  const mapInsRef = useRef()

  useEffect(() => {
    const map = new Map({
      target: mapDomRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [12000000, 4000000],
        zoom: 2,
      }),
    });

    //创建一个点
    var point = new Feature({
      geometry: new Point(fromLonLat([113, 34]))
    });

    //实例化一个矢量图层Vector作为绘制层
    var source = new VectorSource({
        features: [point]
    });
    //创建一个图层
    var vector = new VectorLayer({
        source: source
    });
    //将绘制层添加到地图容器中
    map.addLayer(vector);

    var dragBox = new DragBox();

    // 监听框选结束事件
    dragBox.on('boxend', function () {
      var extent = dragBox.getGeometry().getExtent();

      var geometry = fromExtent(extent)
      var feature = new ol.Feature({
        geometry: geometry
      });
      const source = new VectorSource({
        features: [feature]
      })
      const layer = new VectorLayer({
        source: source
      })
      feature.setStyle(new Style({
        stroke: new Stroke({
          color: 'blue',
          width: 2
        }),
        fill: new Fill({
          color: 'rgba(0, 0, 255, 0.1)'
        })
      }));

      map.addLayer(layer)
      
      map.getLayers().forEach(function (layer) {
        if (layer instanceof VectorLayer) {
          layer.getSource().forEachFeatureIntersectingExtent(extent, function (feature) {
            var coordinate = feature.getGeometry().getCoordinates();
            console.log(feature)
          });
        }
      });
    });

    map.addInteraction(dragBox)

  }, []);

  return <div id={'map'} ref={mapDomRef}></div>;
};

export default Openlayers;
