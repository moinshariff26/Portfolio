export interface GitHubRepo {
  name: string
  description: string | null
  url: string
  stars: number
  language: string | null
  forkCount: number
}

export interface GitHubData {
  contributions: number
  totalStars: number
  followers: number
  publicRepos: number
  topLanguages: { name: string; count: number; color: string }[]
  recentRepos: GitHubRepo[]
}

export const mockGitHubData: GitHubData = {
  contributions: 487,
  totalStars: 12,
  followers: 8,
  publicRepos: 16,
  topLanguages: [
    { name: "Python", count: 5, color: "#3776AB" },
    { name: "JavaScript", count: 4, color: "#F7DF1E" },
    { name: "TypeScript", count: 3, color: "#3178C6" },
    { name: "Java", count: 2, color: "#007396" },
  ],
  recentRepos: [
    {
      name: "portfolio",
      description: "System dashboard portfolio built with Next.js 14",
      url: "https://github.com/moinshariff26/portfolio",
      stars: 2,
      language: "TypeScript",
      forkCount: 0,
    },
    {
      name: "TradeNexus-AI",
      description: "AI-Powered Financial Analysis Platform",
      url: "https://github.com/moinshariff26/TradeNexus-AI",
      stars: 3,
      language: "Python",
      forkCount: 1,
    },
    {
      name: "OCR-Translator",
      description: "Multilingual OCR and translation web app",
      url: "https://github.com/moinshariff26/OCR-Translator",
      stars: 1,
      language: "Python",
      forkCount: 0,
    },
  ],
}
