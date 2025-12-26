"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoremPage() {
    const router = useRouter();
    const [type, setType] = useState<'words' | 'paragraphs'>('paragraphs');
    const [count, setCount] = useState(3);
    const [result, setResult] = useState("");

    const handleGenerate = async () => {
        try {
            const response = await fetch('/api/lorem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ type, count }),
            });

            const data = await response.json();

            if (response.ok) {
                setResult(data.result);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-gray-50 to-amber-100">
            <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center space-x-4">
                        <button onClick={() => router.push('/dashboard')} className="text-gray-600 hover:text-gray-900">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </button>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900 flex items-center">
                                <span className="mr-2">📝</span>
                                Lorem Ipsum 생성기
                            </h1>
                            <p className="text-sm text-gray-500">더미 텍스트를 생성합니다</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="space-y-6 mb-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">타입</label>
                            <div className="flex items-center space-x-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        checked={type === 'paragraphs'}
                                        onChange={() => setType('paragraphs')}
                                        className="mr-2"
                                    />
                                    <span className="text-gray-700">문단</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        checked={type === 'words'}
                                        onChange={() => setType('words')}
                                        className="mr-2"
                                    />
                                    <span className="text-gray-700">단어</span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                {type === 'paragraphs' ? '문단 개수' : '단어 개수'}: {count}
                            </label>
                            <input
                                type="range"
                                value={count}
                                onChange={(e) => setCount(parseInt(e.target.value))}
                                min="1"
                                max={type === 'paragraphs' ? '20' : '500'}
                                className="w-full"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-center space-x-4 mb-6">
                        <button onClick={handleGenerate} className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg shadow-md transition-colors">
                            생성
                        </button>
                        {result && (
                            <button onClick={() => navigator.clipboard.writeText(result)} className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors">
                                복사
                            </button>
                        )}
                    </div>

                    {result && (
                        <div className="p-6 bg-amber-50 border border-amber-200 rounded-lg">
                            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{result}</p>
                        </div>
                    )}
                </div>

                <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-6">
                    <h3 className="font-semibold text-amber-900 mb-2">Lorem Ipsum이란?</h3>
                    <p className="text-sm text-amber-800">
                        Lorem Ipsum은 디자인과 출판 업계에서 사용되는 표준 더미 텍스트입니다.
                        레이아웃을 확인하거나 프로토타입을 만들 때 유용합니다.
                    </p>
                </div>
            </main>
        </div>
    );
}
