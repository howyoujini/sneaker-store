import React from 'react';
// Minimal shadcn/ui-style stubs — visual approximation to render generated screens.
type P = { className?: string; style?: React.CSSProperties; children?: React.ReactNode; [k: string]: unknown };
const cn = (...p: (string | undefined)[]) => p.filter(Boolean).join(' ');
// Forward the DOM-safe leftovers (data-nav wiring, aria, ids) to the root
// element — without this, <Card data-nav="…"> would silently drop its tap target.
const dom = (rest: Record<string, unknown>) => {
  const out: Record<string, unknown> = {};
  for (const k in rest) {
    if (k.startsWith('data-') || k.startsWith('aria-') || k === 'id' || k === 'role') out[k] = rest[k];
  }
  return out;
};

export const Card = ({ className, style, children, ...rest }: P) => <div {...dom(rest)} className={cn('rounded-xl border border-border bg-card', className)} style={style}>{children}</div>;
export const CardHeader = ({ className, style, children, ...rest }: P) => <div {...dom(rest)} className={cn('flex flex-col gap-1.5 p-4', className)} style={style}>{children}</div>;
export const CardTitle = ({ className, style, children, ...rest }: P) => <h3 {...dom(rest)} className={cn('font-semibold leading-none', className)} style={style}>{children}</h3>;
export const CardDescription = ({ className, style, children, ...rest }: P) => <p {...dom(rest)} className={cn('text-sm text-muted-foreground', className)} style={style}>{children}</p>;
export const CardContent = ({ className, style, children, ...rest }: P) => <div {...dom(rest)} className={cn('p-4', className)} style={style}>{children}</div>;
export const CardFooter = ({ className, style, children, ...rest }: P) => <div {...dom(rest)} className={cn('flex items-center p-4 pt-0', className)} style={style}>{children}</div>;
export const ScrollArea = ({ className, style, children, ...rest }: P) => <div {...dom(rest)} className={cn('overflow-auto', className)} style={style}>{children}</div>;
export const Separator = ({ className, style, orientation, ...rest }: P) => orientation === 'vertical' ? <span {...dom(rest)} className={cn('inline-block w-px self-stretch bg-border', className)} style={style} /> : <div {...dom(rest)} className={cn('h-px w-full bg-border', className)} style={style} />;
export const NavigationMenu = ({ className, style, children, ...rest }: P) => <nav {...dom(rest)} className={cn('flex items-center', className)} style={style}>{children}</nav>;
export const Label = ({ className, style, children, htmlFor, ...rest }: P) => <label {...dom(rest)} htmlFor={htmlFor as string} className={cn('text-sm font-medium', className)} style={style}>{children}</label>;
// Editable (uncontrolled): a seeded value rides in as defaultValue so the field
// shows realistic content AND the user can actually type into it.
export const Input = ({ className, style, type, placeholder, defaultValue, value, id, ...rest }: P) => <input {...dom(rest)} id={id as string} type={(type as string) ?? 'text'} placeholder={placeholder as string} defaultValue={(value ?? defaultValue) as string} className={cn('flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-ring', className)} style={style} />;
export const Textarea = ({ className, style, placeholder, defaultValue, value, id, ...rest }: P) => <textarea {...dom(rest)} id={id as string} placeholder={placeholder as string} defaultValue={(value ?? defaultValue) as string} className={cn('flex min-h-[72px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-ring', className)} style={style} />;
export const Button = ({ className, style, children, variant = 'default', size = 'default', ...rest }: P) => {
  const v: Record<string, string> = { default: 'bg-primary text-primary-foreground', outline: 'border border-input bg-background text-foreground', ghost: 'text-foreground', link: 'text-primary underline-offset-4', destructive: 'bg-destructive text-destructive-foreground', secondary: 'bg-muted text-foreground' };
  const s: Record<string, string> = { default: 'h-9 px-4', sm: 'h-8 px-3', lg: 'h-11 px-8', icon: 'h-9 w-9' };
  return <button {...dom(rest)} className={cn('inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors active:opacity-80', v[variant as string] ?? v.default, s[size as string] ?? s.default, className)} style={style}>{children}</button>;
};
// Tapping the track flips it — seeded by the checked/defaultChecked prop, then
// owns its own state so a settings screen actually responds to touch.
export const Switch = ({ className, style, checked, defaultChecked, ...rest }: P) => {
  const [on, setOn] = React.useState(Boolean(checked ?? defaultChecked));
  return <button type="button" role="switch" aria-checked={on} {...dom(rest)} onClick={() => setOn((v) => !v)} className={cn('relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors', on ? 'bg-primary' : 'bg-muted', className)} style={style}><span className={cn('absolute h-5 w-5 rounded-full bg-white shadow transition-all', on ? 'right-0.5' : 'left-0.5')} /></button>;
};
export const Checkbox = ({ className, style, checked, defaultChecked, ...rest }: P) => {
  const [on, setOn] = React.useState(Boolean(checked ?? defaultChecked));
  return <button type="button" role="checkbox" aria-checked={on} {...dom(rest)} onClick={() => setOn((v) => !v)} className={cn('inline-flex h-4 w-4 items-center justify-center rounded border transition-colors', on ? 'border-primary bg-primary text-primary-foreground' : 'border-input', className)} style={style}>{on ? <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg> : null}</button>;
};
export const Avatar = ({ className, style, children, ...rest }: P) => <span {...dom(rest)} className={cn('inline-flex items-center justify-center overflow-hidden rounded-full bg-muted', className)} style={style}>{children}</span>;
export const AvatarImage = ({ className, style, src, alt, ...rest }: P) => <img {...dom(rest)} src={src as string} alt={alt as string} className={cn('h-full w-full object-cover', className)} style={style} />;
export const AvatarFallback = ({ className, style, children, ...rest }: P) => <span {...dom(rest)} className={cn('flex h-full w-full items-center justify-center text-sm', className)} style={style}>{children}</span>;
export const Badge = ({ className, style, children, ...rest }: P) => <span {...dom(rest)} className={cn('inline-flex items-center rounded-full border border-border px-2 py-0.5 text-xs font-medium', className)} style={style}>{children}</span>;
// Line-icon frame: fixes the icon discipline (24 grid, stroke-only, round
// caps, currentColor) while the PATHS are drawn by the screen author — no
// glyph set is baked in, and emoji never stand in for icons.
export const Icon = ({ className, style, children, ...rest }: P) => <svg {...dom(rest)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={cn('h-5 w-5 shrink-0', className)} style={style}>{children}</svg>;
// Real tab switching: Tabs holds the active value (seeded from defaultValue),
// a TabsTrigger sets it on tap, and only the matching TabsContent renders — so
// flipping a tab actually swaps the panel, the way a product does.
const TabsCtx = React.createContext<{ active: unknown; setActive: (v: unknown) => void } | null>(null);
export const Tabs = ({ className, style, children, defaultValue, value, ...rest }: P) => {
  const [active, setActive] = React.useState<unknown>(value ?? defaultValue);
  return <TabsCtx.Provider value={{ active: value ?? active, setActive }}><div {...dom(rest)} className={className} style={style}>{children}</div></TabsCtx.Provider>;
};
export const TabsList = ({ className, style, children, ...rest }: P) => <div {...dom(rest)} className={cn('inline-flex items-center gap-1 rounded-lg bg-muted p-1', className)} style={style}>{children}</div>;
export const TabsTrigger = ({ className, style, children, value, ...rest }: P) => {
  const t = React.useContext(TabsCtx);
  const on = t != null && t.active === value;
  return <button {...dom(rest)} onClick={() => t?.setActive(value)} className={cn('rounded-md px-3 py-1 text-sm transition-colors', on ? 'bg-background font-medium text-foreground shadow-sm' : 'text-muted-foreground', className)} style={style}>{children}</button>;
};
export const TabsContent = ({ className, style, children, value, ...rest }: P) => {
  const t = React.useContext(TabsCtx);
  if (t != null && t.active !== value) return null;
  return <div {...dom(rest)} className={cn('mt-2', className)} style={style}>{children}</div>;
};
export const Calendar = ({ className, style, ...rest }: P) => <div {...dom(rest)} className={cn('rounded-md border border-border p-3 text-xs text-muted-foreground', className)} style={style}>[calendar]</div>;
// Real dropdown: the trigger opens the list, picking an item sets the displayed
// value and closes it — SelectContent/SelectItem are no longer dead nulls.
const SelectCtx = React.createContext<{ open: boolean; setOpen: (v: boolean) => void; value: React.ReactNode; pick: (v: React.ReactNode) => void } | null>(null);
export const Select = ({ className, style, children, defaultValue, value, ...rest }: P) => {
  const [open, setOpen] = React.useState(false);
  const [picked, setPicked] = React.useState<React.ReactNode>((value ?? defaultValue) as React.ReactNode);
  const pick = (v: React.ReactNode) => { setPicked(v); setOpen(false); };
  return <SelectCtx.Provider value={{ open, setOpen, value: picked, pick }}><div {...dom(rest)} className={cn('relative', className)} style={style}>{children}</div></SelectCtx.Provider>;
};
export const SelectTrigger = ({ className, style, children, ...rest }: P) => {
  const s = React.useContext(SelectCtx);
  return <div {...dom(rest)} onClick={() => s?.setOpen(!s.open)} className={cn('inline-flex h-9 w-full cursor-pointer items-center justify-between gap-2 rounded-md border border-input bg-background px-3 text-sm', className)} style={style}>{children}<span className="text-muted-foreground">▾</span></div>;
};
export const SelectValue = ({ placeholder, children }: P) => {
  const s = React.useContext(SelectCtx);
  return <span className="truncate">{(s?.value ?? children ?? placeholder) as React.ReactNode}</span>;
};
export const SelectContent = ({ className, style, children, ...rest }: P) => {
  const s = React.useContext(SelectCtx);
  if (!s?.open) return null;
  return <div {...dom(rest)} className={cn('absolute left-0 top-full z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-border bg-card p-1 shadow-md', className)} style={style}>{children}</div>;
};
export const SelectItem = ({ className, style, children, ...rest }: P) => {
  const s = React.useContext(SelectCtx);
  return <div {...dom(rest)} onClick={() => s?.pick(children as React.ReactNode)} className={cn('cursor-pointer rounded px-2 py-1.5 text-sm hover:bg-muted', className)} style={style}>{children}</div>;
};
export const Table = ({ className, style, children, ...rest }: P) => <table {...dom(rest)} className={cn('w-full text-sm', className)} style={style}>{children}</table>;
export const TableHeader = ({ className, style, children, ...rest }: P) => <thead {...dom(rest)} className={className} style={style}>{children}</thead>;
export const TableBody = ({ className, style, children, ...rest }: P) => <tbody {...dom(rest)} className={className} style={style}>{children}</tbody>;
export const TableRow = ({ className, style, children, ...rest }: P) => <tr {...dom(rest)} className={cn('border-b border-border', className)} style={style}>{children}</tr>;
export const TableHead = ({ className, style, children, ...rest }: P) => <th {...dom(rest)} className={cn('px-2 py-2 text-left font-medium text-muted-foreground', className)} style={style}>{children}</th>;
export const TableCell = ({ className, style, children, ...rest }: P) => <td {...dom(rest)} className={cn('px-2 py-2', className)} style={style}>{children}</td>;
export const Skeleton = ({ className, style, ...rest }: P) => <div {...dom(rest)} className={cn('animate-pulse rounded-md bg-muted', className)} style={style} />;

// --- Openable primitives: dialogs/sheets/popovers really open and close. ---
// Overlays are absolute, so they float inside the device frame (the screen is
// the positioned ancestor), the way a real app's modal stays on the phone.
const OpenCtx = React.createContext<{ open: boolean; setOpen: (v: boolean) => void } | null>(null);
const useOpenable = () => React.useContext(OpenCtx);

export const Dialog = ({ children }: P) => {
  const [open, setOpen] = React.useState(false);
  return <OpenCtx.Provider value={{ open, setOpen }}>{children}</OpenCtx.Provider>;
};
export const DialogTrigger = ({ children, className, style, ...rest }: P) => {
  const o = useOpenable();
  return <span {...dom(rest)} className={cn('contents', className)} style={style} onClick={() => o?.setOpen(true)}>{children}</span>;
};
export const DialogContent = ({ children, className, style, ...rest }: P) => {
  const o = useOpenable();
  if (!o?.open) return null;
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/50" onClick={() => o.setOpen(false)}>
      <div {...dom(rest)} className={cn('max-h-[80%] w-full overflow-auto rounded-2xl bg-card p-5 shadow-xl', className)} style={style} onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};
export const DialogHeader = ({ className, style, children }: P) => <div className={cn('mb-3 flex flex-col gap-1', className)} style={style}>{children}</div>;
export const DialogTitle = ({ className, style, children }: P) => <h2 className={cn('text-lg font-semibold', className)} style={style}>{children}</h2>;
export const DialogDescription = ({ className, style, children }: P) => <p className={cn('text-sm text-muted-foreground', className)} style={style}>{children}</p>;
export const DialogFooter = ({ className, style, children }: P) => <div className={cn('mt-4 flex justify-end gap-2', className)} style={style}>{children}</div>;
export const DialogClose = ({ children, className, style }: P) => {
  const o = useOpenable();
  return <span className={cn('contents', className)} style={style} onClick={() => o?.setOpen(false)}>{children}</span>;
};

export const Sheet = ({ children }: P) => {
  const [open, setOpen] = React.useState(false);
  return <OpenCtx.Provider value={{ open, setOpen }}>{children}</OpenCtx.Provider>;
};
export const SheetTrigger = ({ children, className, style, ...rest }: P) => {
  const o = useOpenable();
  return <span {...dom(rest)} className={cn('contents', className)} style={style} onClick={() => o?.setOpen(true)}>{children}</span>;
};
export const SheetContent = ({ children, className, style, ...rest }: P) => {
  const o = useOpenable();
  if (!o?.open) return null;
  return (
    <div className="absolute inset-0 z-50 bg-black/40" onClick={() => o.setOpen(false)}>
      <div {...dom(rest)} className={cn('absolute inset-x-0 bottom-0 max-h-[85%] overflow-auto rounded-t-2xl bg-card p-5 pb-[calc(var(--safe-bottom)+1.25rem)] shadow-xl', className)} style={style} onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};
export const SheetHeader = ({ className, style, children }: P) => <div className={cn('mb-3 flex flex-col gap-1', className)} style={style}>{children}</div>;
export const SheetTitle = ({ className, style, children }: P) => <h2 className={cn('text-lg font-semibold', className)} style={style}>{children}</h2>;

export const Popover = ({ children, className, style }: P) => {
  const [open, setOpen] = React.useState(false);
  return <OpenCtx.Provider value={{ open, setOpen }}><span className={cn('relative inline-block', className)} style={style}>{children}</span></OpenCtx.Provider>;
};
export const PopoverTrigger = ({ children, className, style }: P) => {
  const o = useOpenable();
  return <span className={cn('contents', className)} style={style} onClick={() => o?.setOpen(!o.open)}>{children}</span>;
};
export const PopoverContent = ({ children, className, style }: P) => {
  const o = useOpenable();
  if (!o?.open) return null;
  return <div className={cn('absolute left-1/2 top-full z-50 mt-2 w-64 -translate-x-1/2 rounded-md border border-border bg-card p-3 shadow-md', className)} style={style}>{children}</div>;
};

export const Tooltip = ({ children }: P) => <>{children}</>;
export const TooltipProvider = ({ children }: P) => <>{children}</>;
export const TooltipTrigger = ({ children }: P) => <>{children}</>;
export const TooltipContent = (_p: P) => null;

// Dynamic-Island live-activity slot. Renders at the island position (the
// screen is the positioned ancestor); CSS in index.html keeps it hidden unless
// the selected device's chrome is 'dynamic-island', so screens never branch on
// the device. Tap toggles compact ↔ expanded, like a real Live Activity.
export const IslandActivity = ({ className, style, children, ...rest }: P) => {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <div
      {...dom(rest)}
      data-island-activity
      onClick={() => setExpanded((v) => !v)}
      className={cn(
        'absolute left-1/2 top-[11px] z-[60] -translate-x-1/2 cursor-pointer items-center overflow-hidden bg-zinc-950 text-white shadow-lg transition-all duration-300',
        expanded ? 'w-[92%] max-w-96 rounded-[28px] p-4' : 'h-[37px] min-w-[180px] max-w-[70%] rounded-full px-4 text-[11px]',
      )}
      style={style}
    >
      <div className={cn('flex w-full items-center justify-between gap-3', className)}>{children}</div>
    </div>
  );
};
