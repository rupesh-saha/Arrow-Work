'use client';
import { useRouter } from 'next/navigation';
import { Icon } from "@iconify/react";

export default function AdminTasksClient({ initialTasks }) {
  const router = useRouter();

  const deleteTask = async (id) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/api/admin/tasks/${id}`, { method: 'DELETE' });
    router.refresh();
  };

  return (
    <div className="p-4 md:p-8 w-full"> 
      <h1 className="text-2xl font-black mb-6">Task Management</h1>
      
      <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-sm overflow-x-auto">
        
        <table className="min-w-full text-left">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-6 py-4 whitespace-nowrap">Title</th>
              <th className="px-6 py-4 whitespace-nowrap">Budget</th>
              <th className="px-6 py-4 whitespace-nowrap">Status</th>
              <th className="px-6 py-4 whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {initialTasks.map((task) => (
              <tr key={task._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-bold whitespace-nowrap">{task.title}</td>
                <td className="px-6 py-4 text-green-600 font-bold whitespace-nowrap">${task.budget}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs font-bold uppercase">
                    {task.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button onClick={() => deleteTask(task._id)} className="text-red-500 hover:text-red-700">
                    <Icon icon="lucide:trash-2" className="text-lg" />
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