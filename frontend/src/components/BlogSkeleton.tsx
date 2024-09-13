export const BlogSkeleton = () => {
  return (
    <div role="status" className="animate-pulse">
      <div className="border-b border-slate-200 p-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
          <div className="h-4 bg-gray-200 rounded-full w-4 mb-4"></div>
          <div className="font-light pl-2 text-sm flex justify-center flex-col">
            <div className="h-2.5 bg-gray-200 rounded-full w-20 mb-4"></div>
          </div>
          <div className="flex justify-center align-items-center flex-col pl-2">
            <div className="w-1 h-1 rounded-full bg-slate-500"></div>
          </div>
          <div className="pl-2 font-thin text-sm text-slate-500 flex justify-center flex-col">
            <div className="h-2.5 bg-gray-200 rounded-full w-20 mb-4"></div>
          </div>
        </div>
        <div className="text-xl font-semibold pt-2">
          <div className="h-4 bg-gray-200 rounded-full w-48 mb-4"></div>
        </div>
        <div className="text-md font-thin">
          <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
          <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
        </div>
        <div className="text-slate-400 text-sm font-thin pt-4">
          <div className="h-2 bg-gray-200 rounded-full w-15 mb-4"></div>
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
