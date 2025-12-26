import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    let action: string | undefined;

    try {
        const body = await request.json();
        const { text, indentSize } = body;
        action = body.action;

        if (!text || !action) {
            return NextResponse.json(
                { error: '텍스트와 작업을 입력해주세요.' },
                { status: 400 }
            );
        }

        const parsed = JSON.parse(text);

        if (action === 'format') {
            const indent = indentSize || 2;
            const formatted = JSON.stringify(parsed, null, indent);
            return NextResponse.json({ result: formatted });
        } else if (action === 'minify') {
            const minified = JSON.stringify(parsed);
            return NextResponse.json({ result: minified });
        } else if (action === 'validate') {
            return NextResponse.json({
                result: '✅ 유효한 JSON입니다!',
                valid: true
            });
        } else {
            return NextResponse.json(
                { error: '유효하지 않은 작업입니다.' },
                { status: 400 }
            );
        }
    } catch (error) {
        if (action === 'validate') {
            return NextResponse.json({
                result: `❌ 유효하지 않은 JSON: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
                valid: false
            });
        }
        return NextResponse.json(
            { error: `JSON 파싱 오류: ${error instanceof Error ? error.message : '알 수 없는 오류'}` },
            { status: 400 }
        );
    }
}
