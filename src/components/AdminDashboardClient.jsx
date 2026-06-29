'use client';

import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Icon } from "@iconify/react";

export default function AdminDashboardClient({ data }) {
  if (!data) return <div className="p-8 text-center text-gray-500">Error loading dashboard.</div>;

  const { stats, userRoles, taskStatus, recentPayments } = data;

  // Format data for Recharts
  const pieData = userRoles.map(item => ({ name: item._id, value: item.count }));
  const barData = taskStatus.map(item => ({ name: item._id, count: item.count }));
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b']; // Blue, Green, Orange

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1 font-medium">Platform overview and management.</p>
      </div>

      {/* Stats Grid (Responsive) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: "Total Users", val: stats.totalUsers, icon: "lucide:users", color: "text-blue-500" },
          { label: "Total Tasks", val: stats.totalTasks, icon: "lucide:briefcase", color: "text-orange-500" },
          { label: "Total Revenue", val: `$${stats.totalRevenue.toLocaleString()}`, icon: "lucide:dollar-sign", color: "text-green-500" },
          { label: "Active Tasks", val: stats.activeTasks, icon: "lucide:activity", color: "text-purple-500" }
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-500">{item.label}</p>
              <h3 className="text-2xl font-black text-gray-900 mt-1">{item.val}</h3>
            </div>
            <div className={`p-3 rounded-xl bg-gray-50 ${item.color}`}>
              <Icon icon={item.icon} className="text-2xl" />
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Users Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-6">Users by Role</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tasks Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-6">Tasks by Status</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f9fafb' }} />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Payments Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">Recent Payments</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase">
              <tr>
                <th className="px-6 py-3">Client</th>
                <th className="px-6 py-3">Freelancer</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {recentPayments.map((p) => (
                <tr key={p._id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 truncate max-w-[150px]">{p.client_email}</td>
                  <td className="px-6 py-4 truncate max-w-[150px]">{p.freelancer_email}</td>
                  <td className="px-6 py-4 font-bold text-green-600">${p.amount}</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-green-50 text-green-600 rounded-lg text-[10px] font-bold uppercase">{p.payment_status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}