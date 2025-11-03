import { Suspense } from "react";
import AdminMenuManagementHomeSectionView from "./admin.mm.home-section.view";

function AdminMenuManagementHomeSectionViewWrapper() {
     return <AdminMenuManagementHomeSectionView />;
}

export default function page() {
     return (
          <Suspense
               fallback={
                    <div className="flex justify-center py-8">
                         <span className="loading loading-spinner loading-lg"></span>
                    </div>
               }
          >
               <AdminMenuManagementHomeSectionViewWrapper />
          </Suspense>
     );
}
