"use client";
import { Delete, Edit, Eye, EyeOff } from "lucide-react";
import useAdminPublicationCardHook from "./admin.publication.card.hook";
import { PublicationResponseType } from "@/types/publication";
import Image from "next/image";
import defaultImage from "@public/assets/img/default.png";
import dayjs from "dayjs";

interface Props {
     item: PublicationResponseType;
     handleDelete: (id: string) => void;
     handleTogglePublish: (id: string) => void;
}

const AdminPublicationCardView: React.FC<Props> = ({ item, handleDelete, handleTogglePublish }) => {
     const { router } = useAdminPublicationCardHook();

     const firstImage = item.images?.[0]?.imageUrl || defaultImage.src;

     return (
          <div className="card bg-base-100 shadow-lg transition-shadow">
               <figure className="relative h-48">
                    <Image src={firstImage} alt={item.title} fill className="object-cover" />
                    {item.isPublished ? (
                         <div className="badge badge-success absolute top-2 right-2 gap-1 text-white">
                              <Eye size={12} />
                              Published
                         </div>
                    ) : (
                         <div className="badge badge-warning absolute top-2 right-2 gap-1 text-white">
                              <EyeOff size={12} />
                              Draft
                         </div>
                    )}
               </figure>

               <div className="card-body p-4">
                    <h2 className="card-title text-base line-clamp-2">{item.title}</h2>

                    <p className="text-sm text-base-content/70 line-clamp-2">
                         {item.content.replaceAll(/<[^>]*>/g, "")}
                    </p>

                    <div className="text-xs text-base-content/50 mt-2">
                         Created: {dayjs(item.createdAt).format("DD/MM/YYYY | HH:mm")}
                    </div>

                    <div className="card-actions justify-end mt-3 gap-2">
                         <button
                              className="btn btn-sm btn-ghost"
                              onClick={() => handleTogglePublish(item.id)}
                              title={item.isPublished ? "Unpublish" : "Publish"}
                         >
                              {item.isPublished ? <EyeOff size={16} /> : <Eye size={16} />}
                         </button>

                         <button
                              className="btn btn-sm btn-primary"
                              onClick={() => router.push(`/admin/publication/upsert/${item.slug}`)}
                         >
                              <Edit size={16} />
                         </button>

                         <button
                              onClick={() => handleDelete(item.id)}
                              className="btn btn-sm btn-error text-white"
                         >
                              <Delete size={16} />
                         </button>
                    </div>
               </div>
          </div>
     );
};

export default AdminPublicationCardView;
