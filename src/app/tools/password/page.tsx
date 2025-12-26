"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PasswordPage() {
    const router = useRouter();
    const [length, setLength] = useState(16);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [password, setPassword] = useState("");

    const handleGenerate = async () => {
        try {
            const response = await fetch('/api/password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ length, includeUppercase, includeLowercase, includeNumbers, includeSymbols }),
            });

            const data = await response.json();

            if (response.ok) {
                setPassword(data.password);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-gray-50 to-cyan-100">
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
                                <span className="mr-2">🔑</span>
                                비밀번호 생성기
                            </h1>
                            <p className="text-sm text-gray-500">안전한 랜덤 비밀번호를 생성합니다</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="space-y-6 mb-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">비밀번호 길이: {length}</label>
                            <input
                                type="range"
                                value={length}
                                onChange={(e) => setLength(parseInt(e.target.value))}
                                min="8"
                                max="64"
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={includeUppercase}
                                    onChange={(e) => setIncludeUppercase(e.target.checked)}
                                    className="w-5 h-5 text-cyan-600 rounded focus:ring-cyan-500 mr-3"
                                />
                                <span className="text-gray-700">대문자 포함 (A-Z)</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={includeLowercase}
                                    onChange={(e) => setIncludeLowercase(e.target.checked)}
                                    className="w-5 h-5 text-cyan-600 rounded focus:ring-cyan-500 mr-3"
                                />
                                <span className="text-gray-700">소문자 포함 (a-z)</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={includeNumbers}
                                    onChange={(e) => setIncludeNumbers(e.target.checked)}
                                    className="w-5 h-5 text-cyan-600 rounded focus:ring-cyan-500 mr-3"
                                />
                                <span className="text-gray-700">숫자 포함 (0-9)</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={includeSymbols}
                                    onChange={(e) => setIncludeSymbols(e.target.checked)}
                                    className="w-5 h-5 text-cyan-600 rounded focus:ring-cyan-500 mr-3"
                                />
                                <span className="text-gray-700">특수문자 포함 (!@#$...)</span>
                            </label>
                        </div>
                    </div>

                    <div className="flex items-center justify-center mb-6">
                        <button onClick={handleGenerate} className="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg shadow-md transition-colors">
                            생성
                        </button>
                    </div>

                    {password && (
                        <div className="p-4 bg-cyan-50 border border-cyan-200 rounded-lg">
                            <div className="flex items-center justify-between">
                                <code className="font-mono text-lg text-gray-900 break-all">{password}</code>
                                <button
                                    onClick={() => navigator.clipboard.writeText(password)}
                                    className="ml-4 text-cyan-600 hover:text-cyan-800 text-sm font-medium whitespace-nowrap"
                                >
                                    복사
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-6 bg-cyan-50 border border-cyan-200 rounded-lg p-6">
                    <h3 className="font-semibold text-cyan-900 mb-2">안전한 비밀번호 팁</h3>
                    <ul className="text-sm text-cyan-800 space-y-1">
                        <li>• 최소 12자 이상 사용하세요</li>
                        <li>• 대소문자, 숫자, 특수문자를 조합하세요</li>
                        <li>• 각 서비스마다 다른 비밀번호를 사용하세요</li>
                    </ul>
                </div>
            </main>
        </div>
    );
}
