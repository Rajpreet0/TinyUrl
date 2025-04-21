import { prisma } from "@/db/prisma";
import { notFound, redirect } from "next/navigation";

type Props = {
    params: {
      id: string;
    };
  };

export default async function TinyRedirectPage({ params }: Props) {
    const shortId = params.id;

    const entry = await prisma.urlMapper.findUnique({
        where: {tinyUrl: shortId}
    });

    if (!entry) {
        notFound();
    }

    redirect(entry.siteUrl);
}