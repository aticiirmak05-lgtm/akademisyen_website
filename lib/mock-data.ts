// Mock data — used when Sanity is not configured

export const mockProjects = [
  {
    _id: "1",
    title: "Nuvora — E-Commerce Platform",
    slug: { current: "nuvora" },
    category: "ui-ux",
    mainImage: null,
    previewVideoUrl: null,
    gallery: [],
    techStack: ["Figma", "Next.js", "Tailwind CSS", "Framer Motion"],
    shortDescription:
      "Premium e-commerce experience with editorial design language, curated product grids, and seamless checkout flow.",
    tools: ["Figma", "Next.js", "Tailwind CSS", "Framer Motion"],
    problem:
      "Traditional e-commerce platforms feel cluttered and overwhelming, leading to decision fatigue and low conversion rates.",
    solution:
      "Designed a minimalist, editorial-style storefront with intentional whitespace, curated product presentation, and a distraction-free checkout experience.",
    result:
      "42% improvement in user engagement metrics and a 28% increase in conversion rate during A/B testing.",
    projectURL: "https://nuvora.design",
    description: null,
  },
  {
    _id: "2",
    title: "VERA Estate — Property Platform",
    slug: { current: "vera-estate" },
    category: "ui-ux",
    mainImage: null,
    previewVideoUrl: null,
    gallery: [],
    techStack: ["Figma", "React", "TypeScript", "Mapbox", "Three.js"],
    shortDescription:
      "Luxury real estate platform with advanced filtering, virtual tours, and premium property presentation.",
    tools: ["Figma", "React", "TypeScript", "Mapbox", "Three.js"],
    problem:
      "Existing real estate platforms lack the premium feel that luxury property buyers expect.",
    solution:
      "Created an immersive property browsing experience with 3D virtual tours, advanced region-based filtering, and editorial-quality property pages.",
    result:
      "Platform selected by 3 luxury real estate agencies for pilot testing. Average session duration increased by 3.2x.",
    projectURL: "https://vera-estate.co",
    description: null,
  },
  {
    _id: "3",
    title: "BrandOS — AI Brand System",
    slug: { current: "brandos" },
    category: "ai-automation",
    mainImage: null,
    previewVideoUrl: null,
    gallery: [],
    techStack: ["n8n", "GPT-4", "Next.js", "Sanity", "Vercel AI SDK"],
    shortDescription:
      "AI-powered brand management platform automating identity generation, social distribution, and analytics.",
    tools: ["n8n", "GPT-4", "Next.js", "Sanity", "Vercel AI SDK"],
    problem:
      "Small businesses spend 40+ hours monthly on brand consistency and social media content creation.",
    solution:
      "Built an automated pipeline using n8n + GPT-4 that generates platform-specific content, maintains brand voice, and distributes across 6 social channels.",
    result:
      "Reduced content creation time by 85%. System handles 500+ automated posts monthly across pilot accounts.",
    projectURL: null,
    description: null,
  },
  {
    _id: "4",
    title: "Antigravity — Physics Sandbox",
    slug: { current: "antigravity" },
    category: "3d-game",
    mainImage: null,
    previewVideoUrl: null,
    gallery: [],
    techStack: ["Unreal Engine 5", "Blender", "Niagara VFX", "C++"],
    shortDescription:
      "Interactive 3D physics playground exploring zero-gravity mechanics with real-time particle systems.",
    tools: ["Unreal Engine 5", "Blender", "Niagara VFX", "C++"],
    problem:
      "Physics-based games often lack visual polish and intuitive controls for casual players.",
    solution:
      "Designed an accessible zero-gravity sandbox with gesture-based controls, real-time particle effects, and a progressive difficulty system.",
    result:
      "Featured in university game showcase. 200+ downloads during first week of itch.io release.",
    projectURL: null,
    description: null,
  },
  {
    _id: "5",
    title: "Workflow Architect — n8n Templates",
    slug: { current: "workflow-architect" },
    category: "ai-automation",
    mainImage: null,
    previewVideoUrl: null,
    gallery: [],
    techStack: ["n8n", "Webhook", "OpenAI API", "Google Sheets", "Slack"],
    shortDescription:
      "Library of production-ready n8n workflow templates for content automation, data pipelines, and AI integration.",
    tools: ["n8n", "Webhook", "OpenAI API", "Google Sheets", "Slack"],
    problem:
      "Setting up complex automation workflows from scratch is time-consuming and error-prone.",
    solution:
      "Created a modular template library with pre-built error handling, retry logic, and documentation for common automation patterns.",
    result:
      "12 workflow templates published. Used by 50+ creators for their automation setups.",
    projectURL: null,
    description: null,
  },
  {
    _id: "6",
    title: "Aurelis — Luxury Watch Landing",
    slug: { current: "aurelis" },
    category: "ui-ux",
    mainImage: null,
    previewVideoUrl: null,
    gallery: [],
    techStack: ["Next.js", "GSAP", "Framer Motion", "Figma"],
    shortDescription:
      "Cinematic landing page for a luxury watch brand with parallax storytelling and premium motion design.",
    tools: ["Next.js", "GSAP", "Framer Motion", "Figma"],
    problem:
      "Luxury brands struggle to translate their physical premium experience into digital touchpoints.",
    solution:
      "Designed a scroll-driven narrative experience with cinematic transitions, parallax depth, and editorial typography.",
    result:
      "Client approved design in first presentation. Lighthouse performance score: 96/100.",
    projectURL: null,
    description: null,
  },
];

