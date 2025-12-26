"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function JwtPage() {
    const router = useRouter();
    const [token, setToken] = useState("");
    const [header, setHeader] = useState("");
    const [payload, setPayload] = useState("");
    const [signature, setSignature] = useState("");
    const [error, setError] = useState("");

    const handleDecode = async () => {
        try {
            setError("");
            const response = await fetch('/api/jwt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || '처리 중 오류가 발생했습니다.');
                setHeader("");
                setPayload("");
                setSignature("");
                return;
            }

            setHeader(JSON.stringify(data.header, null, 2));
            setPayload(JSON.stringify(data.payload, null, 2));
            setSignature(data.signature);
        } catch (err) {
            setError(err instanceof Error ? err.message : '처리 중 오류가 발생했습니다.');
            setHeader("");
            setPayload("");
            setSignature("");
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-gray-50 to-indigo-100">
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
                                    <span className="mr-2">🎫</span>
                                    JWT 디코더
                                </h1>
                                <p className="text-sm text-gray-500">JWT 토큰을 디코딩합니다 (검증 없음)</p>
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
                            JWT 토큰
                        </label>
                        <textarea
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none font-mono text-sm"
                            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-center space-x-4 mb-6">
                        <button
                            onClick={handleDecode}
                            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-colors"
                        >
                            디코딩
                        </button>
                        <button
                            onClick={() => {
                                setToken("");
                                setHeader("");
                                setPayload("");
                                setSignature("");
                                setError("");
                            }}
                            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
                        >
                            초기화
                        </button>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-700 text-sm">{error}</p>
                        </div>
                    )}

                    {/* Results */}
                    {(header || payload) && (
                        <div className="space-y-4">
                            {/* Header */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Header
                                    </label>
                                    {header && (
                                        <button
                                            onClick={() => copyToClipboard(header)}
                                            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                                        >
                                            복사
                                        </button>
                                    )}
                                </div>
                                <textarea
                                    value={header}
                                    readOnly
                                    className="w-full h-32 p-4 border border-gray-300 rounded-lg bg-gray-50 resize-none font-mono text-sm"
                                />
                            </div>

                            {/* Payload */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Payload
                                    </label>
                                    {payload && (
                                        <button
                                            onClick={() => copyToClipboard(payload)}
                                            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                                        >
                                            복사
                                        </button>
                                    )}
                                </div>
                                <textarea
                                    value={payload}
                                    readOnly
                                    className="w-full h-48 p-4 border border-gray-300 rounded-lg bg-gray-50 resize-none font-mono text-sm"
                                />
                            </div>

                            {/* Signature */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Signature (Encoded)
                                    </label>
                                    {signature && (
                                        <button
                                            onClick={() => copyToClipboard(signature)}
                                            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                                        >
                                            복사
                                        </button>
                                    )}
                                </div>
                                <input
                                    type="text"
                                    value={signature}
                                    readOnly
                                    className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Info Section */}
                <div className="mt-6 bg-indigo-50 border border-indigo-200 rounded-lg p-6">
                    <h3 className="font-semibold text-indigo-900 mb-2">주의사항</h3>
                    <p className="text-sm text-indigo-800">
                        이 도구는 JWT 토큰을 디코딩만 합니다. 서명 검증은 하지 않으므로
                        프로덕션 환경에서는 반드시 서버 측에서 토큰을 검증하세요.
                    </p>
                </div>
            </main>
        </div>
    );
}
