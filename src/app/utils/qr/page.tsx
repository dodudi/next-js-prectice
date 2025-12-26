"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function QrPage() {
    const router = useRouter();
    const [text, setText] = useState("");
    const [qrUrl, setQrUrl] = useState("");

    const generateQR = () => {
        if (text) {
            // Using QR Code API
            setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}`);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-lime-50 via-gray-50 to-lime-100">
            <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center space-x-4">
                        <button onClick={() => router.push('/dashboard')} className="text-gray-600 hover:text-gray-900">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </button>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">📱 QR 코드 생성기</h1>
                            <p className="text-sm text-gray-500">텍스트나 URL을 QR 코드로 변환합니다</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">텍스트 또는 URL</label>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 resize-none"
                            placeholder="https://example.com 또는 원하는 텍스트 입력"
                        />
                    </div>

                    <button onClick={generateQR} className="w-full px-8 py-3 bg-lime-600 hover:bg-lime-700 text-white font-semibold rounded-lg mb-6">
                        QR 코드 생성
                    </button>

                    {qrUrl && (
                        <div className="flex flex-col items-center">
                            <div className="bg-white p-4 rounded-lg border-4 border-lime-200 mb-4">
                                <img src={qrUrl} alt="QR Code" className="w-64 h-64" />
                            </div>
                            <a
                                href={qrUrl}
                                download="qrcode.png"
                                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg"
                            >
                                다운로드
                            </a>
                        </div>
                    )}
                </div>

                <div className="mt-6 bg-lime-50 border border-lime-200 rounded-lg p-6">
                    <h3 className="font-semibold text-lime-900 mb-2">사용 팁</h3>
                    <ul className="text-sm text-lime-800 space-y-1">
                        <li>• URL, 텍스트, 전화번호, 이메일 등을 입력할 수 있습니다</li>
                        <li>• 생성된 QR 코드를 이미지로 다운로드할 수 있습니다</li>
                    </ul>
                </div>
            </main>
        </div>
    );
}
