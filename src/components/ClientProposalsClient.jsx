'use client';

import React, { useState } from 'react';
import { Icon } from "@iconify/react";
import { AlertDialog, Button } from "@heroui/react";
import { useSession } from '@/lib/auth-client';

export default function ClientProposalsClient({ initialProposals }) {

  const [proposals, setProposals] = useState(initialProposals);

  const { data: session } = useSession(); 

  const handleAcceptStripe = async (proposal) => {
    try {
      const response = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          proposal_id: proposal._id,
          task_id: proposal.task_id,
          title: proposal.task_title,
          budget: proposal.proposed_budget,
          freelancer_email: proposal.freelancer_email,
          client_email: session?.user?.email || 'client@email.com'
        })
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Stripe Checkout Error:", error);
    }
  };

  const handleReject = async (proposalId) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/api/proposals/${proposalId}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      setProposals(proposals.filter(p => p._id !== proposalId));
    }
  };

  return (
    <div className="max-w-5xl pb-10">

      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Manage Proposals</h1>
        <p className="text-gray-500 mt-1 font-medium">Review and respond to freelancer proposals.</p>
      </div>

      {proposals.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center flex flex-col items-center justify-center shadow-sm">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <Icon icon="lucide:inbox" className="text-3xl text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">No proposals yet</h3>
          <p className="text-gray-500 text-sm">When freelancers bid on your tasks, they will appear here.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {proposals.map((proposal) => (

            <div key={proposal._id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">

                <div className="flex-1 space-y-3">

                  <div className="flex items-center gap-3">
                    <h2 className="text-lg font-bold text-gray-900">{proposal.task_title}</h2>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${proposal.status === 'Accepted'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                      }`}>
                      {proposal.status || 'Pending'}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500">
                    from <span className="font-bold text-gray-900">{proposal.freelancer_email}</span>
                  </p>

                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-gray-600 text-sm leading-relaxed mt-2">
                    {proposal.cover_note}
                  </div>

                  <div className="flex flex-wrap items-center gap-6 mt-4 pt-2">
                    <div className="flex items-center gap-1.5 text-sm">
                      <span className="text-gray-500 font-medium">Bid:</span>
                      <span className="font-bold text-green-600">${proposal.proposed_budget}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-gray-500 font-medium">
                      <Icon icon="lucide:clock" className="text-base" />
                      {proposal.estimated_days} days
                    </div>
                    <div className="text-sm text-gray-400 font-medium">
                      {new Date(proposal.submitted_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>

                </div>

                {proposal.status !== 'Accepted' && (
                  <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0 pt-1">

                    <button onClick={() => handleAcceptStripe(proposal)} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition-colors text-sm shadow-sm">
                      <Icon icon="lucide:check" className="text-lg" /> Accept
                    </button>

                    <AlertDialog>
                      <Button
                        variant="danger"
                        className="flex-1 md:flex-none bg-white border border-red-200 text-red-500 hover:bg-red-50 font-bold py-2 px-6 rounded-lg transition-colors text-sm h-auto data-[hover=true]:opacity-100"
                      >
                        <Icon icon="lucide:x" className="text-lg" /> Reject
                      </Button>
                      <AlertDialog.Backdrop>
                        <AlertDialog.Container>
                          <AlertDialog.Dialog className="sm:max-w-[400px] bg-white">
                            <AlertDialog.CloseTrigger className="text-gray-400 hover:text-gray-600 top-4 right-4" />
                            <AlertDialog.Header>
                              <AlertDialog.Icon status="danger" />
                              <AlertDialog.Heading className="text-xl font-bold text-gray-900">Reject proposal permanently?</AlertDialog.Heading>
                            </AlertDialog.Header>
                            <AlertDialog.Body className="text-gray-500 py-4 text-sm">
                              <p>
                                This will permanently reject and delete the proposal from <strong>{proposal.freelancer_email}</strong>. This action cannot be undone.
                              </p>
                            </AlertDialog.Body>
                            <AlertDialog.Footer className="bg-gray-50 rounded-b-xl p-4">
                              {/* slot="close" closes the modal natively */}
                              <Button slot="close" variant="tertiary" className="font-bold">
                                Cancel
                              </Button>
                              <Button
                                slot="close"
                                variant="danger"
                                className="bg-red-600 text-white font-bold"
                                onPress={() => handleReject(proposal._id)}
                              >
                                Reject Proposal
                              </Button>
                            </AlertDialog.Footer>
                          </AlertDialog.Dialog>
                        </AlertDialog.Container>
                      </AlertDialog.Backdrop>
                    </AlertDialog>

                  </div>
                )}

              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}