import React from 'react';

const loading = () => {
  return (
    <div className="max-w-4xl pb-10 animate-pulse">
      
      <div className="mb-8">
        <div className="h-9 bg-gray-200 rounded-lg w-48 mb-3"></div>
        <div className="h-5 bg-gray-100 rounded-lg w-72"></div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
        <div className="flex flex-col gap-6 w-full max-w-2xl">
          
          <div>
            <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
            <div className="h-12 bg-gray-50 border border-gray-100 rounded-xl w-full"></div>
          </div>
          
          <div>
            <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="h-12 bg-gray-50 border border-gray-100 rounded-xl w-full"></div>
          </div>
          
          <div>
            <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
            <div className="h-32 bg-gray-50 border border-gray-100 rounded-xl w-full"></div>
          </div>
          
          <div className="h-12 bg-gray-200 rounded-xl w-full mt-2"></div>

        </div>
      </div>
      
    </div>
  );
};

export default loading;