"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FileSizePage() {
    const router = useRouter();
    const [value, setValue] = useState("");
    const [from, setFrom] = useState("MB");
    const [results, setResults] = useState<Record<string, string>>({});

    const units = ["Bytes", "KB", "MB", "GB", "TB"];

    const convert = () => {
        const num = parseFloat(value);
        if (isNaN(num)) return;

        const multipliers: Record<string, number> = {
            "Bytes": 1,
            "KB": 1024,
            "MB": 1024 * 1024,
            "GB": 1024 * 1024 * 1024,
            "TB": 1024 * 1024 * 1024 * 1024,
        };

        const bytes = num * multipliers[from];

        const converted: Record<string, string> = {};
        units.forEach(unit => {
            converted[unit] = (bytes / multipliers[unit]).toFixed(2);
        });

        setResults(converted);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 via-gray-50 to-fuchsia-100">
            <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center space-x-4">
                        <button onClick={() => router.push('/dashboard')} className="text-gray-600 hover:text-gray-900">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </button>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">💾 파일 크기 변환기</h1>
                            <p className="text-sm text-gray-500">Bytes, KB, MB, GB, TB 변환</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">값</label>
                            <input type="number" value={value} onChange={(e) => setValue(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" placeholder="숫자 입력" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">단위</label>
                            <select value={from} onChange={(e) => setFrom(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg">
                                {units.map(unit => <option key={unit} value={unit}>{unit}</option>)}
                            </select>
                        </div>
                    </div>

                    <button onClick={convert} className="w-full px-8 py-3 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-semibold rounded-lg mb-6">
                        변환
                    </button>

                    {Object.keys(results).length > 0 && (
                        <div className="space-y-3">
                            {units.map(unit => (
                                <div key={unit} className="p-4 bg-fuchsia-50 border border-fuchsia-200 rounded-lg flex justify-between items-center">
                                    <span className="font-semibold text-gray-700">{unit}</span>
                                    <span className="font-mono text-lg text-gray-900">{results[unit]}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
