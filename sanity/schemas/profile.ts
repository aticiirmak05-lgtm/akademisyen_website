const profile = {
  name: "profile",
  title: "Profile",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "tagline",
      title: "Tagline",
      type: "string",
    },
    {
      name: "bio",
      title: "Bio",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "education",
      title: "Education",
      type: "string",
    },
    {
      name: "gpa",
      title: "GPA",
      type: "string",
    },
    {
      name: "skills",
      title: "Skills",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    },
    {
      name: "resumePDF",
      title: "Resume PDF",
      type: "file",
      options: {
        accept: ".pdf",
      },
    },
    {
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        { name: "linkedin", title: "LinkedIn", type: "url" },
        { name: "github", title: "GitHub", type: "url" },
        { name: "email", title: "Email", type: "string" },
        { name: "twitter", title: "Twitter / X", type: "url" },
        { name: "behance", title: "Behance", type: "url" },
      ],
    },
    {
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      options: { hotspot: true },
    },
  ],
};

export default profile;
