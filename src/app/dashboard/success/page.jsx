import { redirect } from 'next/navigation'
import { stripe } from '../../../lib/stripe'
import Link from 'next/link'

export default async function Success({ searchParams }) {
  const params = await searchParams;
  const { session_id, proposal_id, task_id, client_email, freelancer_email, amount, title } = params;

  if (!session_id) {
    throw new Error('Please provide a valid session_id')
  }

  const { status, customer_details } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    
    
    try {
      await fetch('http://localhost:5001/api/payments/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id,
          proposal_id,
          task_id,
          client_email,
          freelancer_email,
          amount
        })
      });
    } catch (error) {
      console.error("Failed to update database:", error);
    }

    return (
      <div className="min-h-[70vh] bg-white flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-3xl font-black text-green-500">
              ✓
            </div>
          </div>

          <h1 className="text-3xl font-black text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-500 mb-8">
            Your transaction has been confirmed. A receipt has been sent to {customer_details?.email}.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-left mb-8 space-y-4">
            <div className="flex justify-between border-b border-gray-200 pb-3">
              <span className="text-gray-500 font-medium text-sm">Task</span>
              <span className="font-bold text-gray-900 text-sm">{title}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-3">
              <span className="text-gray-500 font-medium text-sm">Freelancer</span>
              <span className="font-bold text-gray-900 text-sm">{freelancer_email}</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-gray-900 font-bold">Amount Paid</span>
              <span className="font-black text-green-600">${amount}</span>
            </div>
          </div>

          <Link 
            href="/dashboard/client"
            className="w-full inline-block text-center bg-gray-900 hover:bg-black text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-sm"
          >
            Return to Dashboard
          </Link>

        </div>
      </div>
    )
  }
}