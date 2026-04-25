"use client";

import { getProjectsData, getRandomExcuse, Project } from "@/lib/data";
import { LayoutGroup, motion } from "framer-motion";
import { FiCode, FiExternalLink, FiGithub, FiMaximize2 } from "react-icons/fi";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { techStackIcons, techStackUrls } from "@/lib/icons";

const statusColors = {
    deployed: "bg-green-500 shadow-[0_0_10px_#22c55e]",
    built: "bg-yellow-500 shadow-[0_0_10px_#eab308]",
    building: "bg-red-500 shadow-[0_0_10px_#ef4444]"
};

const statusLabels = {
    deployed: "Deployed",
    built: "Built (Not Deployed)",
    building: "Building"
};

const cardTransition = {
    layout: { type: "spring", stiffness: 260, damping: 32, mass: 0.9 },
    opacity: { duration: 0.2 },
} as const;

export default function ProjectsSection() {
    const projectsData = getProjectsData();
    const projects = projectsData.projects as Project[];
    const [excuse, setExcuse] = useState("Building in stealth mode, coming soon!");
    const [expandedProjectId, setExpandedProjectId] = useState(() => projects[0]?.id ?? "");
    const sectionRef = useRef<HTMLElement | null>(null);
    const orderedProjects = [
        ...projects.filter((project) => project.id === expandedProjectId),
        ...projects.filter((project) => project.id !== expandedProjectId),
    ];

    const expandProject = (projectId: string) => {
        setExpandedProjectId(projectId);
        window.setTimeout(() => {
            sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 80);
    };

    useEffect(() => {
        const timer = setTimeout(() => setExcuse(getRandomExcuse()), 0);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section ref={sectionRef} id="projects" className="min-h-screen flex flex-col justify-center py-20 scroll-mt-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                className="space-y-4 mb-10 text-center"
            >
                <h2 className="text-3xl font-bold">
                    Projects
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    A showcase of my technical journey and what I&apos;m building.
                </p>
            </motion.div>

            {projects.length > 0 && (
                <div className="relative left-1/2 w-[min(1120px,calc(100vw-2rem))] -translate-x-1/2 mb-16">
                    <LayoutGroup id="projects-grid">
                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                        {orderedProjects.map((project) => {
                            const isExpanded = project.id === expandedProjectId;
                            const isStayTunedImage = project.image_url?.includes("stay-tuned");

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
                                        className={`relative bg-secondary/40 overflow-hidden ${isExpanded ? "h-60 md:h-72 lg:h-full lg:min-h-[360px]" : "h-36"}`}
                                    >
                                        {project.image_url ? (
                                            <Image
                                                src={project.image_url}
                                                alt={project.title}
                                                fill
                                                className={`transition-transform duration-700 group-hover:scale-105 ${isExpanded && !isStayTunedImage ? "object-cover object-left-top" : "object-cover"}`}
                                                style={isStayTunedImage ? { objectPosition: "50% 70%" } : undefined}
                                                unoptimized
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-muted-foreground">
                                                <FiCode size={40} />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
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
                                                <p className={`text-muted-foreground leading-relaxed ${isExpanded ? "text-sm md:text-[15px] line-clamp-5" : "text-sm line-clamp-1"}`}>
                                                    {project.description}
                                                </p>
                                            </div>

                                            <div className={`flex flex-wrap gap-2 ${isExpanded ? "" : "max-h-8 overflow-hidden"}`}>
                                                {project.tech_stack.map((tech) => {
                                                    const Icon = techStackIcons[tech] || FiCode;
                                                    const url = techStackUrls[tech];

                                                    const content = (
                                                        <div
                                                            className="grid h-8 w-8 place-items-center rounded-lg bg-secondary/70 text-secondary-foreground ring-1 ring-border/50 transition-all hover:-translate-y-0.5 hover:text-primary hover:ring-primary/40"
                                                            title={tech}
                                                        >
                                                            <Icon size={16} />
                                                        </div>
                                                    );

                                                    if (url) {
                                                        return (
                                                            <a
                                                                key={tech}
                                                                href={url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                aria-label={tech}
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
                                                    <FiExternalLink /> Live
                                                </a>
                                            ) : (
                                                <span className="inline-flex items-center justify-center gap-2 rounded-lg bg-secondary/40 px-3 py-2 text-sm font-medium text-muted-foreground opacity-60">
                                                    <FiExternalLink /> Live
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

            {/* Coming Soon / Excuses */}
            <div className="text-center space-y-8 py-10 bg-secondary/10 rounded-3xl border border-dashed border-border">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    className="space-y-4"
                >
                    <h2 className="text-2xl font-bold">More Projects Coming Soon...</h2>
                    <div className="max-w-2xl mx-auto overflow-hidden bg-card rounded-2xl border border-primary/20 shadow-sm">
                        <div className="relative h-56 md:h-72 bg-black">
                            <Image
                                src="/projects/stay-tuned.png"
                                alt="Stay tuned"
                                fill
                                className="object-contain"
                                unoptimized
                            />
                        </div>
                        <div className="p-6">
                            <p className="text-lg font-medium italic text-muted-foreground">
                                &quot;{excuse}&quot;
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
