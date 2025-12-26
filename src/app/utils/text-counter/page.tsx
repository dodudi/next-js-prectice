"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function TextCounterPage() {
    const router = useRouter();
    const [text, setText] = useState("");
    const [stats, setStats] = useState({
        characters: 0,
        charactersNoSpaces: 0,
        words: 0,
        lines: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: 0
    });

    useEffect(() => {
        const analyze = async () => {
            try {
                const response = await fetch('/api/text-counter', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text }),
                });

                const data = await response.json();
                if (response.ok) {
                    setStats(data);
                }
            } catch (err) {
                console.error(err);
            }
        };

        const debounce = setTimeout(analyze, 300);
        return () => clearTimeout(debounce);
    }, [text]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-gray-50 to-sky-100">
            <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center space-x-4">
                        <button onClick={() => router.push('/dashboard')} className="text-gray-600 hover:text-gray-900">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </button>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">📝 텍스트 분석기</h1>
                            <p className="text-sm text-gray-500">글자 수, 단어 수를 실시간으로 확인합니다</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 resize-none"
                                placeholder="텍스트를 입력하세요..."
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-white rounded-xl shadow-lg p-4">
                            <div className="text-sm text-gray-600">글자 수</div>
                            <div className="text-3xl font-bold text-sky-600">{stats.characters.toLocaleString()}</div>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-4">
                            <div className="text-sm text-gray-600">공백 제외</div>
                            <div className="text-2xl font-bold text-gray-900">{stats.charactersNoSpaces.toLocaleString()}</div>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-4">
                            <div className="text-sm text-gray-600">단어 수</div>
                            <div className="text-2xl font-bold text-gray-900">{stats.words.toLocaleString()}</div>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-4">
                            <div className="text-sm text-gray-600">문장 수</div>
                            <div className="text-2xl font-bold text-gray-900">{stats.sentences}</div>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-4">
                            <div className="text-sm text-gray-600">읽기 시간</div>
                            <div className="text-2xl font-bold text-gray-900">{stats.readingTime}분</div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
