"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

const education = [
  {
    id: 1,
    degree: "Bachelor of Technology (B.Tech)",
    field: "CElectrical Engineering",
    school: "Dr. Babasaheb Ambedkar College of Engineering and Research",
    location: "Nagpur, Maharashtra",
    period: "2017 - 2021",
    description:
      "Focused on Electrical engineering fundamentals.",
    color: "#8b5cf6",
  },
  {
    id: 2,
    degree: "Intermediate (12th)",
    field: "Science Stream",
    school: "Govt Higher Secondary School",
    location: "Betul Mp",
    period: "2016",
    description:
      "Completed higher secondary education with focus on Mathematics, Physics, and Chemistry.",
    color: "#06b6d4",
  },
  {
    id: 3,
    degree: "High School (10th)",
    field: "General Education",
    school: "GHSS",
    location: "Betul Mp",
    period: "2014",
    description:
      "Completed foundational education with strong academic performance.",
    color: "#f472b6",
  },
];

export default function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-20 lg:py-32 bg-[#0a0a0a] relative" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-purple-400 font-medium mb-4 block">
            Academic Background
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Education</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full" />
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            My academic journey that built the foundation for my career
          </p>
        </motion.div>

        {/* Education Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-cyan-500 to-pink-500 transform md:-translate-x-1/2" />

          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline dot */}
              <div
                className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full border-4 border-[#0a0a0a] transform -translate-x-1/2 z-10"
                style={{ backgroundColor: edu.color }}
              />

              {/* Content */}
              <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800 hover:border-purple-500/30 transition-all relative overflow-hidden group"
                >
                  {/* Gradient accent */}
                  <div
                    className="absolute top-0 left-0 w-1 h-full"
                    style={{ backgroundColor: edu.color }}
                  />

                  {/* Year Badge */}
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4"
                    style={{ backgroundColor: `${edu.color}20`, color: edu.color }}
                  >
                    <FaCalendarAlt className="text-xs" />
                    {edu.period}
                  </div>

                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="p-3 rounded-xl flex-shrink-0"
                      style={{ backgroundColor: `${edu.color}20` }}
                    >
                      <FaGraduationCap
                        className="text-2xl"
                        style={{ color: edu.color }}
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">{edu.degree}</h3>
                      <p className="text-purple-400 font-medium text-sm">{edu.field}</p>
                    </div>
                  </div>

                  {/* School */}
                  <p className="text-white font-medium mb-2">{edu.school}</p>

                  {/* Location */}
                  <p className="flex items-center gap-1 text-sm text-gray-400 mb-4">
                    <FaMapMarkerAlt className="text-cyan-400" />
                    {edu.location}
                  </p>

                  {/* Description */}
                  <p className="text-gray-400 text-sm">{edu.description}</p>

                  {/* Hover effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
                    style={{
                      background: `linear-gradient(135deg, ${edu.color}, transparent)`,
                    }}
                  />
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
