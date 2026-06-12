// AUTO-GENERATED device catalog for the preview shell.
export type DeviceChrome = 'dynamic-island' | 'notch' | 'bezel' | 'punch-hole';
export interface DeviceSpec {
  id: string;
  label: string;
  os: 'ios' | 'android';
  chrome: DeviceChrome;
  width: number;
  height: number;
  safeTop: number;
  safeBottom: number;
  screenRadius: string;
  bezel: { x: number; top: number; bottom: number };
  homeIndicator: boolean;
}
export const DEVICES: DeviceSpec[] = [
  {
    "id": "iphone-17-pro",
    "label": "iPhone 17 Pro",
    "os": "ios",
    "chrome": "dynamic-island",
    "width": 402,
    "height": 874,
    "safeTop": 62,
    "safeBottom": 34,
    "screenRadius": "3rem",
    "bezel": {
      "x": 10,
      "top": 10,
      "bottom": 10
    },
    "homeIndicator": true
  },
  {
    "id": "iphone-air",
    "label": "iPhone Air",
    "os": "ios",
    "chrome": "dynamic-island",
    "width": 420,
    "height": 912,
    "safeTop": 62,
    "safeBottom": 34,
    "screenRadius": "3rem",
    "bezel": {
      "x": 7,
      "top": 7,
      "bottom": 7
    },
    "homeIndicator": true
  },
  {
    "id": "iphone-16e",
    "label": "iPhone 16e",
    "os": "ios",
    "chrome": "notch",
    "width": 390,
    "height": 844,
    "safeTop": 47,
    "safeBottom": 34,
    "screenRadius": "2.75rem",
    "bezel": {
      "x": 10,
      "top": 10,
      "bottom": 10
    },
    "homeIndicator": true
  },
  {
    "id": "galaxy-s25",
    "label": "Galaxy S25",
    "os": "android",
    "chrome": "punch-hole",
    "width": 360,
    "height": 800,
    "safeTop": 24,
    "safeBottom": 24,
    "screenRadius": "1.25rem",
    "bezel": {
      "x": 7,
      "top": 7,
      "bottom": 7
    },
    "homeIndicator": true
  },
  {
    "id": "pixel-10",
    "label": "Pixel 10",
    "os": "android",
    "chrome": "punch-hole",
    "width": 412,
    "height": 924,
    "safeTop": 24,
    "safeBottom": 24,
    "screenRadius": "1.75rem",
    "bezel": {
      "x": 8,
      "top": 8,
      "bottom": 8
    },
    "homeIndicator": true
  }
];
export const DEFAULT_DEVICE = "iphone-16e";
export function deviceById(id: string | null | undefined): DeviceSpec {
  return DEVICES.find((d) => d.id === id) ?? DEVICES.find((d) => d.id === DEFAULT_DEVICE) ?? DEVICES[0];
}
