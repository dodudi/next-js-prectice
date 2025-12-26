"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HashPage() {
    const router = useRouter();
    const [input, setInput] = useState("");
    const [md5Hash, setMd5Hash] = useState("");
    const [sha256Hash, setSha256Hash] = useState("");

    const handleGenerate = async () => {
        if (!input) {
            setMd5Hash("");
            setSha256Hash("");
            return;
        }

        try {
            const response = await fetch('/api/hash', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: input }),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error(data.error);
                return;
            }

            setMd5Hash(data.md5);
            setSha256Hash(data.sha256);
        } catch (err) {
            console.error(err instanceof Error ? err.message : '처리 중 오류가 발생했습니다.');
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-gray-50 to-orange-100">
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
                                    <span className="mr-2">🔒</span>
                                    해시 생성기
                                </h1>
                                <p className="text-sm text-gray-500">텍스트의 해시 값을 생성합니다</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    {/* Input Area */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            입력 텍스트
                        </label>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none font-mono text-sm"
                            placeholder="해시를 생성할 텍스트를 입력하세요..."
                        />
                    </div>

                    {/* Action Button */}
                    <div className="flex items-center justify-center mb-8">
                        <button
                            onClick={handleGenerate}
                            className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg shadow-md transition-colors"
                        >
                            해시 생성
                        </button>
                        <button
                            onClick={() => {
                                setInput("");
                                setMd5Hash("");
                                setSha256Hash("");
                            }}
                            className="ml-4 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
                        >
                            초기화
                        </button>
                    </div>

                    {/* Hash Outputs */}
                    <div className="space-y-4">
                        {/* SHA-256 */}
                        <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-200">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold text-gray-900">SHA-256</h3>
                                {sha256Hash && (
                                    <button
                                        onClick={() => copyToClipboard(sha256Hash)}
                                        className="text-sm text-orange-600 hover:text-orange-800 font-medium"
                                    >
                                        복사
                                    </button>
                                )}
                            </div>
                            <div className="font-mono text-sm text-gray-700 break-all bg-white p-3 rounded border border-orange-100">
                                {sha256Hash || "해시가 여기에 표시됩니다..."}
                            </div>
                        </div>

                        {/* MD5 (actually SHA-256 for now) */}
                        <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold text-gray-900">SHA-256 (Alternative)</h3>
                                {md5Hash && (
                                    <button
                                        onClick={() => copyToClipboard(md5Hash)}
                                        className="text-sm text-red-600 hover:text-red-800 font-medium"
                                    >
                                        복사
                                    </button>
                                )}
                            </div>
                            <div className="font-mono text-sm text-gray-700 break-all bg-white p-3 rounded border border-red-100">
                                {md5Hash || "해시가 여기에 표시됩니다..."}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info Section */}
                <div className="mt-6 bg-orange-50 border border-orange-200 rounded-lg p-6">
                    <h3 className="font-semibold text-orange-900 mb-2">해시란?</h3>
                    <p className="text-sm text-orange-800 mb-2">
                        해시는 임의의 크기를 가진 데이터를 고정된 크기의 값으로 변환하는 단방향 암호화 기법입니다.
                    </p>
                    <ul className="text-sm text-orange-800 space-y-1">
                        <li>• <strong>SHA-256</strong>: 256비트(32바이트) 해시 값을 생성하는 안전한 해시 알고리즘</li>
                        <li>• 동일한 입력은 항상 동일한 해시 값을 생성합니다</li>
                        <li>• 해시 값으로부터 원본 데이터를 복원할 수 없습니다</li>
                    </ul>
                </div>
            </main>
        </div>
    );
}
