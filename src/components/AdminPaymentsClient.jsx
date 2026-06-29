'use client';
import { Icon } from "@iconify/react";

export default function AdminPaymentsClient({ data }) {
  const { payments, totalRevenue, avgTransaction } = data;

  return (
    <div className="p-4 md:p-8 w-full max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900">Payment Overview</h1>
        <p className="text-gray-500 font-medium">All platform transactions</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex justify-between items-center">
          <div>
            <p className="text-sm font-bold text-gray-500 mb-1">Total Revenue</p>
            <h2 className="text-3xl font-black">${totalRevenue.toLocaleString()}</h2>
            <p className="text-xs text-gray-400 mt-1">{payments.length} total transactions</p>
          </div>
          <div className="p-4 bg-orange-50 text-orange-500 rounded-xl"><Icon icon="lucide:dollar-sign" className="text-2xl" /></div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex justify-between items-center">
          <div>
            <p className="text-sm font-bold text-gray-500 mb-1">Average Transaction</p>
            <h2 className="text-3xl font-black">${avgTransaction.toFixed(2)}</h2>
            <p className="text-xs text-gray-400 mt-1">Per completed payment</p>
          </div>
          <div className="p-4 bg-blue-50 text-blue-500 rounded-xl"><Icon icon="lucide:trending-up" className="text-2xl" /></div>
        </div>
      </div>

      <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-sm overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-6 py-4 whitespace-nowrap">Client</th>
              <th className="px-6 py-4 whitespace-nowrap">Freelancer</th>
              <th className="px-6 py-4 whitespace-nowrap">Amount</th>
              <th className="px-6 py-4 whitespace-nowrap">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {payments.map((p) => (
              <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-bold text-gray-700 whitespace-nowrap">{p.client_email}</td>
                <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{p.freelancer_email}</td>
                <td className="px-6 py-4 text-sm font-black text-green-600 whitespace-nowrap">${p.amount}</td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {new Date(p.paid_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}