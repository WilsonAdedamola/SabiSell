import React from "react";

//
// 1. DASHBOARD SKELETON
//
export const DashboardSkeleton = () => (
  <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-24 lg:pb-12 w-full animate-pulse">
    <div className="max-w-7xl mx-auto space-y-6 w-full">
      {/* Welcome Banner */}
      <div className="h-40 sm:h-48 w-full bg-gray-200 rounded-4xl"></div>

      {/* Date Filter */}
      <div className="flex justify-end">
        <div className="w-32 h-10 bg-gray-200 rounded-lg"></div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>
        ))}
      </div>

      {/* Charts & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 h-80 bg-gray-200 rounded-4xl"></div>
        <div className="lg:col-span-4 h-80 bg-gray-200 rounded-4xl"></div>
      </div>

      {/* Bottom Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 h-72 bg-gray-200 rounded-4xl"></div>
        <div className="lg:col-span-4 h-72 bg-gray-200 rounded-4xl"></div>
        <div className="lg:col-span-4 h-72 bg-gray-200 rounded-4xl"></div>
      </div>
    </div>
  </div>
);


//
// 2. PRODUCTS SKELETON
//
export const ProductsSkeleton = () => (
  <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-24 lg:pb-12 w-full animate-pulse">
    <div className="w-full max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="w-40 h-8 bg-gray-200 rounded-lg"></div>
        <div className="hidden sm:block w-32 h-10 bg-gray-200 rounded-xl"></div>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-3">
        <div className="grow h-12 bg-gray-200 rounded-xl"></div>
        <div className="w-24 h-12 bg-gray-200 rounded-xl shrink-0"></div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 overflow-hidden">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="w-24 h-8 bg-gray-200 rounded-full shrink-0"></div>
        ))}
      </div>

      {/* List Container */}
      <div className="bg-gray-100 rounded-4xl overflow-hidden border border-gray-200">
        <div className="h-16 bg-gray-200 border-b border-gray-300"></div>
        <div className="divide-y divide-gray-200">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="p-4 sm:p-6 flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-300 rounded-xl shrink-0"></div>
              <div className="grow space-y-2.5">
                <div className="flex justify-between">
                  <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
                  <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
                </div>
                <div className="w-1/3 h-3 bg-gray-300 rounded"></div>
                <div className="w-2/5 h-3 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  </div>
);


//
// 3. ORDERS SKELETON
//
export const OrdersSkeleton = () => (
  <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-24 lg:pb-12 w-full animate-pulse">
    <div className="w-full max-w-4xl mx-auto space-y-6">
      
      <div className="flex items-center justify-between">
        <div className="w-32 h-8 bg-gray-200 rounded-lg"></div>
        <div className="w-28 h-10 bg-gray-200 rounded-xl"></div>
      </div>

      <div className="flex gap-3">
        <div className="grow h-12 bg-gray-200 rounded-xl"></div>
        <div className="w-24 h-12 bg-gray-200 rounded-xl shrink-0"></div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 overflow-hidden">
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-24 h-8 bg-gray-200 rounded-full shrink-0"></div>
        ))}
      </div>

      {/* Stat Cards */}
      <div className="h-40 bg-gray-200 rounded-4xl w-full"></div>

      {/* List Container */}
      <div className="bg-gray-100 rounded-4xl overflow-hidden border border-gray-200">
        <div className="h-16 bg-gray-200 border-b border-gray-300"></div>
        <div className="divide-y divide-gray-200">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-4 sm:p-6 flex items-center gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-300 rounded-full shrink-0"></div>
              <div className="grow space-y-2.5">
                <div className="flex justify-between">
                  <div className="w-1/3 h-4 bg-gray-300 rounded"></div>
                  <div className="w-16 h-4 bg-gray-300 rounded-md"></div>
                </div>
                <div className="w-1/4 h-3 bg-gray-300 rounded"></div>
                <div className="flex justify-between mt-2">
                  <div className="w-1/4 h-3 bg-gray-300 rounded"></div>
                  <div className="w-1/5 h-4 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  </div>
);


