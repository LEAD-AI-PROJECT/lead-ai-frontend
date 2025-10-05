"use client";
import { useParams } from "next/navigation";
import AdminNewsEventUpsertByIdView from "./admin.news.event.upsert.id.view";

export default function page() {
     const id = useParams()["id"] as string;
     return <AdminNewsEventUpsertByIdView id={id} />;
}
