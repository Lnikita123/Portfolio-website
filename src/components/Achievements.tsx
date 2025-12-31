"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  FaTrophy,
  FaCode,
  FaServer,
  FaDocker,
  FaDatabase,
  FaAws,
  FaUsers,
  FaRocket,
} from "react-icons/fa";

const achievements = [
  {
    id: 1,
    icon: FaRocket,
    title: "High-Scale Messaging System",
    description: "Built WhatsApp system processing 2.5M+ messages daily with 99.9% uptime",
    category: "Engineering",
    color: "#8b5cf6",
  },
  {
    id: 2,
    icon: FaServer,
    title: "Backend Architecture",
    description: "Designed and implemented scalable REST APIs handling thousands of requests",
    category: "Backend",
    color: "#06b6d4",
  },
  {
    id: 3,
    icon: FaDocker,
    title: "DevOps Implementation",
    description: "Containerized applications with Docker and deployed on AWS EC2",
    category: "DevOps",
    color: "#2496ED",
  },
  {
    id: 4,
    icon: FaDatabase,
    title: "Database Optimization",
    description: "Optimized MongoDB and PostgreSQL queries for efficient data processing",
    category: "Database",
    color: "#47A248",
  },
  {
    id: 5,
    icon: FaCode,
    title: "Full Stack Development",
    description: "3+ years building full-stack applications with Node.js and React",
    category: "Development",
    color: "#f472b6",
  },
  {
    id: 6,
    icon: FaAws,
    title: "Cloud Deployment",
    description: "Deployed and managed applications on AWS with Auth0 authentication",
    category: "Cloud",
    color: "#FF9900",
  },
  {
    id: 7,
    icon: FaUsers,
    title: "Team Collaboration",
    description: "Active participation in code reviews and Agile development practices",
    category: "Leadership",
    color: "#10b981",
  },
  {
    id: 8,
    icon: FaTrophy,
    title: "B.Tech Graduate",
    description: "Electrical Engineering from Dr. BACE&R, Nagpur",
    category: "Education",
    color: "#fbbf24",
  },
];

const stats = [
  { number: "2.5M+", label: "Messages/Day" },
  { number: "99.9%", label: "System Uptime" },
  { number: "2+", label: "Years Experience" },
  { number: "2", label: "Companies" },
];

export default function Achievements() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="achievements" className="py-20 lg:py-32 bg-[#0a0a0a] relative" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
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
            Highlights & Milestones
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text">Achievements</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full" />
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Key accomplishments and technical milestones from my career
          </p>
        </motion.div>

        {/* Stats
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
              className="text-center p-6 bg-[#1a1a1a] rounded-2xl border border-gray-800"
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div> */}

        {/* Achievements Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800 hover:border-purple-500/30 transition-all relative overflow-hidden cursor-pointer"
            >
              {/* Background glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
                style={{
                  background: `radial-gradient(circle at center, ${achievement.color}, transparent)`,
                }}
              />

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${achievement.color}20` }}
              >
                <achievement.icon
                  className="text-2xl"
                  style={{ color: achievement.color }}
                />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <span
                  className="inline-block px-2 py-0.5 text-xs rounded-full mb-2"
                  style={{
                    backgroundColor: `${achievement.color}20`,
                    color: achievement.color,
                  }}
                >
                  {achievement.category}
                </span>
                <h3 className="text-lg font-bold mb-2 group-hover:text-white transition-colors">
                  {achievement.title}
                </h3>
                <p className="text-sm text-gray-400">{achievement.description}</p>
              </div>

              {/* Corner decoration */}
              <div
                className="absolute top-0 right-0 w-16 h-16 opacity-10"
                style={{
                  background: `linear-gradient(135deg, ${achievement.color} 50%, transparent 50%)`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
