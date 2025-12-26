"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DiffPage() {
    const router = useRouter();
    const [text1, setText1] = useState("");
    const [text2, setText2] = useState("");
    const [diffResult, setDiffResult] = useState<Array<{type: 'same' | 'diff1' | 'diff2', content: string}>>([]);

    const compareDiff = async () => {
        try {
            const response = await fetch('/api/diff', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text1, text2 }),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error(data.error);
                return;
            }

            setDiffResult(data.result);
        } catch (err) {
            console.error(err instanceof Error ? err.message : '처리 중 오류가 발생했습니다.');
        }
    };

    const swapTexts = () => {
        const temp = text1;
        setText1(text2);
        setText2(temp);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-gray-50 to-yellow-100">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => router.push('/dashboard')}
                                className="text-gray-600 hover:text-gray-900"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                            </button>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900 flex items-center">
                                    <span className="mr-2">📊</span>
                                    텍스트 비교 도구
                                </h1>
                                <p className="text-sm text-gray-500">두 텍스트의 차이점을 비교합니다</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                        {/* Text 1 */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                텍스트 1
                            </label>
                            <textarea
                                value={text1}
                                onChange={(e) => setText1(e.target.value)}
                                className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none font-mono text-sm"
                                placeholder="첫 번째 텍스트를 입력하세요..."
                            />
                        </div>

                        {/* Text 2 */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                텍스트 2
                            </label>
                            <textarea
                                value={text2}
                                onChange={(e) => setText2(e.target.value)}
                                className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none font-mono text-sm"
                                placeholder="두 번째 텍스트를 입력하세요..."
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-center space-x-4 mb-6">
                        <button
                            onClick={compareDiff}
                            className="px-8 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg shadow-md transition-colors"
                        >
                            비교하기
                        </button>
                        <button
                            onClick={swapTexts}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                        >
                            ↔ 교환
                        </button>
                        <button
                            onClick={() => {
                                setText1("");
                                setText2("");
                                setDiffResult([]);
                            }}
                            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
                        >
                            초기화
                        </button>
                    </div>

                    {/* Diff Result */}
                    {diffResult.length > 0 && (
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-3">비교 결과</h3>
                            <div className="bg-gray-900 rounded-lg p-4 overflow-auto max-h-96">
                                {diffResult.map((line, index) => (
                                    <div
                                        key={index}
                                        className={`font-mono text-sm py-1 ${
                                            line.type === 'same'
                                                ? 'text-gray-400'
                                                : line.type === 'diff1'
                                                ? 'text-red-400 bg-red-900/20'
                                                : 'text-green-400 bg-green-900/20'
                                        }`}
                                    >
                                        {line.content}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Info Section */}
                <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h3 className="font-semibold text-yellow-900 mb-2">사용 방법</h3>
                    <ul className="text-sm text-yellow-800 space-y-1">
                        <li>• 두 개의 텍스트 박스에 비교할 내용을 입력하세요</li>
                        <li>• <span className="text-red-600">빨간색</span>: 첫 번째 텍스트에만 있는 줄 (삭제된 줄)</li>
                        <li>• <span className="text-green-600">초록색</span>: 두 번째 텍스트에만 있는 줄 (추가된 줄)</li>
                        <li>• <span className="text-gray-600">회색</span>: 동일한 줄</li>
                    </ul>
                </div>
            </main>
        </div>
    );
}
