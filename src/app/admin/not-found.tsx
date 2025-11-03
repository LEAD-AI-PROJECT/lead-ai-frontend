import Link from "next/link";
import { Home, ArrowLeft, FileQuestion } from "lucide-react";

export default function AdminNotFound() {
     return (
          <div className="min-h-[80vh] w-full flex items-center justify-center">
               <div className="text-center px-4">
                    {/* Icon & 404 */}
                    <div className="mb-8 flex flex-col items-center">
                         <FileQuestion size={80} className="text-error mb-4" strokeWidth={1.5} />
                         <h1 className="text-[100px] md:text-[120px] font-bold text-error leading-none">
                              404
                         </h1>
                    </div>

                    {/* Message */}
                    <div className="mb-8">
                         <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                              Halaman Admin Tidak Ditemukan
                         </h2>
                         <p className="text-gray-600 max-w-md mx-auto">
                              Halaman admin yang Anda cari tidak tersedia atau telah dipindahkan.
                         </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                         <Link href="/admin" className="btn btn-primary gap-2">
                              <Home size={18} />
                              Dashboard Admin
                         </Link>
                         <Link href="/admin" className="btn btn-outline gap-2">
                              <ArrowLeft size={18} />
                              Kembali
                         </Link>
                    </div>

                    {/* Quick Links */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                         <p className="text-sm text-gray-500 mb-3">Halaman Admin Populer:</p>
                         <div className="flex flex-wrap gap-2 justify-center">
                              <Link href="/admin/news-event" className="link link-primary text-sm">
                                   News & Events
                              </Link>
                              <span className="text-gray-300">•</span>
                              <Link href="/admin/publication" className="link link-primary text-sm">
                                   Publication
                              </Link>
                              <span className="text-gray-300">•</span>
                              <Link href="/admin/profile" className="link link-primary text-sm">
                                   Profile
                              </Link>
                         </div>
                    </div>
               </div>
          </div>
     );
}
