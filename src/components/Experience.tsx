"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

const experiences = [
  {
    id: 1,
    role: "Software Engineer",
    company: "Pinnacle",
    location: "Nagpur",
    period: "Sep 2024 - Present",
    description: [
      "Engineered WhatsApp messaging system processing 2.5 million messages daily with 99.9% uptime",
      "Developed middlewares enabling seamless bot functionality and communication",
      "Configured Auth0 authentication for secure user management",
      "Deployed applications on AWS EC2 using Docker containerization",
    ],
    technologies: ["JavaScript", "Node.js","React.js","PostgreSQL", "Auth0", "Apache Kafka", "Docker", "AWS EC2"],
    color: "#8b5cf6",
  },
  {
    id: 2,
    role: "Full Stack Developer",
    company: "Palnesto",
    location: "Hyderabad",
    period: "Aug 2022 - Sep 2024",
    description: [
      "Developed and maintained server-side APIs using Node.js and Express.js, supporting REST protocols for seamless front-end and database communication",
      "Implemented database models and queries using MongoDB for efficient data processing and communication between various system components",
      "Participated in code reviews, unit testing, and debugging to ensure code quality, maintainability and reliability",
      "Managed and maintained code versioning and deployment processes, ensuring timely and error-free releases",
    ],
    technologies: ["Node.js", "Express.js", "MongoDB", "REST APIs", "Git", "JavaScript","React.js","sql", "firebase"],
    color: "#06b6d4",
  },
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-20 lg:py-32 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-purple-400 font-medium mb-4 block">
            My Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full" />
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            My professional journey building scalable systems and applications
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-cyan-500 to-pink-500 transform md:-translate-x-1/2" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full border-4 border-[#0f0f0f] transform -translate-x-1.5 md:-translate-x-1/2 z-10"
                style={{ backgroundColor: exp.color }}
              />

              {/* Content */}
              <div className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800 hover:border-purple-500/30 transition-all"
                  style={{ borderLeftColor: exp.color, borderLeftWidth: "3px" }}
                >
                  {/* Header */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <div
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: `${exp.color}20` }}
                    >
                      <FaBriefcase style={{ color: exp.color }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{exp.role}</h3>
                      <p className="text-purple-400 font-medium">{exp.company}</p>
                    </div>
                  </div>

                  {/* Meta info */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <FaMapMarkerAlt className="text-cyan-400" />
                      {exp.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt className="text-pink-400" />
                      {exp.period}
                    </span>
                  </div>

                  {/* Description */}
                  <ul className="space-y-2 mb-4">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                          style={{ backgroundColor: exp.color }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs rounded-full bg-[#0f0f0f] text-gray-300 border border-gray-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Spacer for timeline alignment */}
              <div className="hidden md:block md:w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
