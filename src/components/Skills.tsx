"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiGit,
  SiAmazon,
  SiApachekafka,
  SiAuth0,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiLinux,
  SiNginx,
  SiRedis,
} from "react-icons/si";

const skillCategories = [
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933", level: 95 },
      { name: "Express.js", icon: SiExpress, color: "#ffffff", level: 92 },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", level: 95 },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6", level: 85 },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "#336791", level: 90 },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248", level: 90 },
      { name: "Redis", icon: SiRedis, color: "#DC382D", level: 80 },
    ],
  },
  {
    title: "DevOps & Cloud",
    skills: [
      { name: "Docker", icon: SiDocker, color: "#2496ED", level: 88 },
      { name: "AWS EC2", icon: SiAmazon, color: "#FF9900", level: 85 },
      { name: "Apache Kafka", icon: SiApachekafka, color: "#231F20", level: 82 },
      { name: "Nginx", icon: SiNginx, color: "#009639", level: 78 },
    ],
  },
  {
    title: "Frontend & Tools",
    skills: [
      { name: "React", icon: SiReact, color: "#61DAFB", level: 80 },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", level: 85 },
      { name: "Git", icon: SiGit, color: "#F05032", level: 92 },
      { name: "Linux", icon: SiLinux, color: "#FCC624", level: 85 },
    ],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-20 lg:py-32 bg-[#0a0a0a] relative" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-purple-400 font-medium mb-4 block">
            What I Work With
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full" />
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Technologies and tools I use to build scalable, high-performance systems
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800 hover:border-purple-500/30 transition-colors"
            >
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full" />
                {category.title}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.3,
                      delay: categoryIndex * 0.1 + skillIndex * 0.05,
                    }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="group relative flex flex-col items-center p-4 bg-[#0f0f0f] rounded-xl border border-gray-800 hover:border-purple-500/50 transition-all cursor-pointer"
                  >
                    <div
                      className="text-3xl mb-2 transition-transform group-hover:scale-110"
                      style={{ color: skill.color }}
                    >
                      <skill.icon />
                    </div>
                    <span className="text-sm text-gray-300 font-medium text-center">
                      {skill.name}
                    </span>

                    {/* Skill level indicator */}
                    <div className="w-full mt-3 bg-gray-800 rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{
                          duration: 1,
                          delay: categoryIndex * 0.1 + skillIndex * 0.05,
                        }}
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${skill.color}, #8b5cf6)`,
                        }}
                      />
                    </div>

                    {/* Tooltip */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-purple-600 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {skill.level}%
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 mb-4">Also experienced with:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "REST APIs",
              "Auth0",
              "WhatsApp Business API",
              "Microservices",
              "CI/CD",
              "Unit Testing",
              "Code Reviews",
              "Agile/Scrum",
              "WebSockets",
              "System Design",
            ].map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                className="px-4 py-2 bg-[#1a1a1a] border border-gray-800 rounded-full text-sm text-gray-300 hover:border-purple-500/50 hover:text-white transition-all cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
