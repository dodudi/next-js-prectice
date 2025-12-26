"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UnitConverterPage() {
    const router = useRouter();
    const [category, setCategory] = useState("length");
    const [from, setFrom] = useState("meter");
    const [to, setTo] = useState("kilometer");
    const [value, setValue] = useState("");
    const [result, setResult] = useState("");

    const units = {
        length: ["meter", "kilometer", "centimeter", "millimeter", "mile", "yard", "foot", "inch"],
        weight: ["kilogram", "gram", "milligram", "pound", "ounce", "ton"],
        temperature: ["celsius", "fahrenheit", "kelvin"]
    };

    const handleConvert = async () => {
        if (!value) return;

        try {
            const response = await fetch('/api/unit-converter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ value, from, to, category }),
            });

            const data = await response.json();
            if (response.ok) {
                setResult(data.result.toFixed(4));
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-50 via-gray-50 to-violet-100">
            <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center space-x-4">
                        <button onClick={() => router.push('/dashboard')} className="text-gray-600 hover:text-gray-900">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </button>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">📏 단위 변환기</h1>
                            <p className="text-sm text-gray-500">다양한 단위를 변환합니다</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">카테고리</label>
                        <select value={category} onChange={(e) => { setCategory(e.target.value); setFrom(units[e.target.value as keyof typeof units][0]); setTo(units[e.target.value as keyof typeof units][1]); }} className="w-full p-3 border border-gray-300 rounded-lg">
                            <option value="length">길이</option>
                            <option value="weight">무게</option>
                            <option value="temperature">온도</option>
                        </select>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">입력값</label>
                            <input type="number" value={value} onChange={(e) => setValue(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" placeholder="숫자 입력" />
                            <select value={from} onChange={(e) => setFrom(e.target.value)} className="w-full mt-2 p-3 border border-gray-300 rounded-lg">
                                {units[category as keyof typeof units].map(unit => (
                                    <option key={unit} value={unit}>{unit}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">결과</label>
                            <input type="text" value={result} readOnly className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50" placeholder="결과" />
                            <select value={to} onChange={(e) => setTo(e.target.value)} className="w-full mt-2 p-3 border border-gray-300 rounded-lg">
                                {units[category as keyof typeof units].map(unit => (
                                    <option key={unit} value={unit}>{unit}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button onClick={handleConvert} className="w-full px-8 py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg">
                        변환
                    </button>
                </div>
            </main>
        </div>
    );
}
