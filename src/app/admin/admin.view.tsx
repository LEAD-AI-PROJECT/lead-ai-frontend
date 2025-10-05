import Link from "next/link";
import React from "react";

interface AdminViewProps {}

const AdminView: React.FC<AdminViewProps> = () => {
     return (
          <div className="grid lg:md:grid-cols-3 lg:w-1/2 md:w-3/4 gap-4 sm:w-full">
               <div className="card bg-white shadow-md">
                    <div className="card-body">
                         <div className="font-bold">News & Events</div>
                         <div className="text-3xl">0</div>
                         <Link className="link" href="/admin/news-event">
                              View Details
                         </Link>
                    </div>
               </div>
               <div className="card bg-white shadow-md">
                    <div className="card-body">
                         <div className="font-bold">Publication</div>
                         <div className="text-3xl">0</div>
                         <Link className="link" href="/admin/publication">
                              View Details
                         </Link>
                    </div>
               </div>
          </div>
     );
};

export default AdminView;
