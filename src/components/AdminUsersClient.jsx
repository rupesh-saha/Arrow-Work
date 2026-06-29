'use client';
import { useRouter } from 'next/navigation';
import { Icon } from "@iconify/react";

export default function AdminUsersClient({ initialUsers }) {
  const router = useRouter();

  const toggleBlock = async (id) => {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/api/admin/users/${id}/toggle-block`, { method: 'PATCH' });
    router.refresh();
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-black mb-6">User Management</h1>
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {initialUsers.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4">
                  <div className="font-bold">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                </td>
                <td className="px-6 py-4 capitalize">{user.role}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-lg text-[10px] font-bold ${user.isBlocked ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                    {user.isBlocked ? 'Blocked' : 'Active'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => toggleBlock(user._id)} className="flex items-center gap-1 text-sm font-bold text-gray-500 hover:text-gray-900">
                    <Icon icon={user.isBlocked ? "lucide:shield-check" : "lucide:shield-ban"} />
                    {user.isBlocked ? 'Unblock' : 'Block'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}