import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { height, weight, unit } = await request.json();

        if (!height || !weight) {
            return NextResponse.json(
                { error: '키와 몸무게를 입력해주세요.' },
                { status: 400 }
            );
        }

        let heightM = parseFloat(height);
        let weightKg = parseFloat(weight);

        if (isNaN(heightM) || isNaN(weightKg)) {
            return NextResponse.json(
                { error: '올바른 숫자를 입력해주세요.' },
                { status: 400 }
            );
        }

        // 단위 변환
        if (unit === 'imperial') {
            // 인치 -> 미터, 파운드 -> kg
            heightM = heightM * 0.0254;
            weightKg = weightKg * 0.453592;
        } else {
            // cm -> 미터
            heightM = heightM / 100;
        }

        const bmi = weightKg / (heightM * heightM);

        let category = '';
        let description = '';

        if (bmi < 18.5) {
            category = '저체중';
            description = '체중이 부족합니다';
        } else if (bmi < 23) {
            category = '정상';
            description = '건강한 체중입니다';
        } else if (bmi < 25) {
            category = '과체중';
            description = '체중이 약간 많습니다';
        } else if (bmi < 30) {
            category = '비만';
            description = '비만 단계입니다';
        } else {
            category = '고도비만';
            description = '고도비만 단계입니다';
        }

        return NextResponse.json({
            bmi: bmi.toFixed(1),
            category,
            description
        });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : '처리 중 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}
