import { mockProjects, mockLabItems, mockProfile } from "./mock-data";

// This module provides data to the app.
// When Sanity is configured (NEXT_PUBLIC_SANITY_PROJECT_ID is set),
// it fetches from Sanity CMS. Otherwise, it uses mock data for development.

const isSanityConfigured =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "your-project-id";

export async function getProjects() {
  if (isSanityConfigured) {
    const { getProjects: fetchProjects } = await import("@/sanity/queries");
    return fetchProjects();
  }
  return mockProjects;
}

export async function getLabItems() {
  if (isSanityConfigured) {
    const { getLabItems: fetchLab } = await import("@/sanity/queries");
    return fetchLab();
  }
  return mockLabItems;
}

export async function getProfile() {
  if (isSanityConfigured) {
    const { getProfile: fetchProfile } = await import("@/sanity/queries");
    return fetchProfile();
  }
  return mockProfile;
}
