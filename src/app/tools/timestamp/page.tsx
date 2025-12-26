"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function TimestampPage() {
    const router = useRouter();
    const [currentTimestamp, setCurrentTimestamp] = useState(0);
    const [inputTimestamp, setInputTimestamp] = useState("");
    const [inputDate, setInputDate] = useState("");
    const [convertedDate, setConvertedDate] = useState("");
    const [convertedTimestamp, setConvertedTimestamp] = useState("");

    useEffect(() => {
        const updateTimestamp = () => {
            setCurrentTimestamp(Math.floor(Date.now() / 1000));
        };
        updateTimestamp();
        const interval = setInterval(updateTimestamp, 1000);
        return () => clearInterval(interval);
    }, []);

    const timestampToDate = async () => {
        try {
            const response = await fetch('/api/timestamp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ value: inputTimestamp, mode: 'toDate' }),
            });

            const data = await response.json();

            if (!response.ok) {
                setConvertedDate(data.error || '처리 중 오류가 발생했습니다.');
                return;
            }

            setConvertedDate(data.result);
        } catch (err) {
            setConvertedDate(err instanceof Error ? err.message : '변환 오류');
        }
    };

    const dateToTimestamp = async () => {
        try {
            const response = await fetch('/api/timestamp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ value: inputDate, mode: 'toTimestamp' }),
            });

            const data = await response.json();

            if (!response.ok) {
                setConvertedTimestamp(data.error || '처리 중 오류가 발생했습니다.');
                return;
            }

            setConvertedTimestamp(data.result);
        } catch (err) {
            setConvertedTimestamp(err instanceof Error ? err.message : '변환 오류');
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-gray-50 to-pink-100">
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
                                    <span className="mr-2">⏰</span>
                                    타임스탬프 변환기
                                </h1>
                                <p className="text-sm text-gray-500">Unix 타임스탬프와 날짜를 변환합니다</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Current Timestamp */}
                <div className="bg-gradient-to-br from-pink-600 to-rose-600 rounded-2xl shadow-lg p-8 mb-6 text-white">
                    <h2 className="text-lg font-semibold mb-4 text-center">현재 Unix 타임스탬프</h2>
                    <div className="text-center">
                        <div className="text-4xl font-bold mb-2 font-mono">{currentTimestamp}</div>
                        <div className="text-pink-100">
                            {new Date(currentTimestamp * 1000).toLocaleString('ko-KR')}
                        </div>
                        <button
                            onClick={() => copyToClipboard(currentTimestamp.toString())}
                            className="mt-4 px-6 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-colors"
                        >
                            복사
                        </button>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Timestamp to Date */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">타임스탬프 → 날짜</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Unix 타임스탬프
                                </label>
                                <input
                                    type="text"
                                    value={inputTimestamp}
                                    onChange={(e) => setInputTimestamp(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent font-mono"
                                    placeholder="1672531200"
                                />
                            </div>
                            <button
                                onClick={timestampToDate}
                                className="w-full px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg transition-colors"
                            >
                                변환
                            </button>
                            {convertedDate && (
                                <div className="p-4 bg-pink-50 border border-pink-200 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-900">{convertedDate}</span>
                                        <button
                                            onClick={() => copyToClipboard(convertedDate)}
                                            className="text-pink-600 hover:text-pink-800 text-sm"
                                        >
                                            복사
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Date to Timestamp */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">날짜 → 타임스탬프</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    날짜/시간
                                </label>
                                <input
                                    type="datetime-local"
                                    value={inputDate}
                                    onChange={(e) => setInputDate(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                />
                            </div>
                            <button
                                onClick={dateToTimestamp}
                                className="w-full px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg transition-colors"
                            >
                                변환
                            </button>
                            {convertedTimestamp && (
                                <div className="p-4 bg-pink-50 border border-pink-200 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-mono text-gray-900">{convertedTimestamp}</span>
                                        <button
                                            onClick={() => copyToClipboard(convertedTimestamp)}
                                            className="text-pink-600 hover:text-pink-800 text-sm"
                                        >
                                            복사
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Info Section */}
                <div className="mt-6 bg-pink-50 border border-pink-200 rounded-lg p-6">
                    <h3 className="font-semibold text-pink-900 mb-2">Unix 타임스탬프란?</h3>
                    <p className="text-sm text-pink-800">
                        Unix 타임스탬프는 1970년 1월 1일 00:00:00 UTC부터 경과한 초(second)를 나타냅니다.
                        시스템 간 날짜/시간 데이터를 교환할 때 표준으로 사용됩니다.
                    </p>
                </div>
            </main>
        </div>
    );
}
