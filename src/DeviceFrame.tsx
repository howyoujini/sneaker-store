import React from 'react';
import type { DeviceSpec } from './devices';

function StatusBar({ device }: { device: DeviceSpec }) {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 z-40 flex items-center justify-between px-7 text-[13px] font-semibold text-foreground"
    >
      <span>9:41</span>
      <span className="flex items-center gap-1.5">
        <span className="flex items-end gap-[2px]">
          <span className="h-[4px] w-[3px] rounded-[1px] bg-current" />
          <span className="h-[6px] w-[3px] rounded-[1px] bg-current" />
          <span className="h-[8px] w-[3px] rounded-[1px] bg-current" />
          <span className="h-[10px] w-[3px] rounded-[1px] bg-current" />
        </span>
        <span className="relative h-[11px] w-[24px] rounded-[3px] border border-current/40">
          <span className="absolute inset-[2px] right-[7px] rounded-[1px] bg-current" />
        </span>
      </span>
    </div>
  );
}

function Cutout({ chrome }: { chrome: DeviceSpec['chrome'] }) {
  if (chrome === 'dynamic-island') {
    return <div className="absolute left-1/2 top-[11px] z-50 h-[37px] w-[125px] -translate-x-1/2 rounded-full bg-zinc-950" />;
  }
  if (chrome === 'notch') {
    return <div className="absolute left-1/2 top-0 z-50 h-[34px] w-40 -translate-x-1/2 rounded-b-2xl bg-zinc-950" />;
  }
  if (chrome === 'punch-hole') {
    return <div className="absolute left-1/2 top-1.5 z-50 h-3 w-3 -translate-x-1/2 rounded-full bg-zinc-950" />;
  }
  return null; // plain bezel has no cutout
}

export function DeviceFrame({ device, children }: { device: DeviceSpec; children?: React.ReactNode }) {
  const { bezel } = device;
  return (
    <div
      data-device-frame={device.id}
      data-chrome={device.chrome}
      className="relative shadow-2xl bg-zinc-900"
      style={{
        padding: bezel.top + 'px ' + bezel.x + 'px ' + bezel.bottom + 'px',
        borderRadius:
          device.chrome === 'bezel' ? '2.5rem' : 'calc(' + device.screenRadius + ' + ' + bezel.x + 'px)',
      }}
    >
      <div
        className="relative overflow-hidden bg-background text-foreground"
        style={
          {
            width: device.width,
            height: device.height,
            borderRadius: device.screenRadius,
            '--safe-top': device.safeTop + 'px',
            '--safe-bottom': device.safeBottom + 'px',
          } as React.CSSProperties
        }
      >
        <div data-screen-viewport className="h-full overflow-y-auto overscroll-contain">
          {children}
        </div>
        <StatusBar device={device} />
        <Cutout chrome={device.chrome} />
        {device.homeIndicator ? (
          <div className="pointer-events-none absolute bottom-2 left-1/2 z-50 h-[5px] w-32 -translate-x-1/2 rounded-full bg-foreground/30" />
        ) : null}
      </div>
      {device.chrome === 'bezel' ? (
        <div
          className="absolute -translate-x-1/2 border-2 rounded-full left-1/2 h-11 w-11 border-zinc-600"
          style={{ bottom: Math.max((bezel.bottom - 44) / 2, 4) }}
        />
      ) : null}
    </div>
  );
}
