import { prisma } from "@/db/prisma";
import { notFound, redirect } from "next/navigation";

type PageProps = {
    params: Promise<{ id: string }>;
  };
  
export default async function TinyRedirectPage({ params }: PageProps) {
    const {id} = await params;

    const entry = await prisma.urlMapper.findUnique({
        where: {tinyUrl: id}
    });

    if (!entry) {
        notFound();
    }

    redirect(entry.siteUrl);
}