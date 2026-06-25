'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from '@/lib/auth-client';
import { Icon } from "@iconify/react";
import { motion } from 'framer-motion';
import { 
  AlertDialog, 
  Button, 
  Input, 
  Label, 
  Modal, 
  Surface, 
  TextField 
} from "@heroui/react";

export default function MyTasksPage() {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    if (!session?.user?.email) return;
    
    const fetchTasks = async () => {
      const response = await fetch(`http://localhost:5001/api/tasks?email=${session.user.email}`);
      if (response.ok) {
        const data = await response.json();
        setTasks(Array.isArray(data) ? data : []);
      }
    };
    
    fetchTasks();
  }, [session]);


  const handleEditSubmit = async (e, id) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const payload = { ...data, budget: Number(data.budget) };

    const response = await fetch(`http://localhost:5001/api/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      setTasks(tasks.map(t => t._id === id ? { ...t, ...payload } : t));
    }
  };

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5001/api/tasks/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setTasks(tasks.filter(task => task._id !== id));
    }
  };

  const getStatusColor = (status) => {
    if (status === 'Open') return 'bg-green-100 text-green-700 border-green-200';
    if (status === 'In Progress') return 'bg-purple-100 text-purple-700 border-purple-200';
    if (status === 'Completed') return 'bg-blue-100 text-blue-700 border-blue-200';
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  if (tasks === null) {
    return <div className="flex justify-center items-center h-64"><Icon icon="eos-icons:loading" className="text-4xl animate-spin text-gray-900" /></div>;
  }

  const validTasks = tasks.filter(task => task && task._id);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">My Tasks</h1>
        <p className="text-gray-500 mt-2 font-medium">Manage the jobs you have posted to the marketplace.</p>
      </div>

      {validTasks.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-sm">
          <Icon icon="lucide:folder-open" className="text-5xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900">No tasks posted yet</h3>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4">Task Title</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Budget</th>
                  <th className="px-6 py-4">Deadline</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {validTasks.map((task) => (
                  <tr key={task._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-900 max-w-[200px] truncate">{task.title}</td>
                    <td className="px-6 py-4 text-gray-600">{task.category}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">${task.budget}</td>
                    <td className="px-6 py-4 text-gray-600">{task.deadline ? new Date(task.deadline).toLocaleDateString() : 'N/A'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(task.status)}`}>
                        {task.status || 'Open'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        
                        <Modal>
                          <Button size="sm" variant="secondary" isDisabled={task.status !== 'Open'}>
                            <Icon icon="lucide:edit" /> Edit
                          </Button>
                          <Modal.Backdrop>
                            <Modal.Container placement="auto">
                              <Modal.Dialog className="sm:max-w-2xl bg-white shadow-2xl">
                                <Modal.CloseTrigger className="text-gray-400 hover:text-gray-600 top-4 right-4" />
                                
                                <Modal.Header>
                                  <Modal.Icon className="bg-blue-50 text-blue-600">
                                    <Icon icon="lucide:edit" className="size-5" />
                                  </Modal.Icon>
                                  <Modal.Heading className="text-xl font-bold">Edit Task</Modal.Heading>
                                  <p className="mt-1.5 text-sm leading-5 text-gray-500">
                                    Update the details below. Changes will reflect immediately.
                                  </p>
                                </Modal.Header>
                                
                                <Modal.Body className="p-6">
                                  <Surface variant="default" className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                                    <form id={`edit-form-${task._id}`} onSubmit={(e) => handleEditSubmit(e, task._id)} className="flex flex-col gap-4">
                                      
                                      <TextField className="w-full" name="title" type="text" variant="secondary" defaultValue={task.title}>
                                        <Label>Task Title</Label>
                                        <Input className="bg-white border-gray-200" />
                                      </TextField>

                                      <div className="grid grid-cols-2 gap-4">
                                        <TextField className="w-full" name="category" variant="secondary">
                                          <Label>Category</Label>
                                          {/* Use native select inside TextField for FormData extraction */}
                                          <select name="category" defaultValue={task.category} className="w-full h-10 px-3 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none">
                                            <option value="Design">Design</option>
                                            <option value="Writing">Writing</option>
                                            <option value="Development">Development</option>
                                            <option value="Marketing">Marketing</option>
                                            <option value="Other">Other</option>
                                          </select>
                                        </TextField>

                                        <TextField className="w-full" name="budget" type="number" variant="secondary" defaultValue={task.budget?.toString()}>
                                          <Label>Budget (USD)</Label>
                                          <Input className="bg-white border-gray-200" min="1" />
                                        </TextField>
                                      </div>

                                      <TextField className="w-full" name="deadline" type="date" variant="secondary" defaultValue={task.deadline?.split('T')[0]}>
                                        <Label>Deadline Date</Label>
                                        <Input className="bg-white border-gray-200" />
                                      </TextField>

                                      <TextField className="w-full" name="description" variant="secondary" defaultValue={task.description}>
                                        <Label>Description</Label>
                                        <Input className="bg-white border-gray-200" />
                                      </TextField>

                                    </form>
                                  </Surface>
                                </Modal.Body>
                                
                                <Modal.Footer className="border-t border-gray-100 pt-4">
                                  <Button slot="close" variant="secondary">Cancel</Button>
                                  <Button slot="close" type="submit" form={`edit-form-${task._id}`} className="bg-gray-900 text-white">Save Changes</Button>
                                </Modal.Footer>
                                
                              </Modal.Dialog>
                            </Modal.Container>
                          </Modal.Backdrop>
                        </Modal>

                        <AlertDialog>
                          <Button size="sm" variant="danger" isDisabled={task.status !== 'Open'} className="text-red-600 bg-red-50 hover:bg-red-100">
                            <Icon icon="lucide:trash-2" /> Delete
                          </Button>
                          <AlertDialog.Backdrop>
                            <AlertDialog.Container>
                              <AlertDialog.Dialog className="sm:max-w-[400px] bg-white">
                                <AlertDialog.CloseTrigger className="top-3 right-3 text-gray-400" />
                                <AlertDialog.Header>
                                  <AlertDialog.Icon status="danger" />
                                  <AlertDialog.Heading className="text-xl font-bold">Delete task permanently?</AlertDialog.Heading>
                                </AlertDialog.Header>
                                <AlertDialog.Body className="text-gray-500 py-4 text-sm">
                                  <p>This will permanently delete <strong>{task.title}</strong> and all of its data. This action cannot be undone.</p>
                                </AlertDialog.Body>
                                <AlertDialog.Footer className="bg-gray-50 rounded-b-xl p-4">
                                  {/* slot="close" automatically closes the dialog natively! */}
                                  <Button slot="close" variant="tertiary" className="font-bold">Cancel</Button>
                                  <Button slot="close" variant="danger" onPress={() => handleDelete(task._id)} className="bg-red-600 text-white font-bold">
                                    Delete Task
                                  </Button>
                                </AlertDialog.Footer>
                              </AlertDialog.Dialog>
                            </AlertDialog.Container>
                          </AlertDialog.Backdrop>
                        </AlertDialog>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </motion.div>
  );
}