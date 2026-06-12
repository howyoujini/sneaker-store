import { Badge, Button, Card, CardContent, Icon, Separator } from '../components';

// Generated screen — scaffold rendered with the local stub component set.
const ITEMS = [
  { name: 'Air Max 270 — Triple Black', meta: 'US 9.5 · Qty 1', price: '$150.00', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&h=120&fit=crop' },
  { name: 'Jordan 1 Retro High — Chicago', meta: 'US 10 · Qty 1', price: '$180.00', img: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=120&h=120&fit=crop' },
  { name: 'New Balance 550 — White/Green', meta: 'US 9 · Qty 1', price: '$110.00', img: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=120&h=120&fit=crop' },
];

export default function OrderConfirmationScreen() {
  return (
    <div className="min-h-full flex flex-col bg-background">

      <div className="bg-primary px-6 pt-10 pb-10 flex flex-col items-center text-center gap-4">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary-foreground/10">
          <Icon className="h-8 w-8 text-primary-foreground"><circle cx="12" cy="12" r="9" /><polyline points="7.5 12 10.5 15 16.5 9" /></Icon>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-primary-foreground">Order placed</h1>
          <p className="text-sm text-primary-foreground/80 mt-1">Thanks, Jordan. You're all set.</p>
        </div>
        <div className="flex items-center gap-2 bg-primary-foreground/10 rounded-lg px-4 py-2">
          <span className="text-xs text-primary-foreground/70 uppercase tracking-wide">Order</span>
          <span className="text-sm font-mono font-medium text-primary-foreground">#DH-209471</span>
        </div>
      </div>

      <div className="bg-primary/90 px-6 py-5 flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <Icon className="h-5 w-5 text-primary-foreground mt-0.5 shrink-0"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M8 2v4M16 2v4M3 10h18" /></Icon>
          <div>
            <p className="text-xs text-primary-foreground/70 uppercase tracking-wide">Estimated delivery</p>
            <p className="text-xl font-semibold text-primary-foreground mt-0.5">June 16 – June 18</p>
          </div>
        </div>
        <Separator className="bg-primary-foreground/20" />
        <div className="flex items-start gap-3">
          <Icon className="h-5 w-5 text-primary-foreground mt-0.5 shrink-0"><path d="M12 2C8.69 2 6 4.69 6 8c0 5 6 12 6 12s6-7 6-12c0-3.31-2.69-6-6-6z" /><circle cx="12" cy="8" r="2" /></Icon>
          <div>
            <p className="text-xs text-primary-foreground/70 uppercase tracking-wide">Shipping to</p>
            <p className="text-sm text-primary-foreground mt-0.5">Jordan Mills</p>
            <p className="text-sm text-primary-foreground/80">412 Elm St, Apt 3B, Austin TX 78701</p>
          </div>
        </div>
        <Badge className="self-start bg-primary-foreground/15 text-primary-foreground border-0 text-xs">Ships via UPS Ground</Badge>
      </div>

      <div className="px-4 py-5 flex flex-col gap-3">
        <h2 className="text-base font-semibold text-foreground px-1">Items in your order</h2>
        <Card className="bg-card">
          <CardContent className="p-0">
            {ITEMS.map((it, i) => (
              <div key={it.name} className={`flex items-center gap-3 p-4 ${i > 0 ? 'border-t border-border' : ''}`}>
                <div className="w-14 h-14 rounded-md overflow-hidden bg-muted shrink-0">
                  <img src={it.img} alt={it.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-card-foreground">{it.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{it.meta}</p>
                </div>
                <p className="text-sm font-semibold text-card-foreground shrink-0">{it.price}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <div className="flex justify-between px-1 pt-1">
          <span className="text-sm text-muted-foreground">Total</span>
          <span className="text-sm font-semibold text-foreground">$475.20</span>
        </div>
      </div>

      <div className="px-6 py-6 flex flex-col gap-4">
        <div className="flex items-start gap-3 p-4 rounded-xl bg-muted">
          <Icon className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M8 10h8M8 14h5" /></Icon>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A confirmation has been sent to <span className="font-medium text-foreground">jordan@email.com</span>. Check your inbox for your receipt and tracking details.
          </p>
        </div>
        <Button variant="ghost" size="lg" className="w-full h-12" data-nav="Homepage">
          Keep shopping
        </Button>
      </div>
    </div>
  );
}
