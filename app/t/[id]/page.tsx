import { prisma } from "@/db/prisma";
import { redirect } from "next/navigation";

type Props = {
    params: {
        id: string;
    };
};


export default async function TinyRedirectPage({params}: Props) {
    const shortId = params.id;

    const entry = await prisma.urlMapper.findUnique({
        where: {tinyUrl: shortId}
    });

    if (!entry) {
        return (
          <div className="w-full h-screen flex items-center justify-center">
            <h1 className="text-2xl font-semibold text-red-500">404 - Link not found</h1>
          </div>
        );
    }

    redirect(entry.siteUrl);
}