import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
    try {
        const { length, includeUppercase, includeLowercase, includeNumbers, includeSymbols } = await request.json();

        const passwordLength = Math.min(length || 16, 128);

        let charset = '';
        if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (includeNumbers) charset += '0123456789';
        if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

        if (charset === '') {
            return NextResponse.json(
                { error: '최소 하나의 문자 유형을 선택해주세요.' },
                { status: 400 }
            );
        }

        let password = '';
        const randomBytes = crypto.randomBytes(passwordLength);

        for (let i = 0; i < passwordLength; i++) {
            password += charset[randomBytes[i] % charset.length];
        }

        return NextResponse.json({ password });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : '처리 중 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}
