"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CurrencyPage() {
    const router = useRouter();
    const [amount, setAmount] = useState("");
    const [from, setFrom] = useState("USD");
    const [to, setTo] = useState("KRW");
    const [result, setResult] = useState("");

    // 고정 환율 (예시 - 실제로는 API 사용 권장)
    const rates: Record<string, Record<string, number>> = {
        USD: { KRW: 1300, EUR: 0.92, JPY: 150, CNY: 7.25 },
        KRW: { USD: 0.00077, EUR: 0.00071, JPY: 0.115, CNY: 0.0056 },
        EUR: { USD: 1.09, KRW: 1413, JPY: 163, CNY: 7.89 },
        JPY: { USD: 0.0067, KRW: 8.7, EUR: 0.0061, CNY: 0.048 },
        CNY: { USD: 0.138, KRW: 179, EUR: 0.127, JPY: 20.7 },
    };

    const convert = () => {
        const num = parseFloat(amount);
        if (isNaN(num)) return;

        if (from === to) {
            setResult(num.toFixed(2));
        } else {
            const rate = rates[from]?.[to] || 1;
            setResult((num * rate).toFixed(2));
        }
    };

    const currencies = ["USD", "KRW", "EUR", "JPY", "CNY"];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
            <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center space-x-4">
                        <button onClick={() => router.push('/dashboard')} className="text-gray-600 hover:text-gray-900">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </button>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">💱 환율 계산기</h1>
                            <p className="text-sm text-gray-500">통화를 변환합니다 (고정 환율)</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="space-y-4 mb-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">금액</label>
                            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" placeholder="100" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">From</label>
                                <select value={from} onChange={(e) => setFrom(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg">
                                    {currencies.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">To</label>
                                <select value={to} onChange={(e) => setTo(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg">
                                    {currencies.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    <button onClick={convert} className="w-full px-8 py-3 bg-slate-600 hover:bg-slate-700 text-white font-semibold rounded-lg mb-6">
                        변환
                    </button>

                    {result && (
                        <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg text-center">
                            <div className="text-sm text-gray-600 mb-2">{amount} {from} =</div>
                            <div className="text-4xl font-bold text-slate-600">{result} {to}</div>
                        </div>
                    )}
                </div>

                <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-6">
                    <h3 className="font-semibold text-amber-900 mb-2">⚠️ 주의</h3>
                    <p className="text-sm text-amber-800">
                        이 계산기는 고정 환율을 사용합니다. 실제 거래 시 실시간 환율을 확인하세요.
                    </p>
                </div>
            </main>
        </div>
    );
}
