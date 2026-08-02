"use client";

import { getAchievementsData, Achievement } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { FiAward, FiBriefcase, FiExternalLink, FiX, FiMaximize2 } from "react-icons/fi";
import Image from "next/image";
import { useState } from "react";

export default function AchievementsSection() {
  const achievementsData = getAchievementsData();
  const achievements = achievementsData.achievements as Achievement[];

  const certifications = achievements.filter((ach) => ach.type === "certificate");
  const proofOfWork = achievements.filter((ach) => ach.type !== "certificate");

  const [selectedCert, setSelectedCert] = useState<Achievement | null>(null);

  return (
    <section id="achievements" className="min-h-screen flex flex-col justify-center py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        className="space-y-4 mb-16 text-center"
      >
        <h2 className="text-3xl font-bold inline-flex items-center gap-3">
          Certifications &amp; Leadership Achievements
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
          Verified technical certifications, hackathon victories, and student chapter leadership.
        </p>
      </motion.div>

      <div className="space-y-20 max-w-6xl mx-auto w-full px-4">
        {/* Certifications Grid */}
        {certifications.length > 0 && (
          <div className="space-y-8">
            <div className="flex items-center justify-center gap-4">
              <div className="h-px bg-border flex-1 max-w-[100px]" />
              <h3 className="text-xl font-semibold flex items-center gap-2 text-muted-foreground">
                <FiAward className="text-primary" /> Verified Certifications
              </h3>
              <div className="h-px bg-border flex-1 max-w-[100px]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((ach, index) => (
                <motion.div
                  key={ach.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: index * 0.08 }}
                  onClick={() => setSelectedCert(ach)}
                  className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl hover:shadow-primary/10 hover:border-primary/50 transition-all duration-300 flex flex-col cursor-pointer"
                >
                  <div className="relative h-44 w-full bg-secondary/50 overflow-hidden">
                    {ach.image_url ? (
                      <Image
                        src={ach.image_url}
                        alt={ach.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        unoptimized
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        <FiAward size={40} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-black/75 text-white text-xs px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-1.5 font-medium">
                        <FiMaximize2 size={13} /> Expand Preview
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="text-primary font-bold uppercase">{ach.issuer}</span>
                        <span className="text-muted-foreground">{ach.date}</span>
                      </div>
                      <h4 className="font-bold text-sm group-hover:text-primary transition-colors line-clamp-2" title={ach.title}>
                        {ach.title}
                      </h4>
                    </div>

                    {ach.description && (
                      <p className="text-xs text-muted-foreground/80 line-clamp-2 pt-1 border-t border-border/40">
                        {ach.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Proof of Work & Leadership */}
        {proofOfWork.length > 0 && (
          <div className="space-y-8">
            <div className="flex items-center justify-center gap-4">
              <div className="h-px bg-border flex-1 max-w-[100px]" />
              <h3 className="text-xl font-semibold flex items-center gap-2 text-muted-foreground">
                <FiBriefcase className="text-primary" /> Leadership &amp; Honors
              </h3>
              <div className="h-px bg-border flex-1 max-w-[100px]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {proofOfWork.map((ach, index) => (
                <motion.div
                  key={ach.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-xl hover:border-primary/50 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-primary font-bold uppercase">{ach.issuer}</span>
                      <span className="text-muted-foreground">{ach.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground">
                      {ach.title}
                    </h3>
                    {ach.description && (
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {ach.description}
                      </p>
                    )}
                  </div>

                  {ach.credential_link && (
                    <div className="pt-3 border-t border-border/50">
                      <a
                        href={ach.credential_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-mono text-primary hover:underline font-semibold"
                      >
                        <FiExternalLink /> View Verified Record
                      </a>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Certificate Modal Lightbox */}
      <AnimatePresence>
        {selectedCert && selectedCert.image_url && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-card border border-border rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="p-4 border-b border-border/50 flex items-center justify-between bg-secondary/50">
                <div>
                  <h3 className="font-bold text-lg">{selectedCert.title}</h3>
                  <p className="text-xs text-muted-foreground font-mono">{selectedCert.issuer} — {selectedCert.date}</p>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>
              <div className="relative h-[65vh] w-full bg-black/50">
                <Image
                  src={selectedCert.image_url}
                  alt={selectedCert.title}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
