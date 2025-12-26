import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { value, mode } = await request.json();

        if (!value || !mode) {
            return NextResponse.json(
                { error: '값과 모드를 입력해주세요.' },
                { status: 400 }
            );
        }

        if (mode === 'toDate') {
            // Timestamp to Date
            const timestamp = parseInt(value);
            if (isNaN(timestamp)) {
                return NextResponse.json(
                    { error: '유효하지 않은 타임스탬프입니다.' },
                    { status: 400 }
                );
            }
            const date = new Date(timestamp * 1000);
            const formatted = date.toLocaleString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZoneName: 'short'
            });
            return NextResponse.json({ result: formatted });
        } else if (mode === 'toTimestamp') {
            // Date to Timestamp
            const date = new Date(value);
            if (isNaN(date.getTime())) {
                return NextResponse.json(
                    { error: '유효하지 않은 날짜입니다.' },
                    { status: 400 }
                );
            }
            const timestamp = Math.floor(date.getTime() / 1000);
            return NextResponse.json({ result: timestamp.toString() });
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
