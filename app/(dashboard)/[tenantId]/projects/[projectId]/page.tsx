'use client';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
type Projects = {
  id: string;
  userId: string;
  projectId: string;
  role: string;
  joinedAt: string;
  project: {
    id: string;
    tenantId: string;
    name: string;
    description: string;
    status: string;
    createdBy: string;
    createdAt: string;
    deletedAt: string | null;
  };
};
export default function detailProject() {
  const params = useParams();
  const [detProject, setProject] = useState<Projects | null>(null);
  const tenantId = params.tenantId as string;
  const projectId = params.projectId as string;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getProject();
  }, []);
  async function getProject() {
    setLoading(true);
    const res = await fetch(`/api/project/${tenantId}/${projectId}`);
    console.log('tenantId', tenantId);
    console.log('projectId', projectId);
    if (!res.ok) {
      alert('Something Problems');
      //router.push()
      return;
    }
    const data = await res.json();
    setProject(data);
    setLoading(false);
  }

  if (!detProject || detProject == null) return <div>Loading...</div>;

  return (
    <div>
      <h1>Detail project</h1>
      <div>
        <h2>Name Project: {detProject.project.name}</h2>
        <h2>Description</h2>
        <p>{detProject.project.description}</p>
      </div>
    </div>
  );
}
