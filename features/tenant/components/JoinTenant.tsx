import { FormEvent, useState } from 'react';
import { useJoinTenant } from '../hooks/join-tenant.hook';
import { useRouter } from 'next/navigation';

export default function JoinTenant() {
  const { joinTenant, loading } = useJoinTenant();
  const [inviteCode, setInviteCode] = useState('');
  const router = useRouter();
  const handleJoin = async (e: FormEvent) => {
    e.preventDefault();

    const x = await joinTenant(inviteCode);
    if (!x.ok) {
      console.log(x);
    }
    console.log('x on join tenant', x);
    router.push(`/onboarding}`);
  };

  return (
    <div
      className="
    w-full max-w-md
    rounded-3xl
    border border-white/40 dark:border-gray-800
    bg-white/80 dark:bg-gray-900/80
    backdrop-blur-xl
    shadow-xl shadow-slate-200/50 dark:shadow-black/30
    overflow-hidden
  ">
      {/* Header */}
      <div className="px-6 pt-7 pb-5 border-b border-gray-200 dark:border-gray-800">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Join Workspace
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter the invite code to join an existing workspace
          </p>
        </div>
      </div>

      {/* Form */}
      <form className="p-6 space-y-5" onSubmit={handleJoin}>
        {/* Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Invite Code
          </label>

          <input
            type="text"
            placeholder="ABC123XYZ"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
            className="
          w-full rounded-xl
          border border-gray-200 dark:border-gray-700
          bg-white/70 dark:bg-gray-900
          px-4 py-3
          text-sm text-gray-900 dark:text-white
          placeholder:text-gray-400
          focus:outline-none
          focus:ring-2 focus:ring-blue-500/40
          focus:border-blue-500
          transition
        "
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="
        w-full rounded-xl
        bg-linear-to-r from-blue-600 to-indigo-600
        text-white
        py-3
        text-sm font-semibold
        hover:opacity-90
        disabled:opacity-50
        transition-opacity
        shadow-lg shadow-blue-500/20
        cursor-pointer
      ">
          {loading ? 'Joining...' : 'Join Workspace'}
        </button>
      </form>
    </div>
  );
}
