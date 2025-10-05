"use client";
import { Delete, Edit } from "lucide-react";
import useAdminNewsEventCardHook from "./admin.news.event.card.hook";
import { NewsEventResponseType } from "@/types/news-event";
import Image from "next/image";
import defaultImage from "@public/assets/img/default.png";
import dayjs from "dayjs";

interface Props extends NewsEventResponseType {
     handleDelete: (id: string) => void;
}
const AdminNewsEventCardView: React.FC<Props> = ({
     image_url,
     title,
     description,
     id,
     created_at,
     updated_at,
     handleDelete,
}) => {
     const { router } = useAdminNewsEventCardHook();
     return (
          <div className="card bg-white w-96 shadow-sm z-1">
               <figure>
                    <Image
                         src={image_url ?? defaultImage.src}
                         alt={title ?? "news image"}
                         width={384}
                         height={216}
                         className="object-cover w-full h-48"
                    />
               </figure>
               <div className="card-body">
                    <h2 className="card-title">{title}</h2>
                    <p>
                         {(description ?? "").length > 50
                              ? (description ?? "").slice(0, 50) + "..."
                              : description ?? ""}
                    </p>
                    <div className="card-actions justify-between items-end mt-2">
                         <div className="text-xs flex flex-col gap-1">
                              {dayjs(created_at ?? new Date()).format("DD/MM/YYYY")}
                              <div className="">
                                   {updated_at && (
                                        <div className="bg-success/10 text-success px-2 py-1 rounded-full inline-block">
                                             <span>Updated At: </span>
                                             {dayjs(updated_at).format("DD/MM/YYYY")}
                                        </div>
                                   )}
                              </div>
                         </div>
                         <div className="flex gap-2">
                              <button
                                   className="btn btn-primary"
                                   onClick={() => router.push(`/admin/news-event/upsert/${id}`)}
                              >
                                   <Edit />
                              </button>
                              <button
                                   onClick={() => handleDelete(id)}
                                   className="btn btn-secondary"
                              >
                                   <Delete />
                              </button>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default AdminNewsEventCardView;
