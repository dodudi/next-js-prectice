"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function DashboardPage() {
    const router = useRouter();
    const [quickLinks, setQuickLinks] = useState([
        { id: 1, name: "Gmail", url: "https://gmail.com", icon: "📧" },
        { id: 2, name: "YouTube", url: "https://youtube.com", icon: "▶️" },
        { id: 3, name: "GitHub", url: "https://github.com", icon: "💻" },
    ]);


    const [currentTime, setCurrentTime] = useState(new Date());

    // Update time every second
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-blue-50">
            {/* Top Bar */}
            <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center shadow-lg">
                                <span className="text-xl font-bold text-white">R</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">My Portal</h1>
                                <p className="text-sm text-gray-500">나만의 개인 포털</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => router.push('/blog')}
                                className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                            >
                                블로그
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Time & Date Widget */}
                <div className="mb-8 text-center">
                    <h2 className="text-5xl font-bold text-gray-900 mb-2">
                        {currentTime.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                    </h2>
                    <p className="text-lg text-gray-600">
                        {currentTime.toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            weekday: 'long'
                        })}
                    </p>
                </div>

                {/* Widgets Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Quick Links Widget */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center">
                                <span className="mr-2">🔗</span>
                                빠른 링크
                            </h3>
                            <button className="text-gray-400 hover:text-red-600 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </button>
                        </div>
                        <div className="space-y-2">
                            {quickLinks.map(link => (
                                <a
                                    key={link.id}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center p-3 bg-gray-50 hover:bg-red-50 rounded-lg transition-colors group"
                                >
                                    <span className="text-2xl mr-3">{link.icon}</span>
                                    <span className="text-gray-700 group-hover:text-red-600 font-medium">{link.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Developer Tools Widget */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow md:col-span-2 lg:col-span-3">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center">
                                <span className="mr-2">🛠️</span>
                                개발자 도구
                            </h3>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            <button
                                onClick={() => router.push('/tools/base64')}
                                className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl transition-all group"
                            >
                                <div className="text-3xl mb-2">🔐</div>
                                <div className="font-semibold text-gray-900 mb-1">Base64</div>
                                <div className="text-xs text-gray-600">인코딩/디코딩</div>
                            </button>
                            <button
                                onClick={() => router.push('/tools/json')}
                                className="p-4 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-xl transition-all group"
                            >
                                <div className="text-3xl mb-2">📋</div>
                                <div className="font-semibold text-gray-900 mb-1">JSON Parser</div>
                                <div className="text-xs text-gray-600">포맷팅/검증</div>
                            </button>
                            <button
                                onClick={() => router.push('/tools/url')}
                                className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-xl transition-all group"
                            >
                                <div className="text-3xl mb-2">🔗</div>
                                <div className="font-semibold text-gray-900 mb-1">URL Encoder</div>
                                <div className="text-xs text-gray-600">인코딩/디코딩</div>
                            </button>
                            <button
                                onClick={() => router.push('/tools/hash')}
                                className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 rounded-xl transition-all group"
                            >
                                <div className="text-3xl mb-2">🔒</div>
                                <div className="font-semibold text-gray-900 mb-1">Hash Generator</div>
                                <div className="text-xs text-gray-600">MD5/SHA 해시</div>
                            </button>
                            <button
                                onClick={() => router.push('/tools/timestamp')}
                                className="p-4 bg-gradient-to-br from-pink-50 to-pink-100 hover:from-pink-100 hover:to-pink-200 rounded-xl transition-all group"
                            >
                                <div className="text-3xl mb-2">⏰</div>
                                <div className="font-semibold text-gray-900 mb-1">Timestamp</div>
                                <div className="text-xs text-gray-600">시간 변환</div>
                            </button>
                            <button
                                onClick={() => router.push('/tools/diff')}
                                className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200 rounded-xl transition-all group"
                            >
                                <div className="text-3xl mb-2">📊</div>
                                <div className="font-semibold text-gray-900 mb-1">Text Diff</div>
                                <div className="text-xs text-gray-600">텍스트 비교</div>
                            </button>
                            <button
                                onClick={() => router.push('/tools/jwt')}
                                className="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 hover:from-indigo-100 hover:to-indigo-200 rounded-xl transition-all group"
                            >
                                <div className="text-3xl mb-2">🎫</div>
                                <div className="font-semibold text-gray-900 mb-1">JWT Decoder</div>
                                <div className="text-xs text-gray-600">토큰 디코딩</div>
                            </button>
                            <button
                                onClick={() => router.push('/tools/regex')}
                                className="p-4 bg-gradient-to-br from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 rounded-xl transition-all group"
                            >
                                <div className="text-3xl mb-2">🔍</div>
                                <div className="font-semibold text-gray-900 mb-1">Regex Tester</div>
                                <div className="text-xs text-gray-600">정규표현식</div>
                            </button>
                            <button
                                onClick={() => router.push('/tools/uuid')}
                                className="p-4 bg-gradient-to-br from-teal-50 to-teal-100 hover:from-teal-100 hover:to-teal-200 rounded-xl transition-all group"
                            >
                                <div className="text-3xl mb-2">🆔</div>
                                <div className="font-semibold text-gray-900 mb-1">UUID</div>
                                <div className="text-xs text-gray-600">고유 ID 생성</div>
                            </button>
                            <button
                                onClick={() => router.push('/tools/password')}
                                className="p-4 bg-gradient-to-br from-cyan-50 to-cyan-100 hover:from-cyan-100 hover:to-cyan-200 rounded-xl transition-all group"
                            >
                                <div className="text-3xl mb-2">🔑</div>
                                <div className="font-semibold text-gray-900 mb-1">Password</div>
                                <div className="text-xs text-gray-600">비밀번호 생성</div>
                            </button>
                            <button
                                onClick={() => router.push('/tools/color')}
                                className="p-4 bg-gradient-to-br from-rose-50 to-rose-100 hover:from-rose-100 hover:to-rose-200 rounded-xl transition-all group"
                            >
                                <div className="text-3xl mb-2">🎨</div>
                                <div className="font-semibold text-gray-900 mb-1">Color</div>
                                <div className="text-xs text-gray-600">색상 변환</div>
                            </button>
                            <button
                                onClick={() => router.push('/tools/lorem')}
                                className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200 rounded-xl transition-all group"
                            >
                                <div className="text-3xl mb-2">📝</div>
                                <div className="font-semibold text-gray-900 mb-1">Lorem Ipsum</div>
                                <div className="text-xs text-gray-600">더미 텍스트</div>
                            </button>
                        </div>
                    </div>

                    {/* Lifestyle Utilities Widget */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow md:col-span-2 lg:col-span-3">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center">
                                <span className="mr-2">✨</span>
                                생활 유틸
                            </h3>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            <button
                                onClick={() => router.push('/utils/unit-converter')}
                                className="p-4 bg-gradient-to-br from-violet-50 to-violet-100 hover:from-violet-100 hover:to-violet-200 rounded-xl transition-all group"
                            >
                                <div className="text-3xl mb-2">📏</div>
                                <div className="font-semibold text-gray-900 mb-1">단위 변환</div>
                                <div className="text-xs text-gray-600">길이/무게/온도</div>
                            </button>
                            <button
                                onClick={() => router.push('/utils/text-counter')}
                                className="p-4 bg-gradient-to-br from-sky-50 to-sky-100 hover:from-sky-100 hover:to-sky-200 rounded-xl transition-all group"
                            >
                                <div className="text-3xl mb-2">📝</div>
                                <div className="font-semibold text-gray-900 mb-1">텍스트 분석</div>
                                <div className="text-xs text-gray-600">글자/단어 수</div>
                            </button>
                            <button
                                onClick={() => router.push('/utils/timer')}
                                className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 hover:from-emerald-100 hover:to-emerald-200 rounded-xl transition-all group"
                            >
                                <div className="text-3xl mb-2">⏱️</div>
                                <div className="font-semibold text-gray-900 mb-1">타이머</div>
                                <div className="text-xs text-gray-600">스톱워치/타이머</div>
                            </button>
                            <button
                                onClick={() => router.push('/utils/qr')}
                                className="p-4 bg-gradient-to-br from-lime-50 to-lime-100 hover:from-lime-100 hover:to-lime-200 rounded-xl transition-all group"
                            >
                                <div className="text-3xl mb-2">📱</div>
                                <div className="font-semibold text-gray-900 mb-1">QR 코드</div>
                                <div className="text-xs text-gray-600">QR 생성</div>
                            </button>
                            <button
                                onClick={() => router.push('/utils/filesize')}
                                className="p-4 bg-gradient-to-br from-fuchsia-50 to-fuchsia-100 hover:from-fuchsia-100 hover:to-fuchsia-200 rounded-xl transition-all group"
                            >
                                <div className="text-3xl mb-2">💾</div>
                                <div className="font-semibold text-gray-900 mb-1">파일 크기</div>
                                <div className="text-xs text-gray-600">용량 변환</div>
                            </button>
                            <button
                                onClick={() => router.push('/utils/bmi')}
                                className="p-4 bg-gradient-to-br from-stone-50 to-stone-100 hover:from-stone-100 hover:to-stone-200 rounded-xl transition-all group"
                            >
                                <div className="text-3xl mb-2">⚖️</div>
                                <div className="font-semibold text-gray-900 mb-1">BMI</div>
                                <div className="text-xs text-gray-600">체질량 지수</div>
                            </button>
                            <button
                                onClick={() => router.push('/utils/currency')}
                                className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200 rounded-xl transition-all group"
                            >
                                <div className="text-3xl mb-2">💱</div>
                                <div className="font-semibold text-gray-900 mb-1">환율</div>
                                <div className="text-xs text-gray-600">통화 변환</div>
                            </button>
                        </div>
                    </div>

                    {/* Blog Widget */}
                    <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow text-white">
                        <h3 className="text-lg font-bold mb-4 flex items-center">
                            <span className="mr-2">📰</span>
                            블로그
                        </h3>
                        <p className="text-red-100 mb-4">최근 포스트를 확인하고 새로운 글을 작성하세요</p>
                        <button
                            onClick={() => router.push('/blog')}
                            className="w-full bg-white text-red-600 py-2 rounded-lg font-semibold hover:bg-red-50 transition-colors"
                        >
                            블로그 보기
                        </button>
                    </div>

                    {/* Add New Widget Card */}
                    <div className="bg-white/50 border-2 border-dashed border-gray-300 rounded-2xl p-6 hover:border-red-400 hover:bg-white transition-all cursor-pointer group">
                        <div className="h-full flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 bg-gray-200 group-hover:bg-red-100 rounded-full flex items-center justify-center mb-3 transition-colors">
                                <svg className="w-8 h-8 text-gray-400 group-hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-600 group-hover:text-red-600 mb-1">새 위젯 추가</h3>
                            <p className="text-sm text-gray-400">필요한 기능을 추가하세요</p>
                        </div>
                    </div>

                    {/* Placeholder for future widgets */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center">
                                <span className="mr-2">🌟</span>
                                즐겨찾기
                            </h3>
                        </div>
                        <p className="text-gray-400 text-sm text-center py-8">곧 추가될 기능입니다</p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        {/* About Section */}
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                                    <span className="text-lg font-bold text-white">R</span>
                                </div>
                                <h3 className="text-lg font-bold">My Portal</h3>
                            </div>
                            <p className="text-gray-400 text-sm">
                                개발자와 일반 사용자를 위한 종합 유틸리티 포털입니다.
                                19개의 유용한 도구를 무료로 제공합니다.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-lg font-bold mb-4">빠른 링크</h3>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li>
                                    <a href="#" className="hover:text-red-400 transition-colors">개발자 도구 (12개)</a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-red-400 transition-colors">생활 유틸 (7개)</a>
                                </li>
                                <li>
                                    <a href="/blog" className="hover:text-red-400 transition-colors">블로그</a>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Section */}
                        <div>
                            <h3 className="text-lg font-bold mb-4">연락하기</h3>
                            <div className="space-y-3">
                                <a href="mailto:your-email@example.com" className="flex items-center text-gray-400 hover:text-red-400 transition-colors text-sm">
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                    your-email@example.com
                                </a>
                                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-400 hover:text-red-400 transition-colors text-sm">
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                    </svg>
                                    GitHub
                                </a>
                                <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-400 hover:text-red-400 transition-colors text-sm">
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                    </svg>
                                    Twitter
                                </a>
                                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-400 hover:text-red-400 transition-colors text-sm">
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                    </svg>
                                    LinkedIn
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-gray-800 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <p className="text-gray-400 text-sm mb-4 md:mb-0">
                                &copy; 2024 My Portal. Made with ❤️ using Next.js
                            </p>
                            <div className="flex space-x-6">
                                <a href="#" className="text-gray-400 hover:text-red-400 text-sm transition-colors">
                                    개인정보처리방침
                                </a>
                                <a href="#" className="text-gray-400 hover:text-red-400 text-sm transition-colors">
                                    이용약관
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
