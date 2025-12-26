"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegexPage() {
    const router = useRouter();
    const [pattern, setPattern] = useState("");
    const [text, setText] = useState("");
    const [flags, setFlags] = useState("g");
    const [matches, setMatches] = useState<any[]>([]);
    const [count, setCount] = useState(0);
    const [error, setError] = useState("");

    const handleTest = async () => {
        try {
            setError("");
            const response = await fetch('/api/regex', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pattern, text, flags }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || '처리 중 오류가 발생했습니다.');
                setMatches([]);
                setCount(0);
                return;
            }

            setMatches(data.matches);
            setCount(data.count);
        } catch (err) {
            setError(err instanceof Error ? err.message : '처리 중 오류가 발생했습니다.');
            setMatches([]);
            setCount(0);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-gray-50 to-red-100">
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
                                <span className="mr-2">🔍</span>
                                정규표현식 테스터
                            </h1>
                            <p className="text-sm text-gray-500">정규표현식을 테스트하고 매칭 결과를 확인합니다</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="space-y-4 mb-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">정규표현식 패턴</label>
                            <input
                                type="text"
                                value={pattern}
                                onChange={(e) => setPattern(e.target.value)}
                                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 font-mono"
                                placeholder="[a-z0-9]+"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">플래그</label>
                            <div className="flex items-center space-x-4">
                                <label className="flex items-center">
                                    <input type="checkbox" checked={flags.includes('g')} onChange={(e) => setFlags(e.target.checked ? flags + 'g' : flags.replace('g', ''))} className="mr-2" />
                                    <span className="text-sm">g (global)</span>
                                </label>
                                <label className="flex items-center">
                                    <input type="checkbox" checked={flags.includes('i')} onChange={(e) => setFlags(e.target.checked ? flags + 'i' : flags.replace('i', ''))} className="mr-2" />
                                    <span className="text-sm">i (case-insensitive)</span>
                                </label>
                                <label className="flex items-center">
                                    <input type="checkbox" checked={flags.includes('m')} onChange={(e) => setFlags(e.target.checked ? flags + 'm' : flags.replace('m', ''))} className="mr-2" />
                                    <span className="text-sm">m (multiline)</span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">테스트 텍스트</label>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 resize-none font-mono text-sm"
                                placeholder="테스트할 텍스트를 입력하세요..."
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-center space-x-4 mb-6">
                        <button onClick={handleTest} className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-colors">
                            테스트
                        </button>
                        <button onClick={() => { setPattern(""); setText(""); setMatches([]); setCount(0); setError(""); }} className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors">
                            초기화
                        </button>
                    </div>

                    {error && (
                        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-700 text-sm font-mono">{error}</p>
                        </div>
                    )}

                    {count > 0 && (
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                            <h3 className="font-semibold text-green-900 mb-3">{count}개의 매칭 발견</h3>
                            <div className="space-y-2">
                                {matches.map((match, idx) => (
                                    <div key={idx} className="p-3 bg-white rounded border border-green-200">
                                        <div className="font-mono text-sm"><strong>매칭:</strong> {match.match}</div>
                                        <div className="text-xs text-gray-600"><strong>위치:</strong> {match.index}</div>
                                        {match.groups.length > 0 && (
                                            <div className="text-xs text-gray-600"><strong>그룹:</strong> [{match.groups.join(', ')}]</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
