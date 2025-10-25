"use client";
import { useParams } from "next/navigation";
import AdminNewsEventUpsertView from "../admin.news.event.upsert.view";

export default function page() {
     const slug = useParams()["slug"] as string;
     return <AdminNewsEventUpsertView slug={slug} />;
}
