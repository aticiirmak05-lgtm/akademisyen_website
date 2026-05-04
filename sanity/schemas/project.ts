const project = {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "UI/UX", value: "ui-ux" },
          { title: "3D & Game", value: "3d-game" },
          { title: "AI & Automation", value: "ai-automation" },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "mainImage",
      title: "Main Image (Cover)",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "previewVideo",
      title: "Preview Video (Hover Loop)",
      type: "file",
      description: "Short silent video shown on card hover. Keep under 10MB.",
      options: { accept: "video/*" },
    },
    {
      name: "gallery",
      title: "Gallery (Process & Result Images)",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "caption",
              title: "Caption",
              type: "string",
            },
            {
              name: "role",
              title: "Role",
              type: "string",
              options: {
                list: [
                  { title: "Process / System Schema", value: "process" },
                  { title: "Final Render / Result", value: "result" },
                ],
              },
            },
          ],
        },
      ],
    },
    {
      name: "techStack",
      title: "Tech Stack",
      description: "Primary tools & technologies (e.g. Figma, Unreal Engine, n8n)",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    },
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
    },
    {
      name: "tools",
      title: "Tools Used (legacy)",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    },
    {
      name: "problem",
      title: "Problem",
      type: "text",
      rows: 4,
    },
    {
      name: "solution",
      title: "Solution",
      type: "text",
      rows: 4,
    },
    {
      name: "result",
      title: "Result",
      type: "text",
      rows: 4,
    },
    {
      name: "projectURL",
      title: "Project URL",
      type: "url",
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
    },
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
};

export default project;
