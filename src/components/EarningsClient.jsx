'use client';

import React from 'react';
import { Icon } from "@iconify/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function EarningsClient({ earningsData }) {
  const { payments, totalEarned, averagePerTask } = earningsData;

  const getMonthlyData = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthlyTotals = Array(12).fill(0);

    payments.forEach(payment => {
      const monthIndex = new Date(payment.paid_at).getMonth();
      monthlyTotals[monthIndex] += payment.amount;
    });

    return months.map((month, index) => ({
      name: month,
      total: monthlyTotals[index]
    }));
  };

  const chartData = getMonthlyData();

  return (
    <div className="max-w-5xl pb-10">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Earnings</h1>
        <p className="text-gray-500 mt-1 font-medium">Track your income from completed tasks.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-bold text-gray-500 mb-1">Total Earned</p>
              <h2 className="text-3xl font-black text-gray-900">${totalEarned.toFixed(2)}</h2>
              <p className="text-xs text-gray-400 mt-2 font-medium">From {payments.length} payment{payments.length !== 1 && 's'}</p>
            </div>
            <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center text-xl">
              <Icon icon="lucide:dollar-sign" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-bold text-gray-500 mb-1">Average Per Task</p>
              <h2 className="text-3xl font-black text-gray-900">${averagePerTask.toFixed(2)}</h2>
              <p className="text-xs text-gray-400 mt-2 font-medium">Average earning per completed task</p>
            </div>
            <div className="w-12 h-12 bg-orange-50 text-blue-700 rounded-xl flex items-center justify-center text-xl">
              <Icon icon="lucide:trending-up" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Monthly Earnings</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} tickFormatter={(value) => `$${value}`} />
              <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="total" fill="#f97316" radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-sm font-bold text-gray-900">
                <th className="py-4 px-6">Task</th>
                <th className="py-4 px-6">Client</th>
                <th className="py-4 px-6">Amount</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Transaction ID</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-600 font-medium">
              {payments.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-400">No transactions found.</td>
                </tr>
              ) : (
                payments.map((payment) => (
                  <tr key={payment._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 font-bold text-gray-900">{payment.task_title}</td>
                    <td className="py-4 px-6">{payment.client_email}</td>
                    <td className="py-4 px-6 font-bold text-green-500">+${payment.amount}</td>
                    <td className="py-4 px-6">{new Date(payment.paid_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                    <td className="py-4 px-6 text-gray-400 font-mono text-xs truncate max-w-[150px]">{payment.transaction_id}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}