//
// 4. INBOX / MESSAGES SKELETON
//
export const InboxSkeleton = () => (
  <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-24 lg:pb-12 w-full animate-pulse">
    <div className="w-full max-w-4xl mx-auto space-y-6">
      
      <div className="w-40 h-8 bg-gray-200 rounded-lg"></div>

      <div className="flex gap-3">
        <div className="grow h-12 bg-gray-200 rounded-xl"></div>
        <div className="w-24 h-12 bg-gray-200 rounded-xl shrink-0"></div>
      </div>

      <div className="flex gap-3 overflow-hidden">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="w-24 h-8 bg-gray-200 rounded-full shrink-0"></div>
        ))}
      </div>

      {/* Tip Banner */}
      <div className="w-full h-16 bg-gray-200 rounded-2xl"></div>

      {/* Chat List */}
      <div className="bg-gray-100 rounded-4xl overflow-hidden border border-gray-200">
        <div className="divide-y divide-gray-200">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="p-4 sm:p-5 flex items-center gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-300 rounded-full shrink-0"></div>
              <div className="grow space-y-2">
                <div className="flex justify-between">
                  <div className="w-1/3 h-4 bg-gray-300 rounded"></div>
                  <div className="w-12 h-3 bg-gray-300 rounded"></div>
                </div>
                <div className="w-2/3 h-3 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Business Tools */}
      <div className="h-32 bg-gray-200 rounded-4xl w-full"></div>

    </div>
  </div>
);


//
// 5. SETTINGS SKELETON (Master-Detail Split)
//
export const SettingsSkeleton = () => (
  <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-24 lg:pb-12 w-full animate-pulse">
    <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-8">
      
      {/* Left Menu Skeleton (Hidden on mobile detail view, handled by layout) */}
      <div className="w-full lg:w-95 xl:w-105 shrink-0 flex flex-col gap-6">
        <div className="w-48 h-8 bg-gray-200 rounded-lg hidden lg:block"></div>
        
        {/* Profile Card */}
        <div className="h-24 bg-gray-200 rounded-3xl"></div>
        
        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 gap-3">
           {[1, 2, 3, 4].map(i => <div key={i} className="h-20 bg-gray-200 rounded-2xl"></div>)}
        </div>

        {/* Menu List */}
        <div className="bg-gray-100 rounded-3xl overflow-hidden divide-y divide-gray-200 border border-gray-200">
           {[1, 2, 3, 4, 5, 6].map(i => (
             <div key={i} className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-300 rounded-xl shrink-0"></div>
                <div className="space-y-2 flex-1">
                   <div className="w-1/2 h-3 bg-gray-300 rounded"></div>
                   <div className="w-3/4 h-2.5 bg-gray-300 rounded"></div>
                </div>
             </div>
           ))}
        </div>
      </div>

      {/* Right Detail Skeleton */}
      <div className="hidden lg:flex w-full flex-1 flex-col bg-gray-100 rounded-4xl border border-gray-200 min-h-[600px] overflow-hidden">
        {/* Header */}
        <div className="h-16 bg-gray-200 border-b border-gray-300 px-6 flex items-center justify-between shrink-0">
           <div className="w-48 h-5 bg-gray-300 rounded"></div>
           <div className="w-20 h-5 bg-gray-300 rounded"></div>
        </div>
        
        {/* Form Body */}
        <div className="p-8 space-y-8">
           {/* Logo row */}
           <div className="flex gap-4">
              <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
              <div className="w-24 h-24 bg-gray-300 rounded-2xl"></div>
           </div>
           
           {/* Form Inputs */}
           <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="space-y-2">
                   <div className="w-32 h-4 bg-gray-300 rounded"></div>
                   <div className="w-full h-12 bg-gray-300 rounded-xl"></div>
                </div>
              ))}
              <div className="space-y-2">
                 <div className="w-32 h-4 bg-gray-300 rounded"></div>
                 <div className="w-full h-24 bg-gray-300 rounded-xl"></div>
              </div>
           </div>
        </div>
      </div>

    </div>
  </div>
);