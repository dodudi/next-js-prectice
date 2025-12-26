import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { token } = await request.json();

        if (!token) {
            return NextResponse.json(
                { error: 'JWT 토큰을 입력해주세요.' },
                { status: 400 }
            );
        }

        // JWT 파싱 (검증 없이 디코딩만)
        const parts = token.split('.');

        if (parts.length !== 3) {
            return NextResponse.json(
                { error: '올바르지 않은 JWT 형식입니다.' },
                { status: 400 }
            );
        }

        const [headerB64, payloadB64, signature] = parts;

        // Base64 디코딩
        const header = JSON.parse(Buffer.from(headerB64, 'base64').toString());
        const payload = JSON.parse(Buffer.from(payloadB64, 'base64').toString());

        return NextResponse.json({
            header,
            payload,
            signature
        });
    } catch (error) {
        return NextResponse.json(
            { error: `JWT 디코딩 오류: ${error instanceof Error ? error.message : '알 수 없는 오류'}` },
            { status: 400 }
        );
    }
}
