import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
    try {
        const { count } = await request.json();
        const numUuids = Math.min(count || 1, 100); // 최대 100개

        const uuids = Array.from({ length: numUuids }, () => crypto.randomUUID());

        return NextResponse.json({ uuids });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : '처리 중 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}
