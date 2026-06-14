import { profile, skills, projects, experience } from '@/lib/data'

export async function GET() {
  return Response.json({
    name: profile.name,
    role: profile.role,
    tagline: profile.tagline,
    status: profile.status,
    availability: profile.availability,
    location: profile.location,
    stack: skills.map(s => s.name),
    projectCount: projects.length,
    skillCount: skills.length,
    links: {
      github: profile.github,
      linkedin: profile.linkedin,
    },
    projects: projects.map(p => ({
      name: p.name,
      stack: p.stack,
      featured: p.featured,
    })),
    experience: experience.map(e => ({
      role: e.role,
      company: e.company,
      client: e.client,
      duration: e.duration,
    })),
    meta: {
      endpoint: "/api/profile",
      contentType: "application/json",
      curlExample: "curl https://yourdomain.com/api/profile",
    }
  })
}
