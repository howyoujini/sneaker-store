import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

type Scalar = string | number | boolean;
type StoreState = Record<string, Scalar>;

interface Store {
  state: StoreState;
  dispatch: (action: string) => void;
}

const StoreContext = createContext<Store | null>(null);
const truthy = (v: unknown) => v !== undefined && v !== null && v !== false && v !== 0 && v !== '';

/** Applies one data-action payload (verb:key[:value]) to the state. */
function reduce(state: StoreState, action: string): StoreState {
  const [verb, key, ...rest] = action.split(':');
  if (!verb || !key) return state;
  const cur = state[key];
  const next: StoreState = { ...state };
  if (verb === 'toggle') next[key] = !truthy(cur);
  else if (verb === 'set') next[key] = rest.join(':');
  else if (verb === 'inc') next[key] = (typeof cur === 'number' ? cur : 0) + 1;
  else if (verb === 'dec') next[key] = Math.max(0, (typeof cur === 'number' ? cur : 0) - 1);
  else return state;
  return next;
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<StoreState>({});
  const dispatch = useCallback((action: string) => setState((s) => reduce(s, action)), []);
  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
}

export function useStore(): Store {
  const s = useContext(StoreContext);
  if (!s) throw new Error('useStore must be used inside StoreProvider');
  return s;
}

/** Delegated handler: a tap on (or inside) a [data-action] dispatches its payload. */
export function useActionClickCapture(): (e: React.MouseEvent) => void {
  const { dispatch } = useStore();
  return useCallback(
    (e: React.MouseEvent) => {
      const el = (e.target as HTMLElement).closest('[data-action]');
      if (!el) return;
      const action = el.getAttribute('data-action') || '';
      if (action) dispatch(action);
    },
    [dispatch],
  );
}

/**
 * Pushes store state into the static generated DOM under the root ref. Re-runs
 * on every state change AND when dep changes (a screen mount), so a freshly
 * navigated screen reflects the current state immediately.
 */
export function useStoreReflection(root: React.RefObject<HTMLElement>, dep: unknown): void {
  const { state } = useStore();
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    el.querySelectorAll<HTMLElement>('[data-bind-text]').forEach((n) => {
      const k = n.getAttribute('data-bind-text');
      if (k) n.textContent = String(state[k] ?? n.getAttribute('data-bind-default') ?? '');
    });
    el.querySelectorAll<HTMLElement>('[data-bind-on]').forEach((n) => {
      const k = n.getAttribute('data-bind-on');
      if (k) n.dataset.on = String(truthy(state[k]));
    });
    el.querySelectorAll<HTMLElement>('[data-action^="toggle:"]').forEach((n) => {
      const k = (n.getAttribute('data-action') || '').split(':')[1];
      if (k) n.dataset.on = String(truthy(state[k]));
    });
    el.querySelectorAll<HTMLElement>('[data-show-when]').forEach((n) => {
      const k = n.getAttribute('data-show-when');
      n.style.display = k && truthy(state[k]) ? '' : 'none';
    });
    el.querySelectorAll<HTMLElement>('[data-hide-when]').forEach((n) => {
      const k = n.getAttribute('data-hide-when');
      n.style.display = k && truthy(state[k]) ? 'none' : '';
    });
  }, [state, dep, root]);
}
