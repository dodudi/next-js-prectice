import { NextRequest, NextResponse } from 'next/server';

const conversions: Record<string, Record<string, number>> = {
    length: {
        meter: 1,
        kilometer: 0.001,
        centimeter: 100,
        millimeter: 1000,
        mile: 0.000621371,
        yard: 1.09361,
        foot: 3.28084,
        inch: 39.3701,
    },
    weight: {
        kilogram: 1,
        gram: 1000,
        milligram: 1000000,
        pound: 2.20462,
        ounce: 35.274,
        ton: 0.001,
    }
};

function convertTemperature(value: number, from: string, to: string): number {
    let celsius = value;

    if (from === 'fahrenheit') celsius = (value - 32) * 5/9;
    if (from === 'kelvin') celsius = value - 273.15;

    if (to === 'fahrenheit') return celsius * 9/5 + 32;
    if (to === 'kelvin') return celsius + 273.15;
    return celsius;
}

export async function POST(request: NextRequest) {
    try {
        const { value, from, to, category } = await request.json();

        if (!value || !from || !to || !category) {
            return NextResponse.json(
                { error: '모든 필드를 입력해주세요.' },
                { status: 400 }
            );
        }

        const numValue = parseFloat(value);
        if (isNaN(numValue)) {
            return NextResponse.json(
                { error: '올바른 숫자를 입력해주세요.' },
                { status: 400 }
            );
        }

        let result: number;

        if (category === 'temperature') {
            result = convertTemperature(numValue, from, to);
        } else {
            const categoryConversions = conversions[category];
            if (!categoryConversions) {
                return NextResponse.json(
                    { error: '올바르지 않은 카테고리입니다.' },
                    { status: 400 }
                );
            }

            const baseValue = numValue / categoryConversions[from];
            result = baseValue * categoryConversions[to];
        }

        return NextResponse.json({ result });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : '처리 중 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}
