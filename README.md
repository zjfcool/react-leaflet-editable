# react-leaflet-editable[![](https://img.shields.io/npm/v/react-leaflet-editable.svg)](https://www.npmjs.com/package/react-leaflet-editable)

Leaflet.Editable for React-Leaflet (>=4.0.0)

## Demo

[example](https://zjfcool.github.io/react-leaflet-editable/)

## Installation

```bash
npm install react-leaflet-editable
```

## Quick Start

### Notes

- Import `leaflet-editable` before rendering.
- Ensure `MapContainer` has `editable={true}`.
- Must be rendered inside a `MapContainer`.
- The forwarded ref (`editToolsRef.current`) is a proxy to the `Leaflet.Editable` instance's `editTools`, exposing all its methods and properties.

```tsx
import "leaflet/dist/leaflet.css";
import "leaflet-editable";
import { MapContainer, TileLayer } from "react-leaflet";
import { LeafletEditable, type LeafletEditableHandleProps } from "react-leaflet-editable";
import { useRef } from "react";

function Demo() {
  const editToolsRef = useRef<LeafletEditableHandleProps>(null);

  const startPolygon = () => {
    editToolsRef.current.startPolygon();
  };

  return (
    <MapContainer center={[35, 105]} zoom={4} style={{ height: "100vh" }} editable={true}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LeafletEditable ref={editToolsRef} />
      <button onClick={startPolygon}>Start Polygon</button>
    </MapContainer>
  );
}
```

## API

[Leaflet.Editable API](http://leaflet.github.io/Leaflet.Editable/doc/api.html)

### Props

Pass event callback props to listen for `Leaflet.Editable` events (e.g., `onDrawingStart` → `editable:drawing:start`).

### Methods

`editToolsRef.current` exposes all `Leaflet.Editable` `editTools` methods and properties.

## License

[MIT](LICENSE.md)
