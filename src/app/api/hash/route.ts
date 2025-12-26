import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
    try {
        const { text } = await request.json();

        if (!text) {
            return NextResponse.json(
                { error: '텍스트를 입력해주세요.' },
                { status: 400 }
            );
        }

        // Generate SHA-256 hash
        const sha256Hash = crypto.createHash('sha256').update(text).digest('hex');

        // Generate MD5 hash
        const md5Hash = crypto.createHash('md5').update(text).digest('hex');

        return NextResponse.json({
            sha256: sha256Hash,
            md5: md5Hash
        });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : '처리 중 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}
