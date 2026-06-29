'use client';

import React, { useState } from 'react';
import { Icon } from "@iconify/react";
import { Modal, Button } from "@heroui/react";

export default function FreelancerProjectsClient({ initialProjects }) {
  const [projects, setProjects] = useState(initialProjects);

  const handleSubmitDeliverable = async (taskId) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/api/tasks/${taskId}/complete`, {
      method: 'PATCH'
    });

    if (response.ok) {
      setProjects(projects.filter(p => p._id !== taskId));
    }
  };

  return (
    <div className="max-w-4xl pb-10">
      
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Active Projects</h1>
        <p className="text-gray-500 mt-1 font-medium">{projects.length} in progress</p>
      </div>

      <div className="flex items-center gap-2 mb-6 text-blue-600 font-bold">
        <Icon icon="lucide:clock" className="text-xl" />
        <span>In Progress</span>
        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs ml-1">{projects.length}</span>
      </div>

      <div className="flex flex-col gap-5">
        {projects.length === 0 ? (
          <div className="p-8 text-center border border-gray-200 rounded-2xl bg-white shadow-sm">
            <p className="text-gray-500 font-medium">You have no active projects right now.</p>
          </div>
        ) : (
          projects.map((project) => (
            <div key={project._id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm relative hover:shadow-md transition-shadow">
              
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-lg font-bold text-gray-900">{project.title}</h2>
                <span className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                  {project.status}
                </span>
              </div>
              
              <p className="text-sm text-gray-500 mb-6">{project.description}</p>
              
              <div className="flex items-center gap-4 text-xs font-bold mb-8">
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{project.category}</span>
                <span className="text-green-600">${project.budget}</span>
                <span className="text-gray-500 flex items-center gap-1">
                  <Icon icon="lucide:calendar" className="text-base" /> 
                  {new Date(project.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>

              <div className="flex justify-between items-end border-t border-gray-100 pt-4 mt-4">
                <p className="text-xs font-medium text-gray-500">
                  Client: <span className="text-gray-900">{project.client_email}</span>
                </p>
                
                <Modal>
                  <Button 
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-5 rounded-lg flex items-center gap-2 text-sm transition-colors shadow-sm h-auto data-[hover=true]:opacity-100"
                  >
                    <Icon icon="lucide:send" className="text-base" /> Submit Deliverable
                  </Button>

                  <Modal.Backdrop>
                    <Modal.Container>
                      <Modal.Dialog className="sm:max-w-[400px] bg-white rounded-2xl">
                        <Modal.CloseTrigger className="text-gray-400 hover:text-gray-600 top-4 right-4" />
                        
                        <Modal.Header className="pt-6">
                          <Modal.Icon className="bg-emerald-50 text-emerald-500 border border-emerald-100">
                            <Icon icon="lucide:check-circle" className="text-xl" />
                          </Modal.Icon>
                          <Modal.Heading className="text-xl font-bold text-gray-900">Submit Deliverable?</Modal.Heading>
                        </Modal.Header>
                        
                        <Modal.Body className="text-gray-500 py-4 text-sm leading-relaxed">
                          <p>
                            Are you ready to submit your work and mark <strong>{project.title}</strong> as complete? 
                            This action cannot be undone.
                          </p>
                        </Modal.Body>
                        
                        <Modal.Footer className="bg-gray-50 rounded-b-2xl p-4 border-t border-gray-100">
                          <Button slot="close" variant="tertiary" className="font-bold text-gray-600 hover:bg-gray-200">
                            Cancel
                          </Button>
                          <Button 
                            slot="close" 
                            className="bg-emerald-500 text-white font-bold hover:bg-emerald-600 shadow-sm"
                            onPress={() => handleSubmitDeliverable(project._id)}
                          >
                            Yes, Submit Work
                          </Button>
                        </Modal.Footer>

                      </Modal.Dialog>
                    </Modal.Container>
                  </Modal.Backdrop>
                </Modal>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}