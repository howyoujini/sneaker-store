import { Badge, Button, Card, CardContent, Icon, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Separator } from '../components';

// Generated screen — scaffold rendered with the local stub component set.
export default function CheckoutScreen() {
  return (
    <div className="min-h-full bg-background text-foreground flex flex-col pb-10">

      <div className="px-5 pt-4 pb-3 flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-10 w-10 -ml-2 shrink-0" data-nav="Cart">
          <Icon className="h-5 w-5"><polyline points="15 18 9 12 15 6" /></Icon>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight">Checkout</h1>
      </div>

      <div className="px-5 pb-5">
        <div className="flex items-center gap-1.5 text-xs">
          <span className="font-semibold text-primary">Shipping</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-muted-foreground">Payment</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-muted-foreground">Review</span>
        </div>
        <div className="mt-2 h-1 rounded-full bg-muted overflow-hidden">
          <div className="h-full w-1/3 rounded-full bg-primary" />
        </div>
      </div>

      <div className="flex flex-col gap-8 px-5">

        <section>
          <h2 className="text-lg font-semibold mb-4">Shipping address</h2>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="full-name">Full name</Label>
              <Input id="full-name" placeholder="Jordan Mills" defaultValue="" autoComplete="name" className="h-12 text-base" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="address1">Address line 1</Label>
              <Input id="address1" placeholder="123 Main St" defaultValue="" autoComplete="address-line1" className="h-12 text-base" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="address2">Address line 2 <span className="text-muted-foreground font-normal">(optional)</span></Label>
              <Input id="address2" placeholder="Apt, suite, unit…" defaultValue="" autoComplete="address-line2" className="h-12 text-base" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="Brooklyn" defaultValue="" autoComplete="address-level2" className="h-12 text-base" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="state">State</Label>
                <Input id="state" placeholder="NY" defaultValue="" autoComplete="address-level1" className="h-12 text-base" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="zip">ZIP code</Label>
                <Input id="zip" placeholder="11201" defaultValue="" inputMode="numeric" autoComplete="postal-code" className="h-12 text-base" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="country">Country</Label>
                <Select defaultValue="United States">
                  <SelectTrigger id="country" className="h-12 text-base">
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem>United States</SelectItem>
                    <SelectItem>Canada</SelectItem>
                    <SelectItem>United Kingdom</SelectItem>
                    <SelectItem>Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4">Payment</h2>
          <div className="flex flex-col gap-3 mb-5">
            <Button variant="secondary" size="lg" className="w-full h-14 text-base font-semibold gap-2">
              <Icon className="h-5 w-5"><path d="M12 4c-1.5 0-2.8.8-3.5 2C7.5 4.8 6 4 4.5 4 2.6 4 1 5.6 1 7.5c0 3.5 5 8.5 11 12.5 6-4 11-9 11-12.5C23 5.6 21.4 4 19.5 4c-1.5 0-3 .8-3.5 2C15.3 4.8 13.7 4 12 4z" /></Icon>
              Pay with Apple Pay
            </Button>
            <Button variant="secondary" size="lg" className="w-full h-14 text-base font-semibold gap-2">
              <Icon className="h-5 w-5"><circle cx="12" cy="12" r="9" /><path d="M9 12h6M12 9v6" /></Icon>
              Pay with Google Pay
            </Button>
          </div>

          <div className="flex items-center gap-3 mb-5">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">or pay by card</span>
            <Separator className="flex-1" />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="card-number">Card number</Label>
              <Input id="card-number" placeholder="1234 5678 9012 3456" defaultValue="" inputMode="numeric" autoComplete="cc-number" className="h-12 text-base tracking-wider" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="expiry">Expiry</Label>
                <Input id="expiry" placeholder="MM / YY" defaultValue="" inputMode="numeric" autoComplete="cc-exp" className="h-12 text-base" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" placeholder="123" defaultValue="" inputMode="numeric" autoComplete="cc-csc" className="h-12 text-base" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <Icon className="h-4 w-4 text-muted-foreground shrink-0"><rect x="5" y="11" width="14" height="10" rx="1" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></Icon>
            <span className="text-xs text-muted-foreground">256-bit SSL encryption. Your payment info is never stored.</span>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Order review</h2>
          <Card className="bg-muted border-0">
            <CardContent className="p-4 flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-start text-sm">
                  <span className="text-card-foreground font-medium">Air Max 270 × 1</span>
                  <span className="text-card-foreground shrink-0 ml-4">$150.00</span>
                </div>
                <div className="flex justify-between items-start text-sm">
                  <span className="text-card-foreground font-medium">Jordan 1 Retro High × 1</span>
                  <span className="text-card-foreground shrink-0 ml-4">$180.00</span>
                </div>
                <div className="flex justify-between items-start text-sm">
                  <span className="text-card-foreground font-medium">New Balance 550 × 1</span>
                  <span className="text-card-foreground shrink-0 ml-4">$110.00</span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <div className="flex items-center gap-1.5">
                  <Badge className="text-xs px-1.5 py-0 bg-card">Free · 3–5 days</Badge>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-card-foreground">$440.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span className="text-card-foreground">$35.20</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-base font-semibold text-card-foreground">Total</span>
                <span className="text-base font-semibold text-card-foreground">$475.20</span>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="pb-6">
          <Button size="lg" className="w-full h-14 text-base font-semibold bg-primary text-primary-foreground gap-2" data-nav="Order confirmation">
            <Icon className="h-5 w-5"><rect x="5" y="11" width="14" height="10" rx="1" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></Icon>
            Place Order — $475.20
          </Button>
          <p className="text-xs text-muted-foreground text-center leading-relaxed mt-3">
            By placing your order you agree to our Terms of Sale and Privacy Policy.
          </p>
        </section>

      </div>
    </div>
  );
}
