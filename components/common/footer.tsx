"use client";

import Link from "next/link";
import { FaInstagram, FaLinkedinIn, FaFacebookF, FaYoutube } from 'react-icons/fa';


const Footer: React.FC = () => {
    return (
        <footer className="bg-gradient-to-br from-zinc-800 via-slate-950 to-black text-white">
            <div className="border-t border-zinc-800 px-6 py-16 md:py-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
                        {/* Logo and Social Media */}
                        <div className="lg:col-span-1">
                            <div className="flex flex-col justify-left gap-3 mb-6">
                                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-zinc-900" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400 mt-2">AI Powered Video</p>
                                    <p className="text-sm text-gray-400">Background Changer</p>
                                </div>
                            </div>

                            {/* Social Media Icons */}
                            <div className="flex gap-4 mb-8">
                                <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-gradient-to-tr hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center group">
                                    <FaInstagram className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-[#0077b5] transition-all duration-300 flex items-center justify-center group">
                                    <FaLinkedinIn className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-[#1877f2] transition-all duration-300 flex items-center justify-center group">
                                    <FaFacebookF className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-[#ff0000] transition-all duration-300 flex items-center justify-center group">
                                    <FaYoutube className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                                </a>
                            </div>
                            {/* Language Selector */}
                            <div className="flex items-center gap-2 text-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20H7m6-4h6m0 5H9" />
                                </svg>
                                <span className="text-gray-400">English</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                            </div>
                        </div>

                        {/* Platforms */}
                        <div>
                            <h3 className="text-gray-400 mb-4 text-sm tracking-tight">Platforms</h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link href="#" className="text-white text-medium">
                                        iOS
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-white text-medium">
                                        Android
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* AI Products */}
                        <div>
                            <h3 className="text-gray-400 mb-4 text-sm tracking-tight">AI Products</h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link href="#" className="text-white text-sm">
                                        Background remover
                                    </Link>
                                    <p className="text-sm text-gray-400">Removes background from a video</p>
                                </li>
                                <li>
                                    <Link href="#" className="text-white text-sm">
                                        Change background
                                    </Link>
                                    <p className="text-sm text-gray-400">Replaces image background scene</p>
                                </li>
                                <li>
                                    <Link href="#" className="text-white text-sm">
                                        Green screen
                                    </Link>
                                    <p className="text-sm text-gray-400">Green background replacement</p>
                                </li>
                                <li>
                                    <Link href="#" className="text-white text-sm">
                                        Blur background
                                    </Link>
                                    <p className="text-sm text-gray-400">Softens background for focus</p>
                                </li>
                                <li>
                                    <Link href="#" className="text-white text-sm">
                                        B&W background
                                    </Link>
                                    <p className="text-sm text-gray-400">Converts background to black-white</p>
                                </li>
                            </ul>
                        </div>

                        {/* Discover */}
                        <div>
                            <h3 className="text-gray-400 mb-4 text-sm tracking-tight">Discover</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="#" className="text-white text-sm">
                                        Pricing
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-white text-sm">
                                        Community
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-white text-sm">
                                        Support
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-white text-sm">
                                        FAQs
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-white text-sm">
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-white text-sm">
                                        Blogs
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Help */}
                        <div>
                            <h3 className=" text-gray-400 mb-6 text-sm tracking-tight">Help</h3>
                            <ul className="space-y-2">
                                <li>
                                    <p className="text-gray-400 text-xs mb-1">For product support</p>
                                    <p className="text-white text-sm mb-6">Support center</p>
                                </li>
                                <li>
                                    <p className="text-gray-400 text-xs mb-1">For collaboration</p>
                                    <a href="mailto:collaborations@codeknitters.co" className="text-white hover:text-cyan-300 text-sm transition-colors">
                                        collaborations@codeknitters.co
                                    </a>
                                </li>
                                <li>
                                    <p className="text-gray-400 text-xs mb-1 mt-6">For inquiries</p>
                                    <a href="mailto:inquiries@codeknitters.co" className="text-white hover:text-cyan-300 text-sm transition-colors">
                                        inquiries@codeknitters.co
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section - Branding */}
            <div className="px-6 py-16">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12">
                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight text-center lg:text-left">
                            Video Background Changer
                        </h1>
                    </div>

                    <div className="h-px bg-gray-800 mb-8" />

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <p className="text-xs text-white">
                                © 2026 Video Background Changer. All rights reserved.{" "}
                                <Link href="#" className="text-white text-xs">
                                    Manage Cookie Preferences
                                </Link>
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-white flex items-center gap-1">
                                Made with{" "}
                                <svg className="w-3 h-3 text-white fill-current" viewBox="0 0 24 24">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                </svg>
                                {" "}by{" "}
                                <Link href="#" className="text-white text-xs hover:text-gray-300 transition-colors">
                                    Code Knitters AI
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
