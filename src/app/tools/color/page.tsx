"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ColorPage() {
    const router = useRouter();
    const [input, setInput] = useState("");
    const [hex, setHex] = useState("");
    const [rgb, setRgb] = useState("");
    const [hsl, setHsl] = useState("");
    const [error, setError] = useState("");

    const handleConvert = async () => {
        try {
            setError("");
            const response = await fetch('/api/color', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ color: input }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || '처리 중 오류가 발생했습니다.');
                setHex("");
                setRgb("");
                setHsl("");
                return;
            }

            setHex(data.hex);
            setRgb(data.rgb);
            setHsl(data.hsl);
        } catch (err) {
            setError(err instanceof Error ? err.message : '처리 중 오류가 발생했습니다.');
            setHex("");
            setRgb("");
            setHsl("");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-gray-50 to-rose-100">
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
                                <span className="mr-2">🎨</span>
                                색상 변환기
                            </h1>
                            <p className="text-sm text-gray-500">HEX, RGB, HSL 색상 코드를 변환합니다</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">색상 코드 입력</label>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 font-mono"
                            placeholder="#FF5733 or rgb(255, 87, 51)"
                        />
                        <p className="text-xs text-gray-500 mt-1">지원 형식: #RRGGBB, rgb(r, g, b)</p>
                    </div>

                    <div className="flex items-center justify-center space-x-4 mb-6">
                        <button onClick={handleConvert} className="px-8 py-3 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg shadow-md transition-colors">
                            변환
                        </button>
                        <button onClick={() => { setInput(""); setHex(""); setRgb(""); setHsl(""); setError(""); }} className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors">
                            초기화
                        </button>
                    </div>

                    {error && (
                        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-700 text-sm">{error}</p>
                        </div>
                    )}

                    {hex && (
                        <div className="space-y-4">
                            {/* Color Preview */}
                            <div className="flex items-center justify-center mb-6">
                                <div
                                    className="w-32 h-32 rounded-2xl shadow-lg border-4 border-white"
                                    style={{ backgroundColor: hex }}
                                />
                            </div>

                            {/* HEX */}
                            <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-xs font-semibold text-gray-600 mb-1">HEX</div>
                                        <code className="font-mono text-lg text-gray-900">{hex}</code>
                                    </div>
                                    <button onClick={() => navigator.clipboard.writeText(hex)} className="text-rose-600 hover:text-rose-800 text-sm font-medium">
                                        복사
                                    </button>
                                </div>
                            </div>

                            {/* RGB */}
                            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-xs font-semibold text-gray-600 mb-1">RGB</div>
                                        <code className="font-mono text-lg text-gray-900">{rgb}</code>
                                    </div>
                                    <button onClick={() => navigator.clipboard.writeText(rgb)} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                        복사
                                    </button>
                                </div>
                            </div>

                            {/* HSL */}
                            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-xs font-semibold text-gray-600 mb-1">HSL</div>
                                        <code className="font-mono text-lg text-gray-900">{hsl}</code>
                                    </div>
                                    <button onClick={() => navigator.clipboard.writeText(hsl)} className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                                        복사
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-6 bg-rose-50 border border-rose-200 rounded-lg p-6">
                    <h3 className="font-semibold text-rose-900 mb-2">색상 형식</h3>
                    <ul className="text-sm text-rose-800 space-y-1">
                        <li>• <strong>HEX</strong>: 웹 개발에서 가장 많이 사용</li>
                        <li>• <strong>RGB</strong>: 빨강, 녹색, 파랑 값 (0-255)</li>
                        <li>• <strong>HSL</strong>: 색조, 채도, 밝기 (디자인 작업에 유용)</li>
                    </ul>
                </div>
            </main>
        </div>
    );
}
