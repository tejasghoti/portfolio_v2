"use client";

import { getProjectsData, Project } from "@/lib/data";
import { LayoutGroup, motion } from "framer-motion";
import { FiCode, FiExternalLink, FiGithub, FiMaximize2, FiLayers, FiArchive } from "react-icons/fi";
import Image from "next/image";
import { useRef, useState } from "react";
import { techStackIcons, techStackUrls } from "@/lib/icons";

const statusColors = {
    deployed: "bg-green-500 shadow-[0_0_10px_#22c55e]",
    built: "bg-yellow-500 shadow-[0_0_10px_#eab308]",
    building: "bg-red-500 shadow-[0_0_10px_#ef4444]"
};

const statusLabels = {
    deployed: "Deployed / Active",
    built: "Built (Repository)",
    building: "Building"
};

const cardTransition = {
    layout: { type: "spring", stiffness: 260, damping: 32, mass: 0.9 },
    opacity: { duration: 0.2 },
} as const;

export default function ProjectsSection() {
    const projectsData = getProjectsData();
    const allProjects = projectsData.projects as Project[];
    
    const [activeTab, setActiveTab] = useState<"flagship" | "archive">("flagship");

    const flagshipProjects = allProjects.filter((p) => p.status === "deployed");
    const archiveProjects = allProjects.filter((p) => p.status !== "deployed");

    const activeList = activeTab === "flagship" ? flagshipProjects : archiveProjects;

    const [expandedProjectId, setExpandedProjectId] = useState<string>(() => flagshipProjects[0]?.id ?? "");
    const sectionRef = useRef<HTMLElement | null>(null);

    const orderedProjects = [
        ...activeList.filter((project) => project.id === expandedProjectId),
        ...activeList.filter((project) => project.id !== expandedProjectId),
    ];

    const expandProject = (projectId: string) => {
        setExpandedProjectId(projectId);
        window.setTimeout(() => {
            sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 80);
    };

    return (
        <section ref={sectionRef} id="projects" className="min-h-screen flex flex-col justify-center py-20 scroll-mt-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                className="space-y-4 mb-8 text-center"
            >
                <h2 className="text-3xl font-bold">
                    Deployed Projects &amp; Project Archive
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Prioritized AI/ML engineering, high-concurrency microservices, and decentralized architectures.
                </p>

                {/* Tab Switcher */}
                <div className="flex items-center justify-center gap-3 pt-4">
                    <button
                        onClick={() => {
                            setActiveTab("flagship");
                            if (flagshipProjects.length > 0) setExpandedProjectId(flagshipProjects[0].id);
                        }}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                            activeTab === "flagship"
                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                                : "bg-secondary/70 text-muted-foreground hover:bg-secondary hover:text-foreground"
                        }`}
                    >
                        <FiLayers /> Deployed Projects ({flagshipProjects.length})
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab("archive");
                            if (archiveProjects.length > 0) setExpandedProjectId(archiveProjects[0].id);
                        }}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                            activeTab === "archive"
                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                                : "bg-secondary/70 text-muted-foreground hover:bg-secondary hover:text-foreground"
                        }`}
                    >
                        <FiArchive /> Other Projects ({archiveProjects.length})
                    </button>
                </div>
            </motion.div>

            {/* Flagship Projects Grid */}
            {activeTab === "flagship" && flagshipProjects.length > 0 && (
                <div className="relative left-1/2 w-[min(1120px,calc(100vw-2rem))] -translate-x-1/2 mb-16">
                    <LayoutGroup id="projects-grid-flagship">
                        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                            {orderedProjects.map((project) => {
                                const isExpanded = project.id === expandedProjectId;

                                return (
                                    <motion.article
                                        key={project.id}
                                        layout="position"
                                        initial={false}
                                        animate={{ opacity: 1 }}
                                        transition={cardTransition}
                                        className={`group relative overflow-hidden rounded-2xl border border-border/70 bg-card/70 shadow-sm backdrop-blur-sm transition-[border-color,background-color,box-shadow] duration-300 hover:border-primary/50 hover:bg-card hover:shadow-xl hover:shadow-primary/10 ${isExpanded ? "md:col-span-2 lg:col-span-3 lg:grid lg:grid-cols-[minmax(420px,1.15fr)_minmax(360px,0.85fr)]" : "flex flex-col"}`}
                                    >
                                        {!isExpanded && (
                                            <button
                                                type="button"
                                                onClick={() => expandProject(project.id)}
                                                className="absolute right-3 top-3 z-20 grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-black/55 text-white shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:bg-black/75"
                                                aria-label={`Expand ${project.title}`}
                                            >
                                                <FiMaximize2 size={15} />
                                            </button>
                                        )}

                                        <motion.div
                                            layout
                                            transition={cardTransition}
                                            className={`relative bg-secondary/40 overflow-hidden ${isExpanded ? "h-60 md:h-72 lg:h-full lg:min-h-[360px]" : "h-44"}`}
                                        >
                                            {project.image_url ? (
                                                <Image
                                                    src={project.image_url}
                                                    alt={project.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                    unoptimized
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center h-full text-muted-foreground">
                                                    <FiCode size={40} />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
                                            <div className={`absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2 ${isExpanded ? "max-w-[calc(100%-1.5rem)]" : "max-w-[calc(100%-4.25rem)]"}`}>
                                                <div className={`w-2 h-2 rounded-full animate-pulse ${statusColors[project.status].split(" ")[0]}`} />
                                                <span className="text-[10px] font-semibold uppercase tracking-wider text-white/90 truncate">
                                                    {statusLabels[project.status]}
                                                </span>
                                            </div>
                                        </motion.div>

                                        <motion.div layout transition={cardTransition} className={`p-5 flex flex-col ${isExpanded ? "lg:p-6" : ""}`}>
                                            <div className="flex-1 space-y-4">
                                                <div className="space-y-2">
                                                    <h3 className={`font-bold tracking-tight group-hover:text-primary transition-colors ${isExpanded ? "text-2xl" : "text-lg"} line-clamp-2`}>
                                                        {project.title}
                                                    </h3>
                                                    <p className={`text-muted-foreground leading-relaxed ${isExpanded ? "text-sm md:text-[15px] line-clamp-5" : "text-sm line-clamp-2"}`}>
                                                        {project.description}
                                                    </p>
                                                </div>

                                                <div className="flex flex-wrap gap-2">
                                                    {project.tech_stack.map((tech) => {
                                                        const Icon = techStackIcons[tech] || FiCode;
                                                        const url = techStackUrls[tech];

                                                        const content = (
                                                            <div
                                                                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-secondary/70 text-xs font-mono text-secondary-foreground ring-1 ring-border/50 transition-all hover:text-primary hover:ring-primary/40"
                                                                title={tech}
                                                            >
                                                                <Icon size={14} />
                                                                <span>{tech}</span>
                                                            </div>
                                                        );

                                                        if (url) {
                                                            return (
                                                                <a
                                                                    key={tech}
                                                                    href={url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                >
                                                                    {content}
                                                                </a>
                                                            );
                                                        }

                                                        return <div key={tech}>{content}</div>;
                                                    })}
                                                </div>
                                            </div>

                                            <div className="mt-5 grid grid-cols-2 gap-2 border-t border-border/50 pt-4">
                                                {project.github_link ? (
                                                    <a
                                                        href={project.github_link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-secondary/70 px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-primary"
                                                    >
                                                        <FiGithub /> Code
                                                    </a>
                                                ) : (
                                                    <span className="inline-flex items-center justify-center gap-2 rounded-lg bg-secondary/40 px-3 py-2 text-sm font-medium text-muted-foreground opacity-60">
                                                        <FiGithub /> Code
                                                    </span>
                                                )}

                                                {project.demo_link ? (
                                                    <a
                                                        href={project.demo_link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
                                                    >
                                                        <FiExternalLink /> Live Demo
                                                    </a>
                                                ) : (
                                                    <span className="inline-flex items-center justify-center gap-2 rounded-lg bg-secondary/40 px-3 py-2 text-sm font-medium text-muted-foreground opacity-60">
                                                        <FiExternalLink /> Built
                                                    </span>
                                                )}
                                            </div>
                                        </motion.div>
                                    </motion.article>
                                );
                            })}
                        </motion.div>
                    </LayoutGroup>
                </div>
            )}

            {/* Archive / Experiments Grid */}
            {activeTab === "archive" && archiveProjects.length > 0 && (
                <div className="max-w-6xl mx-auto w-full px-4 mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {archiveProjects.map((project, idx) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false }}
                                transition={{ delay: idx * 0.05, duration: 0.3 }}
                                className="bg-card/70 border border-border/70 rounded-xl p-5 hover:border-primary/50 transition-all flex flex-col justify-between hover:shadow-lg"
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-secondary text-primary font-semibold">
                                            {project.status.toUpperCase()}
                                        </span>
                                        <a
                                            href={project.github_link || "https://github.com/tejasghoti"}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            <FiGithub size={18} />
                                        </a>
                                    </div>
                                    <h3 className="text-lg font-bold hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                                        {project.description}
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/40 mt-4">
                                    {project.tech_stack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="text-[11px] font-mono px-2 py-0.5 rounded bg-secondary/50 text-muted-foreground"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}
