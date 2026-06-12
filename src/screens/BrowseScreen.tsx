import { Badge, Button, Card, CardContent, Icon, Input } from '../components';

// Generated screen — scaffold rendered with the local stub component set.
const PRODUCTS = [
  { brand: 'Nike', name: 'Air Max 90', price: '$130', colorways: '4 colorways', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80' },
  { brand: 'Adidas', name: 'Forum Low', price: '$90', colorways: '6 colorways', img: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&q=80' },
  { brand: 'New Balance', name: '550', price: '$110', colorways: '8 colorways', img: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&q=80' },
  { brand: 'Jordan', name: '1 Retro High OG', price: '$180', colorways: '12 colorways', img: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=400&q=80' },
  { brand: 'Converse', name: 'Chuck 70 Hi', price: '$85', colorways: '5 colorways', img: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400&q=80' },
  { brand: 'Vans', name: 'Old Skool', price: '$70', colorways: '9 colorways', img: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&q=80' },
  { brand: 'Nike', name: 'Dunk Low', price: '$120', colorways: '7 colorways', img: 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=400&q=80' },
  { brand: 'Asics', name: 'Gel-Lyte III', price: '$100', colorways: '3 colorways', img: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&q=80' },
];

export default function BrowseScreen() {
  return (
    <div className="min-h-full bg-background flex flex-col">

      <div className="sticky top-0 z-20 bg-card border-b border-border px-4 pt-3 pb-3">
        <div className="flex items-center gap-2 mb-3">
          <div className="relative flex-1">
            <Icon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
              <circle cx="11" cy="11" r="7" />
              <path d="M16.5 16.5 L21 21" />
            </Icon>
            <Input className="pl-10 h-11 bg-muted border-0 text-base" placeholder="Search sneakers…" defaultValue="" />
          </div>
          <Button variant="ghost" size="icon" className="h-11 w-11 shrink-0" data-nav="Cart" aria-label="Cart">
            <Icon className="h-5 w-5">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </Icon>
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-9 gap-1.5 text-sm">
            <Icon className="h-4 w-4"><path d="M3 6 L21 6" /><path d="M7 12 L17 12" /><path d="M10 18 L14 18" /></Icon>
            Filter
          </Button>
          <Button variant="outline" size="sm" className="h-9 gap-1.5 text-sm">
            <Icon className="h-4 w-4"><path d="M4 6 L14 6" /><path d="M4 12 L18 12" /><path d="M4 18 L10 18" /></Icon>
            Sort
          </Button>
        </div>
      </div>

      <div className="flex gap-2 px-4 pt-3 pb-1 overflow-x-auto">
        <Badge className="flex items-center gap-1 h-7 px-3 text-xs shrink-0 bg-muted">Nike <span className="text-muted-foreground">×</span></Badge>
        <Badge className="flex items-center gap-1 h-7 px-3 text-xs shrink-0 bg-muted">US 10 <span className="text-muted-foreground">×</span></Badge>
        <Badge className="flex items-center gap-1 h-7 px-3 text-xs shrink-0 bg-muted">Under $200 <span className="text-muted-foreground">×</span></Badge>
      </div>

      <div className="px-4 pt-2 pb-3">
        <p className="text-xs text-muted-foreground">248 results</p>
      </div>

      <div className="px-4 grid grid-cols-2 gap-3 pb-8">
        {PRODUCTS.map((p) => (
          <Card key={p.name} className="overflow-hidden border-border" data-nav="Product detail">
            <div className="aspect-square bg-muted w-full overflow-hidden">
              <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
            </div>
            <CardContent className="p-3">
              <p className="text-xs text-muted-foreground mb-0.5">{p.brand}</p>
              <p className="text-sm font-medium text-card-foreground leading-snug">{p.name}</p>
              <p className="text-sm font-semibold text-card-foreground mt-1">{p.price}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{p.colorways}</p>
            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  );
}
