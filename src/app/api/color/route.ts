import { NextRequest, NextResponse } from 'next/server';

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgbToHex(r: number, g: number, b: number): string {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

export async function POST(request: NextRequest) {
    try {
        const { color } = await request.json();

        if (!color) {
            return NextResponse.json(
                { error: '색상 값을 입력해주세요.' },
                { status: 400 }
            );
        }

        // HEX 입력인 경우
        if (color.startsWith('#')) {
            const rgb = hexToRgb(color);
            if (!rgb) {
                return NextResponse.json(
                    { error: '올바르지 않은 HEX 색상입니다.' },
                    { status: 400 }
                );
            }

            const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

            return NextResponse.json({
                hex: color.toUpperCase(),
                rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
                hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
            });
        }

        // RGB 입력인 경우
        const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (rgbMatch) {
            const r = parseInt(rgbMatch[1]);
            const g = parseInt(rgbMatch[2]);
            const b = parseInt(rgbMatch[3]);

            const hex = rgbToHex(r, g, b);
            const hsl = rgbToHsl(r, g, b);

            return NextResponse.json({
                hex: hex.toUpperCase(),
                rgb: `rgb(${r}, ${g}, ${b})`,
                hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
            });
        }

        return NextResponse.json(
            { error: '지원하는 형식: HEX (#RRGGBB) 또는 RGB (rgb(r, g, b))' },
            { status: 400 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : '처리 중 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}
