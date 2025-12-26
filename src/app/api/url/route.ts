import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { text, mode } = await request.json();

        if (!text || !mode) {
            return NextResponse.json(
                { error: '텍스트와 모드를 입력해주세요.' },
                { status: 400 }
            );
        }

        if (mode === 'encode') {
            const encoded = encodeURIComponent(text);
            return NextResponse.json({ result: encoded });
        } else if (mode === 'decode') {
            try {
                const decoded = decodeURIComponent(text);
                return NextResponse.json({ result: decoded });
            } catch (error) {
                return NextResponse.json(
                    { error: '디코딩 오류: 올바르지 않은 URL 인코딩 문자열입니다.' },
                    { status: 400 }
                );
            }
        } else {
            return NextResponse.json(
                { error: '유효하지 않은 모드입니다.' },
                { status: 400 }
            );
        }
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : '처리 중 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}
