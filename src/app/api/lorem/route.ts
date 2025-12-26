import { NextRequest, NextResponse } from 'next/server';

const LOREM_WORDS = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
];

function generateWords(count: number): string {
    const words = [];
    for (let i = 0; i < count; i++) {
        words.push(LOREM_WORDS[i % LOREM_WORDS.length]);
    }
    return words.join(' ');
}

function generateParagraphs(count: number): string {
    const paragraphs = [];
    for (let i = 0; i < count; i++) {
        const wordCount = Math.floor(Math.random() * 30) + 40; // 40-70 단어
        let paragraph = generateWords(wordCount);
        paragraph = paragraph.charAt(0).toUpperCase() + paragraph.slice(1) + '.';
        paragraphs.push(paragraph);
    }
    return paragraphs.join('\n\n');
}

export async function POST(request: NextRequest) {
    try {
        const { type, count } = await request.json();

        if (!type || !count) {
            return NextResponse.json(
                { error: '타입과 개수를 입력해주세요.' },
                { status: 400 }
            );
        }

        let result = '';

        if (type === 'words') {
            result = generateWords(Math.min(count, 1000));
        } else if (type === 'paragraphs') {
            result = generateParagraphs(Math.min(count, 50));
        } else {
            return NextResponse.json(
                { error: '올바르지 않은 타입입니다.' },
                { status: 400 }
            );
        }

        return NextResponse.json({ result });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : '처리 중 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}
