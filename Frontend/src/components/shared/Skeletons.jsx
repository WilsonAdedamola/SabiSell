// 1. DASHBOARD SKELETON

export const DashboardSkeleton = () => {
  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-24 lg:pb-12 w-full animate-pulse">
      <div className="max-w-7xl mx-auto w-full space-y-6 mt-4 sm:mt-0">
        
        {/* 1. WELCOME BANNER SKELETON */}
        <div className="bg-gray-200 rounded-4xl p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6 h-auto md:h-40 border border-gray-100">
          <div className="flex flex-col sm:flex-row items-center gap-5 w-full">
            {/* Logo Circle */}
            <div className="w-20 h-20 bg-gray-300 rounded-full shrink-0 border-4 border-gray-100"></div>
            {/* Text Lines */}
            <div className="space-y-3 w-full max-w-sm flex flex-col items-center sm:items-start">
              <div className="h-8 bg-gray-300 rounded-xl w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded-lg w-full sm:w-5/6"></div>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex-col gap-3 w-full md:w-auto items-center md:items-end hidden sm:flex">
             <div className="h-8 bg-gray-300 rounded-full w-24"></div>
             <div className="h-10 bg-gray-300 rounded-xl w-32"></div>
          </div>
        </div>

        {/* 2. STAT CARDS SKELETON */}
        <div>
          <div className="flex justify-end mb-4">
            <div className="h-9 bg-gray-200 rounded-lg w-28"></div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-100 rounded-2xl p-5 border border-gray-200 h-36 flex flex-col justify-center">
                <div className="w-10 h-10 rounded-full bg-gray-300 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded-md w-24 mb-3"></div>
                <div className="h-7 bg-gray-300 rounded-lg w-20"></div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. RECENT ORDERS SKELETON */}
        <div className="bg-white rounded-4xl p-6 border border-gray-100 shadow-sm flex flex-col min-h-75">
          <div className="flex justify-between items-center mb-6">
            <div className="h-6 bg-gray-200 rounded-lg w-32"></div>
            <div className="h-4 bg-gray-200 rounded-md w-16"></div>
          </div>
          
          <div className="flex-1 flex flex-col gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded-md w-32"></div>
                    <div className="h-3 bg-gray-200 rounded-md w-20"></div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="h-4 bg-gray-300 rounded-md w-16"></div>
                  <div className="h-5 bg-gray-300 rounded-md w-24"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

