import { client } from "./client";

// ── Project Queries ──
export async function getProjects() {
  return client.fetch(
    `*[_type == "project"] | order(order asc) {
      _id,
      title,
      slug,
      category,
      mainImage,
      "previewVideoUrl": previewVideo.asset->url,
      gallery[] {
        ...,
        "url": asset->url,
        caption,
        role
      },
      techStack,
      shortDescription,
      tools,
      problem,
      solution,
      result,
      projectURL,
      description
    }`
  );
}

export async function getProjectBySlug(slug: string) {
  return client.fetch(
    `*[_type == "project" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      category,
      mainImage,
      "previewVideoUrl": previewVideo.asset->url,
      gallery[] {
        ...,
        "url": asset->url,
        caption,
        role
      },
      techStack,
      shortDescription,
      tools,
      problem,
      solution,
      result,
      projectURL,
      description
    }`,
    { slug }
  );
}

// ── Lab Queries ──
export async function getLabItems() {
  return client.fetch(
    `*[_type == "lab"] | order(order asc) {
      _id,
      title,
      slug,
      workflowImage,
      shortDescription,
      toolsUsed,
      processSteps
    }`
  );
}

// ── Profile Queries ──
export async function getProfile() {
  return client.fetch(
    `*[_type == "profile"][0] {
      name,
      tagline,
      bio,
      education,
      skills,
      "resumeURL": resumePDF.asset->url,
      socialLinks,
      profileImage
    }`
  );
}