export const mockLabItems = [
  {
    _id: "lab-1",
    title: "AI Content Pipeline — Blog to Social",
    slug: { current: "ai-content-pipeline" },
    workflowImage: null,
    shortDescription:
      "Automated workflow that transforms long-form blog posts into platform-optimized social media content using GPT-4 and n8n.",
    toolsUsed: ["n8n", "GPT-4", "Buffer API", "Webhook"],
    processSteps: [
      "Blog post webhook trigger",
      "Content analysis & key points extraction",
      "Platform-specific formatting (Twitter threads, LinkedIn, Instagram)",
      "Automated scheduling via Buffer API",
      "Performance tracking & iteration",
    ],
  },
  {
    _id: "lab-2",
    title: "Design System Generator",
    slug: { current: "design-system-generator" },
    workflowImage: null,
    shortDescription:
      "AI-assisted tool that generates complete design tokens (colors, typography, spacing) from a single brand mood board.",
    toolsUsed: ["Python", "OpenAI Vision API", "Figma Plugin API"],
    processSteps: [
      "Upload brand mood board images",
      "AI color extraction & harmony analysis",
      "Typography pairing suggestion engine",
      "Spacing scale generation based on golden ratio",
      "Auto-export to Figma variables",
    ],
  },
  {
    _id: "lab-3",
    title: "Smart Email Responder",
    slug: { current: "smart-email-responder" },
    workflowImage: null,
    shortDescription:
      "n8n workflow that categorizes incoming emails, drafts contextual responses, and routes to appropriate team members.",
    toolsUsed: ["n8n", "Gmail API", "GPT-4", "Notion API"],
    processSteps: [
      "Email ingestion via IMAP",
      "Intent classification (inquiry, support, partnership)",
      "Context retrieval from knowledge base",
      "Draft generation with brand voice",
      "Human review queue in Notion",
    ],
  },
  {
    _id: "lab-4",
    title: "Procedural Terrain Generator",
    slug: { current: "procedural-terrain" },
    workflowImage: null,
    shortDescription:
      "Real-time procedural terrain generation system using noise algorithms and GPU compute shaders in Unreal Engine.",
    toolsUsed: ["Unreal Engine 5", "HLSL", "Blender", "World Machine"],
    processSteps: [
      "Multi-octave Perlin noise generation",
      "Biome distribution based on altitude & moisture maps",
      "LOD system for real-time performance",
      "Foliage scattering with GPU instancing",
      "Runtime erosion simulation",
    ],
  },
];

export const mockProfile = {
  name: "Irmak Atıcı",
  tagline: "Communication Designer & System Architect",
  bio: null,
  education: "Yıldız Teknik Üniversitesi — İletişim Tasarımı",
  skills: [
    "UI/UX Design",
    "Figma",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "n8n",
    "AI Automation",
    "Three.js",
    "Unreal Engine",
    "Blender",
    "Adobe Suite",
    "Sanity CMS",
  ],
  resumeURL: null,
  socialLinks: {
    linkedin: "https://linkedin.com/in/irmak-atici",
    github: "https://github.com/irmak-atici",
    email: "hello@irmakatici.com",
  },
  profileImage: null,
};
