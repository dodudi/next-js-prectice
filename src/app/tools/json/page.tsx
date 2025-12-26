"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function JsonPage() {
    const router = useRouter();
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");
    const [indentSize, setIndentSize] = useState(2);

    const handleAction = async (action: 'format' | 'minify' | 'validate') => {
        try {
            setError("");
            const response = await fetch('/api/json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: input, action, indentSize }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || '처리 중 오류가 발생했습니다.');
                setOutput("");
                return;
            }

            setOutput(data.result);
        } catch (err) {
            setError(err instanceof Error ? err.message : '처리 중 오류가 발생했습니다.');
            setOutput("");
        }
    };

    const handleFormat = () => handleAction('format');
    const handleMinify = () => handleAction('minify');
    const handleValidate = () => handleAction('validate');

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-gray-50 to-green-100">
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
                                    <span className="mr-2">📋</span>
                                    JSON 포맷터 & 검증기
                                </h1>
                                <p className="text-sm text-gray-500">JSON 데이터를 포맷팅하고 검증합니다</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    {/* Input Area */}
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            JSON 입력
                        </label>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none font-mono text-sm"
                            placeholder='{"name": "John", "age": 30}'
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={handleFormat}
                                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-colors"
                            >
                                포맷팅
                            </button>
                            <button
                                onClick={handleMinify}
                                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors"
                            >
                                압축
                            </button>
                            <button
                                onClick={handleValidate}
                                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition-colors"
                            >
                                검증
                            </button>
                            <button
                                onClick={() => {
                                    setInput("");
                                    setOutput("");
                                    setError("");
                                }}
                                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
                            >
                                초기화
                            </button>
                        </div>
                        <div className="flex items-center space-x-2">
                            <label className="text-sm font-medium text-gray-700">들여쓰기:</label>
                            <select
                                value={indentSize}
                                onChange={(e) => setIndentSize(Number(e.target.value))}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                            >
                                <option value={2}>2칸</option>
                                <option value={4}>4칸</option>
                                <option value={8}>8칸</option>
                            </select>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-700 text-sm font-mono">{error}</p>
                        </div>
                    )}

                    {/* Output Area */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                결과
                            </label>
                            {output && (
                                <button
                                    onClick={copyToClipboard}
                                    className="text-sm text-green-600 hover:text-green-800 font-medium flex items-center"
                                >
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    복사
                                </button>
                            )}
                        </div>
                        <textarea
                            value={output}
                            readOnly
                            className="w-full h-64 p-4 border border-gray-300 rounded-lg bg-gray-50 resize-none font-mono text-sm"
                            placeholder="결과가 여기에 표시됩니다..."
                        />
                    </div>
                </div>

                {/* Info Section */}
                <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-6">
                    <h3 className="font-semibold text-green-900 mb-2">사용 방법</h3>
                    <ul className="text-sm text-green-800 space-y-1">
                        <li>• <strong>포맷팅</strong>: JSON을 읽기 쉽게 들여쓰기하여 정리합니다</li>
                        <li>• <strong>압축</strong>: JSON을 한 줄로 압축하여 용량을 줄입니다</li>
                        <li>• <strong>검증</strong>: JSON 형식이 올바른지 확인합니다</li>
                    </ul>
                </div>
            </main>
        </div>
    );
}
