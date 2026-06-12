import { Avatar, AvatarFallback, AvatarImage, Badge, Button, Calendar, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Checkbox, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Icon, Input, IslandActivity, Label, NavigationMenu, Popover, PopoverContent, PopoverTrigger, ScrollArea, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Separator, Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, Skeleton, Switch, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Tabs, TabsContent, TabsList, TabsTrigger, Textarea, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components';

// Generated screen — scaffold rendered with the local stub component set.
export default function HomepageScreen() {
  return (
    <>
      <div className="min-h-full w-full bg-background text-foreground flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 bg-background border-b border-border sticky top-0 z-30">
          <Button variant="ghost" size="icon" data-nav="Browse" className="h-11 w-11 text-foreground"><Icon className="h-5 w-5"><circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="22" y2="22" /></Icon></Button>
          <span className="text-xl font-black tracking-tight uppercase text-foreground" style={{ "letterSpacing": "0.04em" }}>DROPHAUS</span>
          <div className="relative"><Button variant="ghost" size="icon" data-nav="Cart" className="h-11 w-11 text-foreground"><Icon className="h-5 w-5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></Icon></Button><Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground text-xs font-bold rounded-full">2</Badge></div>
        </div>
        <div className="relative w-full" style={{ "aspectRatio": "4/5", "maxHeight": "72vh" }}>
          <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80" alt="Featured drop" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0" style={{ "background": "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.18) 55%, transparent 100%)" }}></div>
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-7 flex flex-col gap-3">
            <Badge className="self-start bg-foreground text-background text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-sm">New Release</Badge>
            <div><p className="text-3xl font-black uppercase leading-tight text-white" style={{ "textShadow": "0 2px 12px rgba(0,0,0,0.4)" }}>Air Obsidian Low '25</p><p className="text-sm mt-1" style={{ "color": "rgba(255,255,255,0.72)" }}>Dropping Saturday, 8 AM — $185</p></div>
            <Button size="lg" className="w-full bg-primary text-primary-foreground font-bold text-base rounded-md h-12" data-nav="Product detail">Shop the Drop</Button>
          </div>
        </div>
        <div className="bg-background px-4 py-3 border-b border-border"><div className="flex gap-2 overflow-x-auto pb-1">
          <Button variant="default" size="sm" className="shrink-0 h-9 px-4 text-sm font-semibold rounded-full">All</Button>
          <Button variant="outline" size="sm" className="shrink-0 h-9 px-4 text-sm font-medium rounded-full border-border">Running</Button>
          <Button variant="outline" size="sm" className="shrink-0 h-9 px-4 text-sm font-medium rounded-full border-border">Lifestyle</Button>
          <Button variant="outline" size="sm" className="shrink-0 h-9 px-4 text-sm font-medium rounded-full border-border">Collabs</Button>
          <Button variant="outline" size="sm" className="shrink-0 h-9 px-4 text-sm font-medium rounded-full border-border">Sale</Button>
        </div></div>
        <div className="bg-background px-4 pt-5 pb-4">
          <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-bold text-foreground">Recent Drops</h2><Button variant="ghost" size="sm" className="text-sm text-muted-foreground h-9 px-2" data-nav="Browse">View all</Button></div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-5">
            <Card className="bg-card border-border overflow-hidden rounded-xl cursor-pointer" data-nav="Product detail"><div className="w-full bg-muted" style={{ "aspectRatio": "3/4" }}><img src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&q=80" alt="Velocity Trail X" className="w-full h-full object-cover object-center" /></div><CardContent className="px-3 py-3"><p className="text-sm font-semibold text-card-foreground leading-snug">Velocity Trail X</p><p className="text-sm text-muted-foreground mt-0.5">$140</p></CardContent></Card>
            <div className="flex flex-col gap-y-5 mt-6">
              <Card className="bg-card border-border overflow-hidden rounded-xl cursor-pointer" data-nav="Product detail"><div className="w-full bg-muted" style={{ "aspectRatio": "1/1" }}><img src="https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&q=80" alt="Court Classic Low" className="w-full h-full object-cover object-center" /></div><CardContent className="px-3 py-3"><p className="text-sm font-semibold text-card-foreground leading-snug">Court Classic Low</p><p className="text-sm text-muted-foreground mt-0.5">$95</p></CardContent></Card>
              <Card className="bg-card border-border overflow-hidden rounded-xl cursor-pointer" data-nav="Product detail"><div className="w-full bg-muted" style={{ "aspectRatio": "1/1" }}><img src="https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=400&q=80" alt="Phantom Slip Hi" className="w-full h-full object-cover object-center" /></div><CardContent className="px-3 py-3"><p className="text-sm font-semibold text-card-foreground leading-snug">Phantom Slip Hi</p><div className="flex items-center gap-2 mt-0.5"><p className="text-sm text-destructive font-semibold">$72</p><p className="text-xs text-muted-foreground line-through">$120</p></div></CardContent></Card>
            </div>
            <Card className="bg-card border-border overflow-hidden rounded-xl cursor-pointer" data-nav="Product detail"><div className="w-full bg-muted" style={{ "aspectRatio": "1/1" }}><img src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&q=80" alt="Neon Collab" className="w-full h-full object-cover object-center" /></div><CardContent className="px-3 py-3"><p className="text-sm font-semibold text-card-foreground leading-snug">Neon Collab '25</p><p className="text-sm text-muted-foreground mt-0.5">$220</p></CardContent></Card>
          </div>
        </div>
      </div>
    </>
  );
}