// PRODUCT LIST SKELETON
export const ProductListSkeleton = () => {
  return (
    <div className="animate-pulse divide-y divide-gray-100 w-full">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="p-4 sm:p-6 flex items-center gap-4 w-full">
          {/* Image Thumbnail */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-xl shrink-0"></div>
          
          <div className="grow flex flex-col gap-2.5">
            {/* Title & Price Row */}
            <div className="flex justify-between items-center w-full">
              <div className="h-5 bg-gray-200 rounded w-1/3"></div>
              <div className="h-5 bg-gray-200 rounded w-16"></div>
            </div>
            {/* Status & Stock Row */}
            <div className="flex items-center gap-2">
              <div className="h-4 bg-gray-200 rounded-full w-16"></div>
              <div className="h-3 bg-gray-200 rounded w-20"></div>
            </div>
            {/* Category Row */}
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
            <div className="w-8 h-8 bg-gray-200 rounded-lg hidden sm:block"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ADD/EDIT PRODUCT SKELETON
export const AddEditProductSkeleton = () => {
  return (
    <div className="flex-1 overflow-y-auto h-full p-4 sm:p-6 lg:p-8 pb-32 lg:pb-20 w-full bg-sabi-surface animate-pulse">
      <div className="w-full max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            <div className="w-32 h-7 bg-gray-200 rounded-lg"></div>
          </div>
          <div className="w-20 h-5 bg-gray-200 rounded-md"></div>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-between relative mb-8 px-4 sm:px-10">
          <div className="absolute left-10 right-10 top-3 h-0.5 bg-gray-200 z-0"></div>
          <div className="relative z-10 flex flex-col items-center gap-2 bg-sabi-surface px-2">
            <div className="w-6 h-6 rounded-full bg-gray-200"></div>
            <div className="w-16 h-3 bg-gray-200 rounded mt-1"></div>
          </div>
          <div className="relative z-10 flex flex-col items-center gap-2 bg-sabi-surface px-2">
            <div className="w-6 h-6 rounded-full bg-gray-200"></div>
            <div className="w-16 h-3 bg-gray-200 rounded mt-1"></div>
          </div>
          <div className="relative z-10 flex flex-col items-center gap-2 bg-sabi-surface px-2">
            <div className="w-6 h-6 rounded-full bg-gray-200"></div>
            <div className="w-16 h-3 bg-gray-200 rounded mt-1"></div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl sm:rounded-4xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-8">
          
          {/* Images Section */}
          <div>
            <div className="w-32 h-4 bg-gray-200 rounded mb-2"></div>
            <div className="w-48 h-3 bg-gray-100 rounded mb-4"></div>
            <div className="flex gap-3 overflow-hidden">
              <div className="w-24 h-24 rounded-2xl bg-gray-200 shrink-0"></div>
              <div className="w-24 h-24 rounded-2xl bg-gray-200 shrink-0"></div>
              <div className="w-24 h-24 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-300 shrink-0"></div>
            </div>
          </div>

          {/* Inputs Section */}
          <div className="space-y-6">
            <div>
              <div className="w-24 h-4 bg-gray-200 rounded mb-2"></div>
              <div className="w-full h-14 bg-gray-200 rounded-xl"></div>
            </div>
            <div>
              <div className="w-24 h-4 bg-gray-200 rounded mb-2"></div>
              <div className="w-full h-14 bg-gray-200 rounded-xl"></div>
            </div>
            <div>
              <div className="w-32 h-4 bg-gray-200 rounded mb-2"></div>
              <div className="w-full h-32 bg-gray-200 rounded-xl"></div>
            </div>
          </div>

          {/* Bottom Button */}
          <div className="w-full h-14 bg-gray-200 rounded-xl mt-4"></div>
        </div>

      </div>
    </div>
  );
};


// ORDERS SKELETON
export const OrdersSkeleton = () => {
  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-24 lg:pb-12 w-full animate-pulse bg-sabi-surface">
      <div className="w-full max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="w-32 h-8 bg-gray-200 rounded-lg mb-2"></div>
            <div className="w-64 h-4 bg-gray-200 rounded-md"></div>
          </div>
          <div className="w-full sm:w-32 h-11 bg-white border border-gray-200 rounded-xl"></div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-24 h-4 bg-gray-200 rounded"></div>
                <div className="w-8 h-8 rounded-full bg-gray-100"></div>
              </div>
              <div className="w-32 h-8 bg-gray-200 rounded-lg mb-2"></div>
              <div className="w-40 h-3 bg-gray-100 rounded"></div>
            </div>
          ))}
        </div>

        {/* Search & Filter */}
        <div className="flex gap-3">
          <div className="grow h-12 bg-white border border-gray-200 rounded-xl"></div>
          <div className="w-24 h-12 bg-white border border-gray-200 rounded-xl shrink-0"></div>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-hidden gap-3 pb-2">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="w-28 h-10 bg-gray-200 rounded-full shrink-0"></div>
          ))}
        </div>

        {/* Table/List Container */}
        <div className="bg-white border border-gray-200 rounded-3xl sm:rounded-4xl overflow-hidden shadow-sm">
          <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
             <div className="w-32 h-5 bg-gray-200 rounded"></div>
             <div className="w-24 h-4 bg-gray-200 rounded hidden sm:block"></div>
          </div>

          {/* Mobile View: Cards */}
          <div className="lg:hidden divide-y divide-gray-100">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="p-4 sm:p-6 flex items-center gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-200 shrink-0"></div>
                <div className="grow space-y-2.5">
                  <div className="flex justify-between items-center">
                     <div className="w-32 h-4 bg-gray-200 rounded"></div>
                     <div className="w-16 h-5 bg-gray-200 rounded-md"></div>
                  </div>
                  <div className="w-48 h-3 bg-gray-100 rounded"></div>
                  <div className="flex justify-between items-center pt-1">
                     <div className="w-24 h-3 bg-gray-100 rounded"></div>
                     <div className="w-20 h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View: Table Rows */}
          <div className="hidden lg:block">
            <div className="flex items-center px-6 py-4 bg-gray-50/50 border-b border-gray-100">
               <div className="w-full flex justify-between gap-4">
                 <div className="w-20 h-3 bg-gray-200 rounded"></div>
                 <div className="w-32 h-3 bg-gray-200 rounded"></div>
                 <div className="w-24 h-3 bg-gray-200 rounded"></div>
                 <div className="w-16 h-3 bg-gray-200 rounded"></div>
                 <div className="w-20 h-3 bg-gray-200 rounded"></div>
                 <div className="w-16 h-3 bg-gray-200 rounded"></div>
               </div>
            </div>
            <div className="divide-y divide-gray-100">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="flex items-center justify-between px-6 py-5">
                  <div className="w-24 h-4 bg-gray-200 rounded"></div>
                  <div className="flex items-center gap-3 w-48">
                     <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0"></div>
                     <div className="w-32 h-4 bg-gray-200 rounded"></div>
                  </div>
                  <div className="w-24 h-4 bg-gray-200 rounded"></div>
                  <div className="w-20 h-6 bg-gray-200 rounded-md"></div>
                  <div className="w-20 h-4 bg-gray-200 rounded"></div>
                  <div className="w-20 h-8 bg-gray-100 rounded-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// ORDER DETAILS SKELETON
