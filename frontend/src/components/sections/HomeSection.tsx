"use client";

import { getAboutData } from "@/lib/data";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiArrowRight, FiCode, FiClock, FiEdit3, FiAward, FiMessageSquare, FiFileText } from "react-icons/fi";
import GreetingFlipper from "../GreetingFlipper";

export default function HomeSection() {
    const about = getAboutData();
    const [time, setTime] = useState<string>("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const options: Intl.DateTimeFormatOptions = {
                timeZone: "Asia/Kolkata",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
            };
            setTime(now.toLocaleTimeString("en-US", options));
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="home" className="min-h-[90vh] flex flex-col justify-center pt-10 pb-12 relative">
            {/* Hero Section */}
            <div className="flex flex-col-reverse md:flex-row items-start gap-10 md:gap-20">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 space-y-6 text-center md:text-left w-full pt-2" 
                >
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight flex flex-col gap-2 md:gap-4 justify-center md:justify-start">
                        <span className="flex items-baseline justify-center md:justify-start text-muted-foreground text-xl md:text-2xl font-mono lowercase">
                            <GreetingFlipper /> i am <span className="text-primary font-bold ml-2">tejas ghoti</span>
                        </span>
                        <span className="block text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
                            Architecting Autonomous AI &amp; Resilient Backend Systems.
                        </span>
                    </h1>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl font-mono">
                        i am a <span className="font-bold text-foreground">B.E. Information Technology</span> student (Honors in Cybersecurity) at PICT Pune. i specialize in engineering autonomous ai workflows, deploying large language models, and architecting resilient backend and decentralized systems.
                    </p>

                    {/* Symmetric CTA Grid */}
                    <div className="grid grid-cols-2 gap-4 pt-4 w-full max-w-md md:max-w-lg">
                        <Link
                            href="#projects"
                            className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-4 rounded-xl font-medium hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/20"
                        >
                            View My Work <FiCode />
                        </Link>
                        <a
                            href="/Tejas_Ghoti_Resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-6 py-4 rounded-xl font-medium hover:bg-secondary/80 transition-all hover:scale-105 shadow-sm"
                        >
                            Read My Resume <FiFileText />
                        </a>
                        <Link
                            href="#achievements"
                            className="flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-6 py-4 rounded-xl font-medium hover:bg-secondary/80 transition-all hover:scale-105 shadow-sm"
                        >
                            Achievements <FiAward />
                        </Link>
                        <Link
                            href="#socials"
                            className="flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-6 py-4 rounded-xl font-medium hover:bg-secondary/80 transition-all hover:scale-105 shadow-sm"
                        >
                            Connect <FiArrowRight />
                        </Link>
                    </div>
                </motion.div>

                {/* Framed Profile Picture */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="relative p-2 rounded-3xl bg-gradient-to-tr from-primary/30 via-primary/10 to-blue-500/20 border border-primary/30 shadow-2xl shadow-primary/20 backdrop-blur-xl mx-auto md:ml-auto shrink-0"
                >
                    <div className="relative w-56 h-56 md:w-80 md:h-80 rounded-2xl overflow-hidden border-2 border-white/10 group">
                        {about?.image_url && (
                            <Image
                                src={about.image_url}
                                alt="Tejas Ghoti"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                                unoptimized
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                        <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex items-center justify-between text-xs font-mono">
                            <span className="text-white/90 font-medium">Tejas Ghoti</span>
                            <span className="text-primary font-bold">PICT Pune</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Quote & Clock Row */}
            <div className="flex flex-col md:flex-row gap-10 md:gap-20 mt-12">
                {/* The Office Quote with Caveat Font */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="flex-1 bg-secondary/20 border border-border rounded-2xl p-6 flex flex-col justify-center text-center md:text-left relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <FiMessageSquare className="text-6xl" />
                    </div>
                    <blockquote className="text-xl md:text-2xl font-[family-name:var(--font-caveat)] text-foreground/90 relative z-10 leading-snug">
                        &quot;You miss 100% of shots you don&apos;t take&quot;
                    </blockquote>
                    <p className="text-sm md:text-base text-muted-foreground mt-3 relative z-10 font-[family-name:var(--font-caveat)]">
                        ~ <span className="line-through opacity-60">Wayne Gretzky</span> ~ <span className="line-through opacity-60">Michael Scott</span> ~ <span className="text-primary font-bold text-lg">Tejas Ghoti</span>
                    </p>
                </motion.div>

                {/* Clock Widget */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.3, delay: 0.25 }}
                    className="w-full md:w-80 shrink-0 bg-card border border-border rounded-2xl p-6 flex flex-col justify-between shadow-sm relative overflow-hidden"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between w-full border-b border-border/50 pb-3 mb-2">
                        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            <FiClock /> IST (Pune, India)
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-green-600/80">Available 2026</span>
                        </div>
                    </div>

                    {/* Time */}
                    <div className="text-4xl md:text-5xl font-mono font-bold text-primary tracking-widest text-center py-2">
                        {time}
                    </div>

                    {/* Date Footer */}
                    <div className="text-center border-t border-border/50 pt-3 mt-2">
                        <p className="text-sm font-medium text-muted-foreground">
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Down Indicator */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50"
            >
                <span className="text-xs uppercase tracking-widest font-mono">Scroll Down</span>
                <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <FiArrowRight className="rotate-90" />
                </motion.div>
            </motion.div>
        </section>
    );
}
