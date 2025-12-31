"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FaCode, FaServer, FaRocket, FaDatabase } from "react-icons/fa";

const highlights = [
  {
    icon: FaServer,
    title: "Backend Expert",
    description: "Building scalable APIs and microservices",
  },
  {
    icon: FaCode,
    title: "Full Stack",
    description: "End-to-end development expertise",
  },
  {
    icon: FaDatabase,
    title: "Database Design",
    description: "MongoDB & PostgreSQL specialist",
  },
  {
    icon: FaRocket,
    title: "High Performance",
    description: "Systems handling millions of requests",
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-purple-400 font-medium mb-4 block">
            Get To Know Me
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto aspect-square">
              {/* Decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-3xl rotate-6" />
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-3xl -rotate-6" />

              {/* Main card */}
              <div className="relative bg-[#1a1a1a] rounded-3xl p-8 h-full flex flex-col justify-center border border-gray-800">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-5xl font-bold">
                    NL
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Nikita Lilhore</h3>
                  <p className="text-purple-400 mb-4">Software Engineer @ Pinnacle</p>
                  <div className="flex justify-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      Available for opportunities
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              A passionate Software Engineer building scalable systems
            </h3>
            <div className="space-y-4 text-gray-400 mb-8">
              <p>
                Hello! I&apos;m Nikita Lilhore, a software engineer with expertise in
                building high-performance backend systems and full-stack applications.
                Currently at Pinnacle, I&apos;m engineering WhatsApp messaging systems
                that process 2.5 million messages daily with 99.9% uptime.
              </p>
              <p>
                My journey began with a B.Tech in Electrical engineering from Dr. Babasaheb
                Ambedkar College of Engineering and Research, Nagpur. Since then, I&apos;ve
                been passionate about building scalable solutions using Node.js,React.js, Mongodb, PostgreSQL,
                Docker, and cloud technologies.
              </p>
              <p>
                I specialize in developing robust APIs, implementing authentication systems,
                and deploying applications using modern DevOps practices. I believe in writing
                clean, maintainable code and creating systems that can handle massive scale.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { number: "3+", label: "Years Experience" },
                { number: "2.5M+", label: "Messages/Day" },
                { number: "99.9%", label: "System Uptime" },
                { number: "100%", label: "Dedication" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="text-center p-4 bg-[#1a1a1a] rounded-xl border border-gray-800"
                >
                  <div className="text-2xl md:text-3xl font-bold gradient-text">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
        >
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              className="group p-6 bg-[#1a1a1a] rounded-2xl border border-gray-800 hover:border-purple-500/50 transition-all card-hover"
            >
              <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                <item.icon size={24} />
              </div>
              <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
