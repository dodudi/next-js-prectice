import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { text1, text2 } = await request.json();

        if (text1 === undefined || text2 === undefined) {
            return NextResponse.json(
                { error: '두 개의 텍스트를 입력해주세요.' },
                { status: 400 }
            );
        }

        const lines1 = text1.split('\n');
        const lines2 = text2.split('\n');
        const maxLen = Math.max(lines1.length, lines2.length);

        const result: Array<{type: 'same' | 'diff1' | 'diff2', content: string}> = [];

        for (let i = 0; i < maxLen; i++) {
            const line1 = lines1[i] || '';
            const line2 = lines2[i] || '';

            if (line1 === line2) {
                result.push({ type: 'same', content: line1 });
            } else {
                if (line1) result.push({ type: 'diff1', content: `- ${line1}` });
                if (line2) result.push({ type: 'diff2', content: `+ ${line2}` });
            }
        }

        return NextResponse.json({ result });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : '처리 중 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}
