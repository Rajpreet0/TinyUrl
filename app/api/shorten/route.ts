import { prisma } from "@/db/prisma";
import { customAlphabet } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890', 6)

export async function POST(req: NextRequest) {
    const body = await  req.json();
    const { url } = body;

    if (!url || !url.startsWith("http")){
        return NextResponse.json({error: "Ungültige URL"}, { status: 400 })
    }

    const shortId = nanoid();

    const created = await prisma.urlMapper.create({
        data: {
            tinyUrl: shortId,
            siteUrl: url
        }
    });

    return NextResponse.json({tinyUrl: created.tinyUrl})
}