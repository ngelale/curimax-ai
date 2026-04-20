import BillingClient from "./BillingClient";

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Billing & Subscription</h1>
        <p className="text-muted-foreground mt-1">
          Manage your plan, billing, and payment methods
        </p>
      </div>
      <BillingClient />
    </div>
  );
}
