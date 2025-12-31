"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch, FaSpinner } from "react-icons/fa";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
}

const GITHUB_USERNAME = "Lnikita123";

const languageColors: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  HTML: "#e34c26",
  CSS: "#563d7c",
  "C++": "#f34b7d",
  C: "#555555",
  Go: "#00ADD8",
  Rust: "#dea584",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Shell: "#89e051",
  Dockerfile: "#384d54",
};

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100` // Changed sort back to updated. Increased per_page to ensure we get all desired repos
        );

        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }

        const data: GitHubRepo[] = await response.json();
        console.log("All fetched GitHub repositories:", data.map(repo => repo.name)); // Log all fetched repo names for debugging

        const desiredRepoNames = [
          "neptunes",
          "stmichels",
          "poc-study-tool",
          "yogawebsite",
          "grafana-prometheus",
          "wallet",
        ];

        // Filter for specific repos and remove .github repo
        const filteredRepos = data
          .filter(
            (repo) => {
              const repoNameLower = repo.name.toLowerCase();
              return desiredRepoNames.includes(repoNameLower) && !repo.name.includes(".github");
            }
          )
          .sort((a, b) => b.stargazers_count - a.stargazers_count) // Sort by stars
          .slice(0, 6); // Limit to 6 projects
        
        console.log("Filtered repositories for display:", filteredRepos.map(repo => repo.name)); // Log filtered repo names for debugging

        setRepos(filteredRepos);
        setError(null);
      } catch (err) {
        setError("Failed to load projects. Please try again later.");
        console.error("Error fetching repos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    <section id="projects" className="py-20 lg:py-32 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-purple-400 font-medium mb-4 block">
            My Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            GitHub <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full" />
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Live projects fetched directly from my GitHub repositories
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <FaSpinner className="text-4xl text-purple-500 animate-spin mb-4" />
            <p className="text-gray-400">Loading projects from GitHub...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-20">
            <p className="text-red-400 mb-4">{error}</p>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 rounded-full text-white hover:bg-purple-700 transition-colors"
            >
              <FaGithub />
              View on GitHub
            </a>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group bg-[#1a1a1a] rounded-2xl overflow-hidden border border-gray-800 hover:border-purple-500/50 transition-all"
              >
                {/* Project Header */}
                <div className="relative h-32 bg-gradient-to-br from-purple-600/20 to-cyan-600/20 flex items-center justify-center overflow-hidden">
                  <div className="text-6xl font-bold text-white/10 group-hover:scale-110 transition-transform">
                    {repo.name.charAt(0).toUpperCase()}
                  </div>
                  {repo.language && (
                    <span
                      className="absolute top-3 left-3 px-2 py-1 text-xs font-medium rounded-full border"
                      style={{
                        backgroundColor: `${languageColors[repo.language] || "#6b7280"}20`,
                        borderColor: `${languageColors[repo.language] || "#6b7280"}50`,
                        color: languageColors[repo.language] || "#9ca3af"
                      }}
                    >
                      {repo.language}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent opacity-60" />
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors truncate">
                    {repo.name}
                  </h3>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-2 min-h-[40px]">
                    {repo.description || "No description available"}
                  </p>

                  {/* Topics/Tags */}
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {repo.topics.slice(0, 3).map((topic) => (
                        <span
                          key={topic}
                          className="px-2 py-1 text-xs bg-[#0f0f0f] text-gray-300 rounded-lg border border-gray-800"
                        >
                          {topic}
                        </span>
                      ))}
                      {repo.topics.length > 3 && (
                        <span className="px-2 py-1 text-xs text-gray-500">
                          +{repo.topics.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <FaStar className="text-yellow-500" />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaCodeBranch className="text-cyan-500" />
                      {repo.forks_count}
                    </span>
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3">
                    <motion.a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-[#0f0f0f] rounded-lg text-sm text-gray-300 hover:text-white hover:bg-purple-500/20 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaGithub />
                      Code
                    </motion.a>
                    {repo.homepage && (
                      <motion.a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg text-sm text-white transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaExternalLinkAlt />
                        Live
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <motion.a
            href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-700 rounded-full text-gray-300 hover:text-white hover:border-purple-500 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub size={20} />
            View All Repositories on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
