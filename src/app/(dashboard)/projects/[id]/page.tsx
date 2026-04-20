import { mockProjects } from "../mock-data";
import { Project } from "../types";
import ProjectHubClient from "@/app/(dashboard)/projects/[id]/ProjectHubClient";

type Props = { params: { id: string } };

export default async function Page({ params }: Props) {
  const { id } = await params;
  const project = mockProjects.find((p) => p.id === id) as Project | undefined;

  if (!project) {
    return (
      <main className="p-6">
        <header className="mb-6">
          <nav className="text-sm text-muted-foreground">Projects &gt; Not found</nav>
          <h1 className="text-2xl font-bold">Project not found</h1>
        </header>
        <p>Project with id "{id}" was not found.</p>
      </main>
    );
  }

  return <ProjectHubClient project={project} />;
}
