import { Button, Icon, Separator } from '../components';

// Generated screen — scaffold rendered with the local stub component set.
const SIZES = [
  { size: '7', stock: true }, { size: '7.5', stock: true }, { size: '8', stock: true }, { size: '8.5', stock: false },
  { size: '9', stock: true }, { size: '9.5', stock: true }, { size: '10', stock: false }, { size: '10.5', stock: true },
  { size: '11', stock: true }, { size: '11.5', stock: false }, { size: '12', stock: true }, { size: '13', stock: true },
];

export default function ProductDetailScreen() {
  return (
    <div className="relative min-h-full bg-background flex flex-col">

      <div className="flex items-center justify-between px-4 py-3">
        <span data-nav="Browse" className="flex items-center gap-1 text-foreground cursor-pointer">
          <Icon className="h-5 w-5"><polyline points="15 18 9 12 15 6" /></Icon>
          <span className="text-sm font-medium">Back</span>
        </span>
        <span className="text-base font-semibold text-foreground">Product</span>
        <span data-nav="Cart" className="relative flex items-center justify-center h-11 w-11 rounded-full text-foreground cursor-pointer">
          <Icon className="h-5 w-5">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
          </Icon>
        </span>
      </div>

      <div className="relative w-full aspect-square bg-muted overflow-hidden">
        <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80" alt="Air Max 270" className="w-full h-full object-cover" />
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-foreground opacity-100" />
          <span className="h-2 w-2 rounded-full bg-foreground opacity-40" />
          <span className="h-2 w-2 rounded-full bg-foreground opacity-40" />
          <span className="h-2 w-2 rounded-full bg-foreground opacity-40" />
        </div>
      </div>

      <div className="flex flex-col gap-5 pb-32">

        <div className="px-5 pt-5 flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Nike</span>
          <h1 className="text-xl font-bold text-foreground leading-snug">Air Max 270</h1>
          <p className="text-sm text-muted-foreground">Triple Black / Anthracite</p>
          <p className="text-2xl font-bold text-foreground mt-1">$150.00</p>
        </div>

        <Separator className="mx-5" />

        <div className="px-5 flex flex-col gap-2">
          <span className="text-sm font-semibold text-foreground">Color</span>
          <div className="flex gap-3">
            <span className="h-8 w-8 rounded-full bg-neutral-900 ring-2 ring-offset-2 ring-foreground" aria-label="Triple Black" />
            <span className="h-8 w-8 rounded-full bg-white border border-border" aria-label="White" />
            <span className="h-8 w-8 rounded-full bg-blue-900" aria-label="Navy" />
            <span className="h-8 w-8 rounded-full bg-stone-600" aria-label="Olive" />
            <span className="h-8 w-8 rounded-full bg-red-600" aria-label="Red" />
          </div>
        </div>

        <Separator className="mx-5" />

        <div className="px-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">Size <span className="font-normal text-muted-foreground">(US)</span></span>
            <span className="text-xs text-primary underline underline-offset-2">Size guide</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {SIZES.map((s) => (
              <Button
                key={s.size}
                variant="outline"
                data-action={`set:selected_size:${s.size}`}
                data-bind-on={`size_${s.size}`}
                className={
                  s.stock
                    ? 'h-11 text-sm font-medium data-[on=true]:bg-primary data-[on=true]:text-primary-foreground data-[on=true]:border-primary'
                    : 'h-11 text-sm font-medium opacity-35 cursor-not-allowed pointer-events-none line-through'
                }
              >
                {s.size}
              </Button>
            ))}
          </div>
        </div>

        <div className="mx-5 rounded-xl bg-muted p-4 flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <Icon className="h-5 w-5 mt-0.5 text-foreground flex-shrink-0"><path d="M5 12h14M12 5l7 7-7 7" /></Icon>
            <p className="text-sm text-card-foreground leading-snug">Free standard shipping on orders over <span className="font-semibold">$75</span></p>
          </div>
          <Separator />
          <div className="flex items-start gap-3">
            <Icon className="h-5 w-5 mt-0.5 text-foreground flex-shrink-0"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></Icon>
            <p className="text-sm text-card-foreground leading-snug">100% authentic — every pair is verified before it ships</p>
          </div>
          <Separator />
          <div className="flex items-start gap-3">
            <Icon className="h-5 w-5 mt-0.5 text-foreground flex-shrink-0"><path d="M3 12a9 9 0 1018 0 9 9 0 00-18 0" /><polyline points="8 12 11 15 16 9" /></Icon>
            <p className="text-sm text-card-foreground leading-snug">Free returns within <span className="font-semibold">30 days</span> of delivery</p>
          </div>
        </div>

      </div>

      <div className="absolute bottom-0 inset-x-0 px-5 pt-3 pb-4 bg-background border-t border-border">
        <Button size="lg" className="w-full h-14 text-base font-semibold bg-primary text-primary-foreground" data-nav="Cart" data-action="inc:cart_count">
          Add to Cart
        </Button>
      </div>

    </div>
  );
}
