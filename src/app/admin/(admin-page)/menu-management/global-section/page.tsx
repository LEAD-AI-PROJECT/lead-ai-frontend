import { Suspense } from "react";
import AdminMenuManagementGlobalSectionView from "./admin.mm.global-section.view";

function AdminMenuManagementGlobalSectionViewWrapper() {
     return <AdminMenuManagementGlobalSectionView />;
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
               <AdminMenuManagementGlobalSectionViewWrapper />
          </Suspense>
     );
}
