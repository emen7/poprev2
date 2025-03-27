import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
        ui: {
          // This is an DEMO router. You can remove this to fit your site
          router: ({ document }) => `/demo/blog/${document._sys.filename}`,
        },
      },
      // Scientific Document Collection
      {
        name: "scientific",
        label: "Scientific Documents",
        path: "content/raw/scientific/markdown",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "author",
            label: "Author",
          },
          {
            type: "datetime",
            name: "date",
            label: "Publication Date",
          },
          {
            type: "string",
            name: "categories",
            label: "Categories",
            list: true,
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },
          {
            type: "rich-text",
            name: "abstract",
            label: "Abstract",
          },
          {
            type: "object",
            name: "citations",
            label: "Citations",
            list: true,
            fields: [
              {
                name: "citationKey",
                label: "Citation Key",
                type: "string",
              },
              {
                name: "authors",
                label: "Authors",
                type: "string",
              },
              {
                name: "title",
                label: "Title",
                type: "string",
              },
              {
                name: "journal",
                label: "Journal/Source",
                type: "string",
              },
              {
                name: "year",
                label: "Year",
                type: "number",
              },
              {
                name: "doi",
                label: "DOI",
                type: "string",
              },
            ],
          },
          {
            type: "object",
            name: "figures",
            label: "Figures",
            list: true,
            fields: [
              {
                name: "caption",
                label: "Caption",
                type: "string",
              },
              {
                name: "image",
                label: "Image",
                type: "image",
              },
              {
                name: "altText",
                label: "Alt Text",
                type: "string",
              },
            ],
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
        ui: {
          router: ({ document }) => `/scientific/${document._sys.filename}`,
        },
      },
      // Perplexity Document Collection
      {
        name: "perplexity",
        label: "Perplexity Documents",
        path: "content/raw/perplexity",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "author",
            label: "Author",
          },
          {
            type: "datetime",
            name: "date",
            label: "Publication Date",
          },
          {
            type: "string",
            name: "categories",
            label: "Categories",
            list: true,
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },
          {
            type: "string",
            name: "question",
            label: "Original Question",
            required: true,
          },
          {
            type: "object",
            name: "responses",
            label: "Responses",
            list: true,
            fields: [
              {
                name: "responseText",
                label: "Response Text",
                type: "rich-text",
              },
              {
                name: "sources",
                label: "Sources",
                type: "string",
                list: true,
              },
            ],
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
        ui: {
          router: ({ document }) => `/perplexity/${document._sys.filename}`,
        },
      },
      // Lectionary Document Collection
      {
        name: "lectionary",
        label: "Lectionary Documents",
        path: "content/raw/lectionary",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "author",
            label: "Author",
          },
          {
            type: "datetime",
            name: "date",
            label: "Publication Date",
          },
          {
            type: "string",
            name: "categories",
            label: "Categories",
            list: true,
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },
          {
            type: "object",
            name: "scriptureReferences",
            label: "Scripture References",
            list: true,
            fields: [
              {
                name: "book",
                label: "Book",
                type: "string",
              },
              {
                name: "chapter",
                label: "Chapter",
                type: "number",
              },
              {
                name: "verses",
                label: "Verses",
                type: "string",
              },
            ],
          },
          {
            type: "string",
            name: "liturgicalSeason",
            label: "Liturgical Season",
            options: [
              "Advent",
              "Christmas",
              "Epiphany",
              "Lent",
              "Easter",
              "Pentecost",
              "Ordinary Time",
            ],
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
        ui: {
          router: ({ document }) => `/lectionary/${document._sys.filename}`,
        },
      },
    ],
  },
});
