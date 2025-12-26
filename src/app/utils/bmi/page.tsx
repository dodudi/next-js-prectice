"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BmiPage() {
    const router = useRouter();
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [unit, setUnit] = useState("metric");
    const [result, setResult] = useState<any>(null);

    const calculate = async () => {
        try {
            const response = await fetch('/api/bmi', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ height, weight, unit }),
            });

            const data = await response.json();
            if (response.ok) {
                setResult(data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-stone-50 via-gray-50 to-stone-100">
            <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center space-x-4">
                        <button onClick={() => router.push('/dashboard')} className="text-gray-600 hover:text-gray-900">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </button>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">⚖️ BMI 계산기</h1>
                            <p className="text-sm text-gray-500">체질량 지수를 계산합니다</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="mb-6">
                        <div className="flex justify-center mb-4">
                            <div className="bg-gray-100 p-1 rounded-lg flex">
                                <button onClick={() => setUnit('metric')} className={`px-6 py-2 rounded-md ${unit === 'metric' ? 'bg-stone-600 text-white' : 'text-gray-600'}`}>
                                    미터법 (cm/kg)
                                </button>
                                <button onClick={() => setUnit('imperial')} className={`px-6 py-2 rounded-md ${unit === 'imperial' ? 'bg-stone-600 text-white' : 'text-gray-600'}`}>
                                    야드파운드법 (in/lb)
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    키 ({unit === 'metric' ? 'cm' : 'inch'})
                                </label>
                                <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" placeholder={unit === 'metric' ? '170' : '67'} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    몸무게 ({unit === 'metric' ? 'kg' : 'lb'})
                                </label>
                                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" placeholder={unit === 'metric' ? '70' : '154'} />
                            </div>
                        </div>
                    </div>

                    <button onClick={calculate} className="w-full px-8 py-3 bg-stone-600 hover:bg-stone-700 text-white font-semibold rounded-lg mb-6">
                        계산하기
                    </button>

                    {result && (
                        <div className="p-6 bg-stone-50 border border-stone-200 rounded-lg text-center">
                            <div className="text-5xl font-bold text-stone-600 mb-2">{result.bmi}</div>
                            <div className="text-xl font-semibold text-gray-900 mb-1">{result.category}</div>
                            <div className="text-sm text-gray-600">{result.description}</div>
                        </div>
                    )}
                </div>

                <div className="mt-6 bg-stone-50 border border-stone-200 rounded-lg p-6">
                    <h3 className="font-semibold text-stone-900 mb-2">BMI 기준 (WHO)</h3>
                    <ul className="text-sm text-stone-800 space-y-1">
                        <li>• 저체중: 18.5 미만</li>
                        <li>• 정상: 18.5 ~ 22.9</li>
                        <li>• 과체중: 23.0 ~ 24.9</li>
                        <li>• 비만: 25.0 이상</li>
                    </ul>
                </div>
            </main>
        </div>
    );
}