export const OrderDetailsSkeleton = () => {
  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-24 lg:pb-12 w-full animate-pulse">
      <div className="w-full max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-2 mx-auto w-full">
          <div className="flex flex-col items-center justify-center gap-2 w-full">
            <div className="w-32 h-6 bg-gray-200 rounded-lg"></div>
            <div className="w-20 h-4 bg-gray-200 rounded-md"></div>
          </div>
        </div>

        {/* Status Banner */}
        <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between shadow-sm">
           <div className="flex items-center gap-3 w-full">
              <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0"></div>
              <div className="space-y-2">
                 <div className="w-20 h-4 bg-gray-200 rounded"></div>
                 <div className="w-48 h-3 bg-gray-100 rounded"></div>
              </div>
           </div>
           <div className="hidden sm:block space-y-2">
              <div className="w-12 h-4 bg-gray-200 rounded ml-auto"></div>
              <div className="w-16 h-3 bg-gray-100 rounded ml-auto"></div>
           </div>
        </div>

        {/* Customer Information */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-sm">
           <div className="w-32 h-4 bg-gray-200 rounded mb-5"></div>
           <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 shrink-0"></div>
              <div className="space-y-3 grow">
                 <div className="w-32 h-5 bg-gray-200 rounded"></div>
                 <div className="w-40 h-4 bg-gray-100 rounded"></div>
                 <div className="w-full max-w-50 h-4 bg-gray-100 rounded"></div>
              </div>
           </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-sm">
           <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
              <div className="w-24 h-4 bg-gray-200 rounded"></div>
              <div className="w-32 h-4 bg-gray-200 rounded"></div>
           </div>
           
           <div className="space-y-4 mb-6">
              {/* Item 1 */}
              <div className="flex gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                 <div className="w-14 h-14 bg-gray-200 rounded-lg shrink-0"></div>
                 <div className="grow space-y-2 pt-1">
                    <div className="w-32 h-4 bg-gray-200 rounded"></div>
                    <div className="w-20 h-3 bg-gray-200 rounded"></div>
                 </div>
                 <div className="w-16 h-4 bg-gray-200 rounded mt-1"></div>
              </div>
              {/* Item 2 */}
              <div className="flex gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                 <div className="w-14 h-14 bg-gray-200 rounded-lg shrink-0"></div>
                 <div className="grow space-y-2 pt-1">
                    <div className="w-40 h-4 bg-gray-200 rounded"></div>
                    <div className="w-16 h-3 bg-gray-200 rounded"></div>
                 </div>
                 <div className="w-16 h-4 bg-gray-200 rounded mt-1"></div>
              </div>
           </div>

           {/* Summary Totals */}
           <div className="space-y-3 pt-4 border-t border-gray-100">
              <div className="flex justify-between"><div className="w-16 h-4 bg-gray-200 rounded"></div><div className="w-16 h-4 bg-gray-200 rounded"></div></div>
              <div className="flex justify-between"><div className="w-20 h-4 bg-gray-200 rounded"></div><div className="w-12 h-4 bg-gray-200 rounded"></div></div>
              <div className="flex justify-between pt-3 border-t border-gray-100"><div className="w-24 h-5 bg-gray-200 rounded"></div><div className="w-24 h-5 bg-gray-200 rounded"></div></div>
           </div>
        </div>

        {/* Payment & Fulfillment */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-sm">
           <div className="w-40 h-4 bg-gray-200 rounded mb-6"></div>
           <div className="space-y-5 mb-6">
              <div className="flex justify-between"><div className="w-32 h-4 bg-gray-100 rounded"></div><div className="w-16 h-6 bg-gray-200 rounded-md"></div></div>
              <div className="flex justify-between"><div className="w-32 h-4 bg-gray-100 rounded"></div><div className="w-24 h-4 bg-gray-200 rounded"></div></div>
              <div className="flex justify-between"><div className="w-24 h-4 bg-gray-100 rounded"></div><div className="w-32 h-4 bg-gray-200 rounded"></div></div>
           </div>
           <div className="w-full h-12 bg-gray-200 rounded-xl"></div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
           <div className="w-full h-12 bg-gray-200 rounded-xl"></div>
           <div className="w-full h-12 bg-gray-200 rounded-xl"></div>
        </div>

      </div>
    </div>
  );
};

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