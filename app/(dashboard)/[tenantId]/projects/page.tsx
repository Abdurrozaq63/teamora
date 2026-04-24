'use client';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type Project = {
  id: string;
  tenantId: string;
  name: string;
  description: string;
  status: string;
  createdBy: string;
  createdAt: string;
  deletedAt: string | null;
};

export default function Project() {
  const params = useParams();
  const router = useRouter();
  const [listProject, setList] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const tenantId = params.tenantId as string;
  const [form, setForm] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    if (tenantId) {
      getListProject();
    }
  }, [tenantId]);
  async function getListProject() {
    setLoading(true);
    const res = await fetch(`/api/project/${tenantId}/getList`);
    if (!res.ok) {
      console.error('Error fetch project');
      setLoading(false);
      return;
    }
    const data = await res.json();
    setList(data);
    setLoading(false);
  }
  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`/api/project/${tenantId}/create-project`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data) {
      await getListProject();
    }
    setLoading(false);
  }
  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <h1>project</h1>
      <div>
        <form onSubmit={handleCreate} className="w-full max-w-md space-y-4">
          <h1 className="text-xl font-bold">Buat Workspace Baru</h1>

          <input
            type="text"
            placeholder="Nama Workspace"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            placeholder="description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white p-2 rounded">
            {loading ? 'Membuat...' : 'Buat Project'}
          </button>
        </form>
      </div>
      <div>
        {listProject.map((lp, index) => (
          <ul key={index}>
            <li>Nama Project: {lp.name}</li>
            <li>Description: {lp.description}</li>
            <li>
              <button
                onClick={() => router.push(`/${lp.tenantId}/project/${lp.id}`)}>
                Buka
              </button>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}
