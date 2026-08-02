"use client";

import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiArrowUpRight } from "react-icons/fi";
import { SiLeetcode, SiCodechef } from "react-icons/si";

const socials = [
    {
        name: "GitHub",
        handle: "@tejasghoti",
        link: "https://github.com/tejasghoti",
        icon: FiGithub,
        color: "hover:text-foreground",
        desc: "Code Repositories",
        status: "Active Contributor"
    },
    {
        name: "LinkedIn",
        handle: "Tejas Ghoti",
        link: "https://www.linkedin.com/in/tejas-ghoti-911rs/",
        icon: FiLinkedin,
        color: "hover:text-blue-600",
        desc: "Professional Network",
        status: "Open to 2026 Roles"
    },
    {
        name: "LeetCode",
        handle: "1550 Rating (300+ Solved)",
        link: "https://leetcode.com/u/tejasghoti/",
        icon: SiLeetcode,
        color: "hover:text-amber-500",
        desc: "Algorithms & Data Structures",
        status: "Solving Daily"
    },
    {
        name: "CodeChef",
        handle: "1466 Rating",
        link: "https://www.codechef.com/users/tejasghoti",
        icon: SiCodechef,
        color: "hover:text-amber-700",
        desc: "Competitive Contests",
        status: "Active Contestant"
    }
];

export default function SocialSection() {
    return (
        <section id="socials" className="min-h-[80vh] flex flex-col justify-center py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.3 }}
                className="space-y-4 mb-12 text-center"
            >
                <h2 className="text-3xl font-bold inline-flex items-center gap-3">
                    Connect &amp; Collaborate
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto text-sm">
                    Reach out across professional channels or explore my open-source code repositories.
                </p>
            </motion.div>

            <div className="grid gap-6 max-w-3xl mx-auto w-full">
                {socials.map((social, index) => (
                    <motion.a
                        key={social.name}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border p-6 rounded-2xl hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                        <div className="flex items-center justify-between relative z-10">
                            <div className="flex items-center gap-6">
                                <div className={`p-4 rounded-xl bg-secondary/50 group-hover:bg-primary/10 transition-colors ${social.color}`}>
                                    <social.icon size={32} />
                                </div>
                                <div className="space-y-1 text-left">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h3 className="text-xl font-bold">{social.name}</h3>
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border/50 flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                            {social.status}
                                        </span>
                                    </div>
                                    <p className="text-muted-foreground font-mono text-sm">{social.desc} {" // "} {social.handle}</p>
                                </div>
                            </div>
                            <FiArrowUpRight className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0" size={24} />
                        </div>
                    </motion.a>
                ))}
            </div>

            {/* Contact Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="mt-12 p-8 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl text-center space-y-6 max-w-2xl mx-auto w-full shadow-xl"
            >
                <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Let&apos;s Build Something Impactful.</h3>
                    <p className="text-muted-foreground text-sm">
                        Whether it&apos;s architecting autonomous LLM pipelines, scaling backend infrastructure, or exploring decentralized networks, I&apos;m always open to discussing new technical challenges.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                        href="mailto:tejasghoti@gmail.com"
                        className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-transform hover:scale-105 shadow-lg shadow-primary/20 max-w-full overflow-hidden"
                    >
                        <FiMail className="shrink-0" />
                        <span className="truncate text-sm md:text-lg">tejasghoti@gmail.com</span>
                    </a>
                </div>
            </motion.div>
        </section>
    );
}
