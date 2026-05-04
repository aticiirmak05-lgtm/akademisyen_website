const lab = {
  name: "lab",
  title: "Lab",
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
    },
    {
      name: "workflowImage",
      title: "Workflow Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
    },
    {
      name: "toolsUsed",
      title: "Tools Used",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    },
    {
      name: "processSteps",
      title: "Process Steps",
      type: "array",
      of: [{ type: "string" }],
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

export default lab;
