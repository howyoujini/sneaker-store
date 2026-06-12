import { Badge, Button, Card, CardContent, Icon, Input, Separator } from '../components';

// Generated screen — scaffold rendered with the local stub component set.
const ITEMS = [
  { key: 'item_1', name: 'Air Max 270', meta: 'US 9.5 · Triple Black', price: '$150.00', qty: 1, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=160&h=160&fit=crop' },
  { key: 'item_2', name: 'Jordan 1 Retro High', meta: 'US 10 · Chicago', price: '$180.00', qty: 1, img: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=160&h=160&fit=crop' },
  { key: 'item_3', name: 'New Balance 550', meta: 'US 9 · White/Green', price: '$110.00', qty: 1, img: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=160&h=160&fit=crop' },
];

export default function CartScreen() {
  return (
    <div className="min-h-full bg-background flex flex-col">

      <div className="px-5 pt-5 pb-3">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold text-foreground tracking-tight">Your Cart</h1>
          <Badge className="text-xs bg-muted">3</Badge>
        </div>
      </div>

      <div className="flex flex-col gap-3 px-4">
        {ITEMS.map((it) => (
          <Card key={it.key} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="w-20 h-20 rounded-lg flex-shrink-0 overflow-hidden bg-muted">
                  <img src={it.img} alt={it.name} className="object-cover w-full h-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <p className="text-sm font-semibold text-card-foreground leading-snug" data-nav="Product detail">{it.name}</p>
                    <p className="text-sm font-semibold text-card-foreground flex-shrink-0">{it.price}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{it.meta}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" className="h-8 w-8 p-0" data-action={`dec:${it.key}_qty`}>
                        <Icon className="h-3.5 w-3.5"><path d="M5 12 L19 12" /></Icon>
                      </Button>
                      <span className="text-sm font-medium text-card-foreground w-5 text-center" data-bind-text={`${it.key}_qty`} data-bind-default={it.qty}>{it.qty}</span>
                      <Button variant="outline" className="h-8 w-8 p-0" data-action={`inc:${it.key}_qty`}>
                        <Icon className="h-3.5 w-3.5"><path d="M12 5 L12 19 M5 12 L19 12" /></Icon>
                      </Button>
                    </div>
                    <Button variant="ghost" className="h-8 px-2 text-xs text-destructive">Remove</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <div className="mt-1">
          <Button variant="ghost" className="w-full justify-between h-11 px-1 text-sm text-muted-foreground" data-action="toggle:promo_open">
            <span className="flex items-center gap-2">
              <Icon className="h-4 w-4"><path d="M20 12 L12 4 L4 4 L4 12 L12 20 Z" /><circle cx="7.5" cy="7.5" r="1.2" /></Icon>
              Have a promo code?
            </span>
            <Icon className="h-4 w-4"><path d="M6 9 L12 15 L18 9" /></Icon>
          </Button>
          <div className="flex gap-2 px-1 pb-2" data-show-when="promo_open" style={{ display: 'none' }}>
            <Input placeholder="Enter code" className="h-11 text-sm uppercase tracking-widest flex-1" defaultValue="" />
            <Button variant="secondary" className="h-11 px-5 text-sm flex-shrink-0">Apply</Button>
          </div>
        </div>
      </div>

      <div className="mt-6 mx-4">
        <Card className="bg-muted border-0">
          <CardContent className="p-5">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="text-sm font-medium text-foreground">$440.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Shipping</span>
                <span className="text-sm font-medium text-foreground">Free</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Tax</span>
                <span className="text-sm font-medium text-foreground">$35.20</span>
              </div>
              <Separator className="my-1" />
              <div className="flex justify-between items-center">
                <span className="text-base font-semibold text-foreground">Total</span>
                <span className="text-base font-bold text-foreground">$475.20</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 px-4 pb-8 flex flex-col items-center gap-3">
        <Button size="lg" className="w-full h-14 text-base font-semibold bg-primary text-primary-foreground" data-nav="Login">
          Proceed to Checkout
        </Button>
        <Button variant="ghost" className="text-sm text-muted-foreground h-10" data-nav="Browse">
          Continue Shopping
        </Button>
      </div>

    </div>
  );
}
