"use client";

import { useSong } from "@/context/SongContext";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FiSkipBack, FiSkipForward, FiPlay, FiPause, FiVolume2, FiVolumeX, FiInfo, FiList, FiX } from "react-icons/fi";
import { CSSProperties, useEffect, useState, useRef } from "react";

import Image from "next/image";

export default function SongPlayer() {
    const { currentSong, isPlaying, togglePlay, playNext, playPrev, isInitialized, currentTime, duration, isMuted, toggleMute, seek, songs, playSong, volume, setVolume } = useSong();
    const [showRipple, setShowRipple] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [showSongList, setShowSongList] = useState(false);
    const [isHeroVisible, setIsHeroVisible] = useState(true);
    const isFirstMount = useRef(true);
    const shouldReduceMotion = useReducedMotion();
    const verticalSliderStyle: CSSProperties = { writingMode: "vertical-lr", direction: "rtl" };
    const playerTransition = shouldReduceMotion
        ? { duration: 0.16 }
        : { type: "spring" as const, stiffness: 260, damping: 32 };
    const overlayTransition = shouldReduceMotion
        ? { duration: 0.16 }
        : { duration: 0.25, ease: "easeOut" as const };

    // Trigger ripple on song change
    useEffect(() => {
        if (!isInitialized) return;

        if (isFirstMount.current) {
            isFirstMount.current = false;
            return;
        }

        if (shouldReduceMotion) return;

        const startTimer = setTimeout(() => setShowRipple(true), 0);
        const endTimer = setTimeout(() => setShowRipple(false), 950);
        return () => {
            clearTimeout(startTimer);
            clearTimeout(endTimer);
        };
    }, [currentSong.id, isInitialized, shouldReduceMotion]);

    useEffect(() => {
        const hero = document.getElementById("home");
        if (!hero) return;

        const observer = new IntersectionObserver(
            ([entry]) => setIsHeroVisible(entry.isIntersecting),
            { threshold: 0.18 }
        );

        observer.observe(hero);
        return () => observer.disconnect();
    }, []);

    if (!isInitialized) return null;

    const progress = duration ? (currentTime / duration) * 100 : 0;

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const width = rect.width;
        const newTime = (x / width) * duration;
        seek(newTime);
    };

    return (
        <>
            {/* Theme Transition Wash */}
            <AnimatePresence>
                {showRipple && (
                    <motion.div key={currentSong.id} className="fixed inset-0 z-30 pointer-events-none overflow-hidden">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 0.22, 0] }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.95, ease: "easeOut" }}
                            className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,hsl(var(--primary)/0.38),transparent_34%),radial-gradient(circle_at_80%_76%,hsl(var(--accent)/0.22),transparent_42%)]"
                        />
                        <motion.div
                            initial={{ x: "-120%", opacity: 0 }}
                            animate={{ x: "120%", opacity: [0, 0.42, 0] }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute -inset-y-20 left-0 w-1/2 rotate-12 bg-gradient-to-r from-transparent via-primary/25 to-transparent blur-2xl"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: [0, 0.12, 0], scale: [0.98, 1.02, 1.04] }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.95, ease: "easeOut" }}
                            className="absolute inset-0 bg-background"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
                {!isExpanded ? (
                    /* Mini Player */
                    <motion.div
                        layoutId={shouldReduceMotion ? undefined : "player-container"}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={playerTransition}
                        onClick={() => setIsExpanded(true)}
                        className="fixed bottom-0 left-0 right-0 z-50 w-full cursor-pointer md:bottom-auto md:right-auto md:left-[clamp(1rem,2vw,2rem)] md:top-[clamp(5rem,10svh,7rem)] md:w-[clamp(16rem,22vw,19rem)]"
                    >
                        {/* Inner Wrapper for Player Content (Overflow Hidden) */}
                        <div className="relative w-full h-full rounded-t-xl md:rounded-xl overflow-hidden border-t md:border border-white/10 shadow-2xl backdrop-blur-md bg-black/40">
                            {/* Dynamic Gradient Background */}
                            <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-primary/40 to-accent/40 pointer-events-none" />

                            <div className="relative p-[clamp(0.7rem,1.2vw,0.9rem)] flex gap-3 items-center">
                                {/* Album Art */}
                                <motion.div layoutId={shouldReduceMotion ? undefined : "album-art"} className="relative size-[clamp(3rem,4vw,3.5rem)] rounded-md overflow-hidden shadow-md shrink-0">
                                    <Image
                                        src={currentSong.image}
                                        alt={currentSong.title}
                                        fill
                                        className="object-cover"
                                    />
                                </motion.div>

                                {/* Song Info & Controls */}
                                <div className="flex flex-col flex-1 min-w-0">
                                    <motion.div layoutId={shouldReduceMotion ? undefined : "song-info"} className="flex flex-col mb-1">
                                        <h3 className="text-sm font-bold text-foreground truncate">{currentSong.title}</h3>
                                        <p className="text-xs text-muted-foreground truncate">{currentSong.artist}</p>
                                    </motion.div>

                                    {/* Controls */}
                                    <div className="flex items-center justify-between mt-1" onClick={(e) => e.stopPropagation()}>
                                        <button onClick={playPrev} className="p-1.5 hover:bg-white/10 rounded-full transition-colors"><FiSkipBack size={16} /></button>
                                        <button onClick={togglePlay} className="p-2 bg-primary text-primary-foreground rounded-full shadow-md hover:scale-105 transition-transform">
                                            {isPlaying ? <FiPause size={16} /> : <FiPlay size={16} className="ml-0.5" />}
                                        </button>
                                        <button onClick={playNext} className="p-1.5 hover:bg-white/10 rounded-full transition-colors"><FiSkipForward size={16} /></button>
                                        <button onClick={toggleMute} className={`p-1.5 rounded-full transition-colors ${isMuted ? 'text-red-400 bg-red-400/10' : 'text-muted-foreground hover:text-foreground'}`}>
                                            {isMuted ? <FiVolumeX size={16} /> : <FiVolume2 size={16} />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="relative h-1 bg-white/10 w-full">
                                <motion.div className="absolute top-0 left-0 h-full bg-primary" style={{ width: `${progress}%` }} layoutId={shouldReduceMotion ? undefined : "progress-bar"} />
                            </div>
                        </div>

                        {/* My Top 10 Button */}
                        <AnimatePresence>
                            {isHeroVisible && (
                                <motion.div
                                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                                    animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                                    transition={overlayTransition}
                                    className="absolute left-[calc(100%+clamp(0.75rem,1.4vw,1.25rem))] top-[clamp(3.75rem,9svh,5.75rem)] hidden xl:flex max-h-[calc(100svh-10rem)] flex-col items-start pointer-events-auto z-50"
                                >
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShowSongList(true);
                                        }}
                                        className="font-[family-name:var(--font-gochi)] text-[clamp(1.6rem,2.1vw,2.25rem)] text-foreground -rotate-12 hover:scale-110 transition-transform cursor-pointer whitespace-nowrap"
                                    >
                                        My top 5
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Arrow SVG */}
                        <AnimatePresence>
                            {isHeroVisible && (
                                <motion.svg
                                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                                    animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                                    transition={overlayTransition}
                                    className="absolute left-[clamp(2rem,4vw,3.25rem)] top-[calc(100%+clamp(0.75rem,2svh,1.5rem))] w-[clamp(12rem,24vw,18rem)] h-[clamp(5.5rem,13svh,8rem)] text-foreground hidden xl:block pointer-events-none z-40"
                                    viewBox="0 0 300 150"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M20,40 Q100,100 220,50" />
                                    <path d="M220,50 L205,55" />
                                    <path d="M220,50 L210,65" />
                                </motion.svg>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    /* Full Player Overlay */
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={overlayTransition}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-[clamp(0.75rem,2vw,1.5rem)]"
                        onClick={() => setIsExpanded(false)}
                    >
                        <motion.div
                            layoutId={shouldReduceMotion ? undefined : "player-container"}
                            transition={playerTransition}
                            className="relative w-[min(92vw,28rem)] bg-card border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[calc(100svh-1.5rem)]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Background Blur of Album Art */}
                            <div className="absolute inset-0 z-0">
                                <Image src={currentSong.image} alt="bg" fill className="object-cover opacity-20 blur-xl" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                            </div>

                            <div className="relative z-10 p-[clamp(1rem,2.5svh,1.75rem)] flex flex-col items-center text-center h-full justify-center space-y-[clamp(0.75rem,2.2svh,1.5rem)] overflow-y-auto scrollbar-hide">
                                {/* Header */}
                                <div className="w-full flex justify-between items-center text-xs font-bold tracking-widest uppercase text-white relative shrink-0">
                                    <span className="absolute left-1/2 -translate-x-1/2">Now Playing</span>
                                    <div className="flex items-center gap-2 ml-auto">
                                        <button
                                            onClick={() => setShowSongList(true)}
                                            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
                                            aria-label="View Queue"
                                        >
                                            <FiList size={24} />
                                        </button>
                                        <button
                                            onClick={() => setIsExpanded(false)}
                                            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
                                            aria-label="Collapse Player"
                                        >
                                            <FiSkipBack className="rotate-[-90deg]" size={24} />
                                        </button>
                                    </div>
                                </div>

                                {/* Large Album Art */}
                                <motion.div
                                    layoutId={shouldReduceMotion ? undefined : "album-art"}
                                    className="relative size-[clamp(9rem,28svh,16rem)] rounded-2xl overflow-hidden shadow-2xl border border-white/10 shrink-0"
                                    style={{ boxShadow: "0 20px 50px -12px rgba(0, 0, 0, 0.5)" }}
                                >
                                    <Image src={currentSong.image} alt={currentSong.title} fill className="object-cover" />
                                </motion.div>

                                {/* Song Info */}
                                <motion.div layoutId={shouldReduceMotion ? undefined : "song-info"} className="space-y-1.5 flex flex-col items-center">
                                    <h2 className="text-[clamp(1.25rem,3svh,1.5rem)] font-bold text-white">{currentSong.title}</h2>
                                    <p className="text-[clamp(0.95rem,2.2svh,1.125rem)] text-white/70">{currentSong.artist}</p>
                                </motion.div>

                                {/* Scrubber */}
                                <div className="w-full space-y-2">
                                    <div
                                        className="relative h-1.5 bg-white/20 rounded-full cursor-pointer group"
                                        onClick={handleSeek}
                                    >
                                        <motion.div
                                            layoutId={shouldReduceMotion ? undefined : "progress-bar"}
                                            className="absolute top-0 left-0 h-full bg-white rounded-full group-hover:bg-white/80 transition-colors"
                                            style={{ width: `${progress}%` }}
                                        >
                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </motion.div>
                                    </div>
                                    <div className="flex justify-between text-xs text-white/70 font-mono">
                                        <span suppressHydrationWarning>{formatTime(currentTime)}</span>
                                        <span suppressHydrationWarning>{formatTime(duration)}</span>
                                    </div>
                                </div>

                                {/* Main Controls */}
                                <div className="grid grid-cols-3 items-center w-full max-w-[min(20rem,88vw)] mx-auto">
                                    {/* Prev Button & About */}
                                    <div className="flex justify-end items-center gap-4">
                                        <a
                                            href={currentSong.about}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
                                            aria-label="About Song"
                                        >
                                            <FiInfo size={24} />
                                        </a>
                                        <button onClick={playPrev} className="p-3 hover:bg-white/10 rounded-full transition-colors text-white"><FiSkipBack size={28} /></button>
                                    </div>

                                    {/* Play/Pause Button (Centered) */}
                                    <div className="flex justify-center">
                                        <button
                                            onClick={togglePlay}
                                            className="p-4 bg-white text-black rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all"
                                        >
                                            {isPlaying ? <FiPause size={32} /> : <FiPlay size={32} className="ml-1" />}
                                        </button>
                                    </div>

                                    {/* Next & Mute Group */}
                                    <div className="flex justify-start items-center gap-4">
                                        <button onClick={playNext} className="p-3 hover:bg-white/10 rounded-full transition-colors text-white"><FiSkipForward size={28} /></button>

                                        {/* Volume Control */}
                                        <div className="relative group flex justify-center">
                                            {/* Slider Popup Wrapper (Hover Bridge) */}
                                            <div className="absolute bottom-full hidden group-hover:flex flex-col items-center justify-end pb-4 z-50">
                                                {/* Visual Slider Container */}
                                                <div className="bg-black/80 backdrop-blur-xl p-3 rounded-2xl border border-white/10 shadow-xl w-10 h-32 flex flex-col items-center justify-center">
                                                    <div className="relative w-1.5 h-24 bg-white/20 rounded-full overflow-hidden">
                                                        <div
                                                            className="absolute bottom-0 left-0 w-full bg-white rounded-full transition-all duration-75"
                                                            style={{ height: `${(isMuted ? 0 : volume) * 100}%` }}
                                                        />
                                                        <input
                                                            type="range"
                                                            min={0}
                                                            max={1}
                                                            step={0.01}
                                                            value={isMuted ? 0 : volume}
                                                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                            style={verticalSliderStyle}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <button onClick={toggleMute} className={`p-3 rounded-full transition-colors ${isMuted ? 'text-red-400 bg-red-400/10' : 'text-white hover:bg-white/10'}`}>
                                                {isMuted ? <FiVolumeX size={24} /> : <FiVolume2 size={24} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Song List Modal */}
            <AnimatePresence>
                {showSongList && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
                        onClick={() => setShowSongList(false)}
                    >
                        <motion.div
                            initial={shouldReduceMotion ? { opacity: 0 } : { scale: 0.96, opacity: 0 }}
                            animate={shouldReduceMotion ? { opacity: 1 } : { scale: 1, opacity: 1 }}
                            exit={shouldReduceMotion ? { opacity: 0 } : { scale: 0.96, opacity: 0 }}
                            transition={overlayTransition}
                            className="relative w-[min(92vw,28rem)] bg-card border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[min(80svh,42rem)]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/20">
                                <h2 className="text-lg font-bold text-white">My Top 5</h2>
                                <button
                                    onClick={() => setShowSongList(false)}
                                    className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-white"
                                >
                                    <FiX size={20} />
                                </button>
                            </div>

                            {/* List */}
                            <div className="overflow-y-auto p-2 space-y-1">
                                {songs.map((song, index) => (
                                    <button
                                        key={song.id}
                                        onClick={() => {
                                            playSong(index);
                                            setShowSongList(false);
                                        }}
                                        className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all group ${currentSong.id === song.id ? 'bg-white/10' : 'hover:bg-white/5'}`}
                                    >
                                        <div className="relative w-10 h-10 rounded-md overflow-hidden shrink-0">
                                            <Image src={song.image} alt={song.title} fill className="object-cover" />
                                            {/* Play Overlay */}
                                            <div className={`absolute inset-0 flex items-center justify-center bg-black/40 ${currentSong.id === song.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
                                                {currentSong.id === song.id && isPlaying ? (
                                                    <div className="flex gap-0.5 items-end h-3">
                                                        <motion.div animate={shouldReduceMotion ? { height: 8 } : { height: [3, 12, 6, 12, 3] }} transition={shouldReduceMotion ? { duration: 0 } : { repeat: Infinity, duration: 1 }} className="w-0.5 bg-white rounded-full" />
                                                        <motion.div animate={shouldReduceMotion ? { height: 8 } : { height: [6, 3, 12, 3, 6] }} transition={shouldReduceMotion ? { duration: 0 } : { repeat: Infinity, duration: 1 }} className="w-0.5 bg-white rounded-full" />
                                                        <motion.div animate={shouldReduceMotion ? { height: 8 } : { height: [12, 6, 3, 6, 12] }} transition={shouldReduceMotion ? { duration: 0 } : { repeat: Infinity, duration: 1 }} className="w-0.5 bg-white rounded-full" />
                                                    </div>
                                                ) : (
                                                    <FiPlay className="text-white fill-white" size={16} />
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-start text-left flex-1 min-w-0">
                                            <span className={`text-sm font-bold truncate ${currentSong.id === song.id ? 'text-primary' : 'text-white'}`}>{song.title}</span>
                                            <span className="text-xs text-white/60 truncate">{song.artist}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
