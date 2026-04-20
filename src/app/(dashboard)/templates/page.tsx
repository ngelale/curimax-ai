import { TemplatesList } from "./_components";

export default function TemplatesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Program Templates</h1>
        <p className="text-muted-foreground mt-1">Start with a proven framework</p>
      </div>

      <TemplatesList />
    </div>
  );
}
