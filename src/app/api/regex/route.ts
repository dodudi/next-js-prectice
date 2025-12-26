import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { pattern, text, flags } = await request.json();

        if (!pattern || !text) {
            return NextResponse.json(
                { error: '패턴과 텍스트를 입력해주세요.' },
                { status: 400 }
            );
        }

        const regex = new RegExp(pattern, flags || '');
        const matches = [...text.matchAll(new RegExp(pattern, (flags || '') + 'g'))];

        return NextResponse.json({
            matches: matches.map(m => ({
                match: m[0],
                index: m.index,
                groups: m.slice(1)
            })),
            count: matches.length,
            isMatch: regex.test(text)
        });
    } catch (error) {
        return NextResponse.json(
            { error: `정규표현식 오류: ${error instanceof Error ? error.message : '알 수 없는 오류'}` },
            { status: 400 }
        );
    }
}
