import { NextResponse } from 'next/server'

interface GitHubRepoNode {
  name: string
  description: string | null
  url: string
  stargazerCount: number
  forkCount: number
  primaryLanguage: { name: string; color: string | null } | null
}

interface GitHubGraphQLResponse {
  data?: {
    viewer: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number
        }
      }
      repositories: {
        nodes: GitHubRepoNode[]
      }
      followers: {
        totalCount: number
      }
      repositoriesContributedTo: {
        totalCount: number
      }
    }
  }
  errors?: Array<{ message: string }>
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN

  if (!token) {
    return NextResponse.json({
      error: true,
      message: 'GitHub token not configured',
    })
  }

  const query = `
    query {
      viewer {
        contributionsCollection {
          contributionCalendar {
            totalContributions
          }
        }
        repositories(first: 6, orderBy: { field: UPDATED_AT, direction: DESC }) {
          nodes {
            name
            description
            url
            stargazerCount
            forkCount
            primaryLanguage {
              name
              color
            }
          }
        }
        followers {
          totalCount
        }
        repositoriesContributedTo(first: 1) {
          totalCount
        }
      }
    }
  `

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      return NextResponse.json({
        error: true,
        message: `GitHub API responded with ${res.status}`,
      })
    }

    const json: GitHubGraphQLResponse = await res.json()

    if (json.errors) {
      return NextResponse.json({
        error: true,
        message: json.errors[0]?.message || 'GraphQL error',
      })
    }

    const viewer = json.data?.viewer
    if (!viewer) {
      return NextResponse.json({
        error: true,
        message: 'No data returned from GitHub',
      })
    }

    const repos: GitHubRepoNode[] = viewer.repositories.nodes
    const allLangs: Record<string, { count: number; color: string }> = {}

    for (const repo of repos) {
      if (repo.primaryLanguage) {
        const name = repo.primaryLanguage.name
        if (!allLangs[name]) {
          allLangs[name] = { count: 0, color: repo.primaryLanguage.color || '#666' }
        }
        allLangs[name].count++
      }
    }

    const topLanguages = Object.entries(allLangs)
      .sort(([, a], [, b]) => b.count - a.count)
      .slice(0, 4)
      .map(([name, data]) => ({ name, count: data.count, color: data.color }))

    const recentRepos = repos.slice(0, 3).map((repo) => ({
      name: repo.name,
      description: repo.description,
      url: repo.url,
      stars: repo.stargazerCount,
      language: repo.primaryLanguage?.name || null,
      forkCount: repo.forkCount,
    }))

    const totalStars = repos.reduce((sum, r) => sum + r.stargazerCount, 0)

    return NextResponse.json({
      contributions: viewer.contributionsCollection.contributionCalendar.totalContributions,
      totalStars,
      followers: viewer.followers.totalCount,
      publicRepos: viewer.repositoriesContributedTo.totalCount,
      topLanguages,
      recentRepos,
    })
  } catch {
    return NextResponse.json({
      error: true,
      message: 'Failed to fetch GitHub data',
    })
  }
}
