import { useEffect, useRef, useState } from 'react';
import { DeviceFrame } from './DeviceFrame';
import { DEVICES, type DeviceSpec, deviceById } from './devices';
import { IA_TREE, NAV_TYPE, type IaNode } from './ia';
import { NavProvider, screenIndex, useNav, useNavClickCapture } from './nav';
import { StoreProvider, useActionClickCapture, useStoreReflection } from './store';
import { screens } from './screens/manifest';

// Expose the screen labels so the capture script can deep-link each screen
// (?screen=<index>) with no app-specific click flow.
if (typeof window !== 'undefined') {
  (window as any).__screens = screens.map((s) => s.label);
}

const params = () =>
  typeof location === 'undefined' ? new URLSearchParams() : new URLSearchParams(location.search);

function initialScreen(): number {
  const n = Number(params().get('screen'));
  return Number.isInteger(n) && n >= 0 && n < screens.length ? n : 0;
}

// Screenshot mode: the capture harness appends &shoot=1 so the dock is hidden
// and the frame renders at scale 1 for pixel-stable captures.
const SHOOT_MODE = params().get('shoot') === '1';

function useFitScale(device: DeviceSpec): number {
  const outerW = device.width + device.bezel.x * 2;
  const outerH = device.height + device.bezel.top + device.bezel.bottom;
  const fit = () => {
    if (SHOOT_MODE || typeof window === 'undefined') return 1;
    return Math.min(1, (window.innerWidth - 32) / outerW, (window.innerHeight - 88) / outerH);
  };
  const [scale, setScale] = useState(fit);
  useEffect(() => {
    setScale(fit());
    const onResize = () => setScale(fit());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [device.id]);
  return scale;
}

// Appearance toggle: flips data-theme on <html> so the theme.css variables
// swap wholesale — the same mechanism the ?theme= deep link and the capture
// harness use, so what the dock shows is exactly what gets shot.
function useThemeToggle(): { mode: string; toggle: () => void } {
  const [mode, setMode] = useState(() =>
    typeof document === 'undefined' || document.documentElement.dataset.theme !== 'dark'
      ? 'light'
      : 'dark',
  );
  const toggle = () => {
    const next = mode === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    setMode(next);
  };
  return { mode, toggle };
}

// The IA tree the screens panel renders. When no IA shipped (e.g. a preview
// assembled without one), fall back to the flat manifest so every screen
// stays reachable.
const treeRoots: IaNode[] =
  IA_TREE.length > 0 ? IA_TREE : screens.map((s) => ({ label: s.label, children: [] }));

function flattenTree(nodes: IaNode[], depth = 0): Array<{ node: IaNode; depth: number }> {
  return nodes.flatMap((node) => [{ node, depth }, ...flattenTree(node.children, depth + 1)]);
}

// The screens panel: the IA drawn as a TREE (nav items as roots, drill-in
// screens nested beneath their parent), not a linear list — so the structure
// the IA step committed to stays visible while flipping through screens.
function IaPanel({ onJump }: { onJump: () => void }) {
  const nav = useNav();
  const rows = flattenTree(treeRoots);
  return (
    <div
      data-ia-panel
      className="absolute bottom-16 left-1/2 z-[80] max-h-[70%] w-72 -translate-x-1/2 overflow-y-auto rounded-2xl border border-zinc-300 bg-white/95 p-2 shadow-xl backdrop-blur"
    >
      <div className="px-2 pb-1.5 pt-0.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
        {NAV_TYPE ? 'Structure · ' + NAV_TYPE : 'Screens'}
      </div>
      {rows.map(({ node, depth }, i) => {
        const idx = screenIndex(node.screen ?? node.label);
        const isCurrent = idx >= 0 && idx === nav.current;
        return (
          <button
            key={node.label + '-' + i}
            disabled={idx < 0}
            onClick={() => {
              if (idx >= 0) {
                nav.jump(idx);
                onJump();
              }
            }}
            style={{ paddingLeft: 8 + depth * 16 }}
            className={`flex w-full items-center gap-1.5 rounded-lg py-1.5 pr-2 text-left text-[12px] ${isCurrent ? 'bg-zinc-900 font-medium text-white' : idx >= 0 ? 'text-zinc-700 hover:bg-zinc-100' : 'cursor-default text-zinc-400'}`}
          >
            {depth > 0 ? <span className={isCurrent ? 'text-white/50' : 'text-zinc-300'}>└</span> : null}
            <span className="truncate">{node.label}</span>
            {idx < 0 ? (
              <span className="ml-auto text-[9px] uppercase tracking-wide text-zinc-300">group</span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

function Dock({
  device,
  onDevice,
  iaOpen,
  onToggleIa,
}: {
  device: DeviceSpec;
  onDevice: (d: DeviceSpec) => void;
  iaOpen: boolean;
  onToggleIa: () => void;
}) {
  const nav = useNav();
  const theme = useThemeToggle();
  return (
    <div className="absolute bottom-4 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-1 rounded-full border border-zinc-300 bg-white/90 px-2 py-1.5 shadow-lg backdrop-blur">
      {DEVICES.map((d) => (
        <button
          key={d.id}
          onClick={() => onDevice(d)}
          title={d.label}
          className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${d.id === device.id ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:bg-zinc-100'}`}
        >
          {d.label}
        </button>
      ))}
      <span className="w-px h-4 mx-1 bg-zinc-300" />
      <button
        onClick={onToggleIa}
        title="Screens (information architecture)"
        className={`flex max-w-44 items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium ${iaOpen ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:bg-zinc-100'}`}
      >
        <span className="truncate">{screens[nav.current]?.label}</span>
        <span className={iaOpen ? 'text-white/60' : 'text-zinc-400'}>{iaOpen ? '▴' : '▾'}</span>
      </button>
      <span className="w-px h-4 mx-1 bg-zinc-300" />
      <button
        onClick={theme.toggle}
        title="Toggle light/dark"
        className="rounded-full px-2 py-1 text-[11px] font-medium text-zinc-600 hover:bg-zinc-100"
      >
        {theme.mode === 'dark' ? '☀' : '☾'}
      </button>
    </div>
  );
}

function Stage({ device, onDevice }: { device: DeviceSpec; onDevice: (d: DeviceSpec) => void }) {
  const nav = useNav();
  const onNav = useNavClickCapture();
  const onAction = useActionClickCapture();
  const scale = useFitScale(device);
  const [iaOpen, setIaOpen] = useState(false);
  const screenRef = useRef<HTMLDivElement>(null);
  // Reflect store state into the freshly mounted screen (re-runs on every
  // navigation and every state change).
  useStoreReflection(screenRef, nav.current);
  // Expose the current screen label so the interaction audit can assert that a
  // data-nav tap actually landed on its target (mirrors window.__screens).
  useEffect(() => {
    if (typeof window !== 'undefined') (window as any).__currentScreen = screens[nav.current]?.label ?? '';
  }, [nav.current]);
  const Screen = screens[nav.current]?.Component;
  // One delegated capture handler: data-action mutates state, data-nav moves
  // screens. Action runs first so a control can do both if it ever needs to.
  const onClickCapture = (e) => {
    onAction(e);
    onNav(e);
  };
  return (
    <div className="relative flex items-center justify-center h-full">
      <div style={{ transform: 'scale(' + scale + ')' }} onClickCapture={onClickCapture}>
        <DeviceFrame device={device}>
          {Screen ? (
            // Keyed on the current screen so each navigation remounts and
            // retriggers the slide/fade. Disabled under shoot mode for
            // pixel-stable captures.
            <div ref={screenRef} key={nav.current} data-screen-anim={SHOOT_MODE ? undefined : nav.direction} className="h-full">
              <Screen />
            </div>
          ) : null}
        </DeviceFrame>
      </div>
      {SHOOT_MODE ? null : (
        <>
          {iaOpen ? <IaPanel onJump={() => setIaOpen(false)} /> : null}
          <Dock
            device={device}
            onDevice={onDevice}
            iaOpen={iaOpen}
            onToggleIa={() => setIaOpen((v) => !v)}
          />
        </>
      )}
    </div>
  );
}

export function App() {
  const [device, setDevice] = useState<DeviceSpec>(() => deviceById(params().get('device')));
  return (
    <StoreProvider>
    <NavProvider initial={initialScreen()}>
      <Stage device={device} onDevice={setDevice} />
    </NavProvider>
    </StoreProvider>
  );
}
