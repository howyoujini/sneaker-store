import React, { createContext, useCallback, useContext, useState } from 'react';
import { screens } from './screens/manifest';

// Screens reachable from primary navigation: tapping these replaces the stack
// (tab-bar semantics); everything else pushes (drill-in semantics).
export const TAB_SCREENS: string[] = ["Home","Browse","Cart","Account"];

const norm = (s: string) => s.trim().toLowerCase();

export function screenIndex(label: string): number {
  return screens.findIndex((s) => norm(s.label) === norm(label));
}

// Direction drives the screen transition: a drill-in slides in from the right,
// a back slides the other way, a tab switch cross-fades — the motion the OS
// gives navigation, so the flow reads as a real app, not a slide deck.
type NavDirection = 'forward' | 'back' | 'replace';

interface Nav {
  current: number;
  canBack: boolean;
  direction: NavDirection;
  navigate: (label: string) => void;
  back: () => void;
  jump: (index: number) => void;
}

const NavContext = createContext<Nav | null>(null);

export function NavProvider({ initial, children }: { initial: number; children: React.ReactNode }) {
  const [stack, setStack] = useState<number[]>([initial]);
  const [direction, setDirection] = useState<NavDirection>('replace');
  const navigate = useCallback((label: string) => {
    const i = screenIndex(label);
    if (i < 0) return; // unknown data-nav target — ignore the tap
    const isTab = TAB_SCREENS.some((t) => norm(t) === norm(label));
    setDirection(isTab ? 'replace' : 'forward');
    setStack((s) => (isTab ? [i] : s[s.length - 1] === i ? s : [...s, i]));
  }, []);
  const back = useCallback(() => {
    setDirection('back');
    setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  }, []);
  const jump = useCallback((index: number) => {
    setDirection('replace');
    setStack([index]);
  }, []);
  const value: Nav = {
    current: stack[stack.length - 1] ?? 0,
    canBack: stack.length > 1,
    direction,
    navigate,
    back,
    jump,
  };
  return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
}

export function useNav(): Nav {
  const nav = useContext(NavContext);
  if (!nav) throw new Error('useNav must be used inside NavProvider');
  return nav;
}

/** Delegated click handler: resolves data-nav taps anywhere in the screen JSX. */
export function useNavClickCapture(): (e: React.MouseEvent) => void {
  const nav = useNav();
  return useCallback(
    (e: React.MouseEvent) => {
      const el = (e.target as HTMLElement).closest('[data-nav]');
      if (!el) return;
      const target = el.getAttribute('data-nav') ?? '';
      e.preventDefault();
      e.stopPropagation();
      if (norm(target) === 'back') nav.back();
      else nav.navigate(target);
    },
    [nav],
  );
}
