"use client";
import { useParams } from "next/navigation";
import AdminNewsEventUpsertByIdView from "./admin.publication.upsert.id.view";
import AdminPublicationUpsertByIdView from "./admin.publication.upsert.id.view";

export default function page() {
     const id = useParams()["id"] as string;
     return <AdminPublicationUpsertByIdView id={id} />;
}
