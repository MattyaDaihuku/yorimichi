import { NextResponse } from "next/server";
import { chatLists } from "@/lib/mock-db";

export async function GET() {
    // 実際のDBならここで SELECT * FROM CHATLIST WHERE user_id = ...
    // 今回はモックデータをそのまま返します
    return NextResponse.json(chatLists);
}