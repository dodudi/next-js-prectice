"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function TimerPage() {
    const router = useRouter();
    const [mode, setMode] = useState<'timer' | 'stopwatch'>('timer');
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [minutes, setMinutes] = useState(25);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTime(prev => mode === 'timer' ? Math.max(0, prev - 1) : prev + 1);
            }, 1000);
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isRunning, mode]);

    const startTimer = () => {
        setTime(minutes * 60);
        setIsRunning(true);
    };

    const formatTime = (seconds: number) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-gray-50 to-emerald-100">
            <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center space-x-4">
                        <button onClick={() => router.push('/dashboard')} className="text-gray-600 hover:text-gray-900">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </button>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">⏱️ 타이머 & 스톱워치</h1>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="flex justify-center mb-8">
                        <div className="bg-gray-100 p-1 rounded-lg flex">
                            <button onClick={() => { setMode('timer'); setIsRunning(false); setTime(0); }} className={`px-6 py-2 rounded-md ${mode === 'timer' ? 'bg-emerald-600 text-white' : 'text-gray-600'}`}>
                                타이머
                            </button>
                            <button onClick={() => { setMode('stopwatch'); setIsRunning(false); setTime(0); }} className={`px-6 py-2 rounded-md ${mode === 'stopwatch' ? 'bg-emerald-600 text-white' : 'text-gray-600'}`}>
                                스톱워치
                            </button>
                        </div>
                    </div>

                    <div className="text-center mb-8">
                        <div className="text-7xl font-bold text-emerald-600 mb-4 font-mono">
                            {formatTime(time)}
                        </div>
                    </div>

                    {mode === 'timer' && !isRunning && (
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">시간 설정 (분)</label>
                            <input type="number" value={minutes} onChange={(e) => setMinutes(parseInt(e.target.value) || 0)} className="w-full p-3 border border-gray-300 rounded-lg" min="1" />
                        </div>
                    )}

                    <div className="flex justify-center space-x-4">
                        {!isRunning ? (
                            <button onClick={() => mode === 'timer' ? startTimer() : setIsRunning(true)} className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg">
                                시작
                            </button>
                        ) : (
                            <button onClick={() => setIsRunning(false)} className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg">
                                정지
                            </button>
                        )}
                        <button onClick={() => { setTime(0); setIsRunning(false); }} className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg">
                            초기화
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
