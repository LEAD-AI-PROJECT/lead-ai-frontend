"use client";
import { useParams } from "next/navigation";
import AdminPublicationUpsertView from "../admin.publication.upsert.view";

export default function page() {
     const slug = useParams()["slug"] as string;
     return <AdminPublicationUpsertView slug={slug} />;
}
