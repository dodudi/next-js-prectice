"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Base64Page() {
    const router = useRouter();
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [mode, setMode] = useState<"encode" | "decode">("encode");
    const [error, setError] = useState("");

    const handleConvert = async () => {
        try {
            setError("");
            const response = await fetch('/api/base64', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: input, mode }),
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

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
    };

    const swapInputOutput = () => {
        setInput(output);
        setOutput("");
        setMode(mode === "encode" ? "decode" : "encode");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-blue-100">
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
                                    <span className="mr-2">🔐</span>
                                    Base64 인코더/디코더
                                </h1>
                                <p className="text-sm text-gray-500">텍스트를 Base64로 변환하거나 반대로 변환합니다</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    {/* Mode Selector */}
                    <div className="flex items-center justify-center mb-6">
                        <div className="bg-gray-100 p-1 rounded-lg flex">
                            <button
                                onClick={() => setMode("encode")}
                                className={`px-6 py-2 rounded-md font-medium transition-all ${
                                    mode === "encode"
                                        ? "bg-blue-600 text-white shadow-md"
                                        : "text-gray-600 hover:text-gray-900"
                                }`}
                            >
                                인코딩
                            </button>
                            <button
                                onClick={() => setMode("decode")}
                                className={`px-6 py-2 rounded-md font-medium transition-all ${
                                    mode === "decode"
                                        ? "bg-blue-600 text-white shadow-md"
                                        : "text-gray-600 hover:text-gray-900"
                                }`}
                            >
                                디코딩
                            </button>
                        </div>
                    </div>

                    {/* Input Area */}
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            {mode === "encode" ? "원본 텍스트" : "Base64 문자열"}
                        </label>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
                            placeholder={mode === "encode" ? "변환할 텍스트를 입력하세요..." : "Base64 문자열을 입력하세요..."}
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-center space-x-4 mb-6">
                        <button
                            onClick={handleConvert}
                            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors"
                        >
                            {mode === "encode" ? "인코딩" : "디코딩"}
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
                        {output && (
                            <button
                                onClick={swapInputOutput}
                                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
                            >
                                ↔ 반전
                            </button>
                        )}
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-700 text-sm">{error}</p>
                        </div>
                    )}

                    {/* Output Area */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                {mode === "encode" ? "Base64 결과" : "디코딩된 텍스트"}
                            </label>
                            {output && (
                                <button
                                    onClick={copyToClipboard}
                                    className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
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
                            className="w-full h-48 p-4 border border-gray-300 rounded-lg bg-gray-50 resize-none font-mono text-sm"
                            placeholder="결과가 여기에 표시됩니다..."
                        />
                    </div>
                </div>

                {/* Info Section */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="font-semibold text-blue-900 mb-2">Base64란?</h3>
                    <p className="text-sm text-blue-800">
                        Base64는 바이너리 데이터를 텍스트로 변환하는 인코딩 방식입니다.
                        이메일, URL, HTML 등에서 바이너리 데이터를 안전하게 전송할 때 주로 사용됩니다.
                    </p>
                </div>
            </main>
        </div>
    );
}
