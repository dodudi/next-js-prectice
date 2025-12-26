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
            // Encode: Text -> Base64
            const encoder = new TextEncoder();
            const data = encoder.encode(text);
            const binaryString = String.fromCharCode(...data);
            const encoded = Buffer.from(binaryString, 'binary').toString('base64');

            return NextResponse.json({ result: encoded });
        } else if (mode === 'decode') {
            // Decode: Base64 -> Text
            const binaryString = Buffer.from(text, 'base64').toString('binary');
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            const decoder = new TextDecoder();
            const decoded = decoder.decode(bytes);

            return NextResponse.json({ result: decoded });
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
