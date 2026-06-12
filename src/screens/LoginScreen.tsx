import { Button, Card, CardContent, Input, Label, Separator } from '../components';

// Generated screen — scaffold rendered with the local stub component set.
export default function LoginScreen() {
  return (
    <div className="flex flex-col min-h-full bg-background">
      <div className="px-6 pt-10 pb-8 flex flex-col items-start gap-2">
        <span className="text-2xl font-black tracking-tight uppercase text-foreground">DROPHAUS</span>
        <p className="text-sm text-muted-foreground leading-relaxed">Sign in to complete your order and track your drops.</p>
      </div>

      <div className="flex-1 px-4">
        <Card className="bg-card border-border shadow-sm">
          <CardContent className="pt-6 pb-6 flex flex-col gap-5">

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email" className="text-sm font-medium text-card-foreground">Email address</Label>
              <Input id="email" type="email" placeholder="you@example.com" defaultValue="" autoComplete="email"
                className="h-11 text-base bg-background border-border text-foreground" />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password" className="text-sm font-medium text-card-foreground">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" defaultValue="" autoComplete="current-password"
                className="h-11 text-base bg-background border-border text-foreground" />
            </div>

            <div className="flex justify-end -mt-2">
              <span className="text-xs text-muted-foreground">Forgot password?</span>
            </div>

            <Button size="lg" className="w-full h-12 text-base font-semibold bg-primary text-primary-foreground mt-1" data-nav="Checkout">
              Sign in
            </Button>

          </CardContent>
        </Card>

        <div className="flex items-center gap-3 px-2 py-6">
          <Separator className="flex-1" />
          <span className="text-xs text-muted-foreground">or</span>
          <Separator className="flex-1" />
        </div>

        <div className="flex flex-col gap-3 pb-10">
          <Button variant="outline" size="lg" className="w-full h-12 text-base border-border text-foreground" data-nav="Checkout">
            Create an account
          </Button>
          <Button variant="ghost" size="lg" className="w-full h-12 text-base text-muted-foreground" data-nav="Checkout">
            Continue as guest
          </Button>
        </div>
      </div>
    </div>
  );
}
