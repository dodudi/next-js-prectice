"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UuidPage() {
    const router = useRouter();
    const [count, setCount] = useState(1);
    const [uuids, setUuids] = useState<string[]>([]);

    const handleGenerate = async () => {
        try {
            const response = await fetch('/api/uuid', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ count }),
            });

            const data = await response.json();

            if (response.ok) {
                setUuids(data.uuids);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const copyAll = () => {
        navigator.clipboard.writeText(uuids.join('\n'));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 via-gray-50 to-teal-100">
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
                                <span className="mr-2">🆔</span>
                                UUID 생성기
                            </h1>
                            <p className="text-sm text-gray-500">고유 ID를 생성합니다 (UUID v4)</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">생성 개수</label>
                        <input
                            type="number"
                            value={count}
                            onChange={(e) => setCount(Math.min(Math.max(1, parseInt(e.target.value) || 1), 100))}
                            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                            min="1"
                            max="100"
                        />
                        <p className="text-xs text-gray-500 mt-1">최대 100개까지 생성 가능합니다</p>
                    </div>

                    <div className="flex items-center justify-center space-x-4 mb-6">
                        <button onClick={handleGenerate} className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg shadow-md transition-colors">
                            생성
                        </button>
                        {uuids.length > 0 && (
                            <button onClick={copyAll} className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors">
                                전체 복사
                            </button>
                        )}
                    </div>

                    {uuids.length > 0 && (
                        <div className="space-y-2">
                            {uuids.map((uuid, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 bg-teal-50 border border-teal-200 rounded-lg">
                                    <code className="font-mono text-sm text-gray-900">{uuid}</code>
                                    <button
                                        onClick={() => navigator.clipboard.writeText(uuid)}
                                        className="text-teal-600 hover:text-teal-800 text-sm font-medium"
                                    >
                                        복사
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="mt-6 bg-teal-50 border border-teal-200 rounded-lg p-6">
                    <h3 className="font-semibold text-teal-900 mb-2">UUID란?</h3>
                    <p className="text-sm text-teal-800">
                        UUID (Universally Unique Identifier)는 고유성이 보장되는 128비트 식별자입니다.
                        데이터베이스 키, 세션 ID 등에 활용됩니다.
                    </p>
                </div>
            </main>
        </div>
    );
}
