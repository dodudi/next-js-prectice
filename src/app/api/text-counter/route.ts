import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { text } = await request.json();

        if (text === undefined) {
            return NextResponse.json(
                { error: '텍스트를 입력해주세요.' },
                { status: 400 }
            );
        }

        const characters = text.length;
        const charactersNoSpaces = text.replace(/\s/g, '').length;
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        const lines = text.split('\n').length;
        const sentences = text.split(/[.!?]+/).filter((s: string) => s.trim()).length;
        const paragraphs = text.split(/\n\n+/).filter((p: string) => p.trim()).length;

        // 읽기 시간 계산 (평균 200 단어/분)
        const readingTime = Math.ceil(words / 200);

        return NextResponse.json({
            characters,
            charactersNoSpaces,
            words,
            lines,
            sentences,
            paragraphs,
            readingTime
        });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : '처리 중 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}
