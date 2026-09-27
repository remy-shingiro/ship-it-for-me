import { locations, type FAQItem } from "../content";

type LocationSlug = (typeof locations)[number]["slug"];

type LocationPageContent = {
  title: string;
  description: string;
  heroDescription: string;
  detailTitle: string;
  detailDescription: string;
  faqs: readonly FAQItem[];
};

export const locationRequestDetails = [
  "Product name",
  "Product link",
  "Product image",
  "Quantity",
  "Specifications",
  "Budget",
  "Timeline",
  "Other requirements",
] as const;

const contentByLocation = {
  china: {
    title: "Source products from China",
    description: "Submit a product request for sourcing through China. Share the details you have so the team can review the request and determine an appropriate next step.",
    heroDescription: "Customers in Rwanda can submit product requests for sourcing through the company’s network in China. The team reviews each request; submitting one does not guarantee that a product can be sourced.",
    detailTitle: "What to include in a China product request",
    detailDescription: "Start with the information you already have. A product link or image can help clarify what you are looking for, and optional details can be added as needed.",
    faqs: [
      { id: "china-link", question: "Can I provide a Chinese product link?", answer: "Yes. Add the link to your request along with any details that identify the product or its specifications." },
      { id: "china-online", question: "Can I request a product I found online?", answer: "Yes. Include the product page link or an image, plus any requirements that matter to you." },
      { id: "china-quantity", question: "Can I request a specific quantity?", answer: "Yes. Include the quantity you have in mind. The team will review it as part of the request." },
      { id: "china-details", question: "What information should I provide?", answer: "Share a product name or link, quantity, specifications and any other requirements. Budget and timeline are optional." },
    ],
  },
  dubai: {
    title: "Source products from Dubai",
    description: "Submit a product request for sourcing through Dubai. Product details help the team assess the request and explore whether an option may be available.",
    heroDescription: "Customers in Rwanda can submit product requests for sourcing through the company’s network in Dubai. The team reviews each request; submitting one does not guarantee that a product can be sourced.",
    detailTitle: "What to include in a Dubai product request",
    detailDescription: "Provide the product information you have. Use the optional fields for specifications, budget, timeline or other requirements that may help explain your request.",
    faqs: [
      { id: "dubai-link", question: "Can I share a product link for something in Dubai?", answer: "Yes. Add the link to your request and include any product details or specifications you already know." },
      { id: "dubai-online", question: "Can I request a product I found online?", answer: "Yes. A product page link or image can help identify what you have in mind." },
      { id: "dubai-quantity", question: "Can I request a specific quantity?", answer: "Yes. Enter the quantity you are interested in and the team can consider it while reviewing the request." },
      { id: "dubai-details", question: "What information should I provide?", answer: "Share a product name or link, quantity, specifications and any other requirements. Budget and timeline are optional." },
    ],
  },
  uganda: {
    title: "Source products from Uganda",
    description: "Submit a product request for sourcing through Uganda. The team reviews the product details and determines whether there is a suitable sourcing approach to explore.",
    heroDescription: "Customers in Rwanda can submit product requests for sourcing through the company’s network in Uganda. The team reviews each request; submitting one does not guarantee that a product can be sourced.",
    detailTitle: "What to include in a Uganda product request",
    detailDescription: "Share the product details you have, including quantity and any important specifications. You can add a link or image to help clarify the request.",
    faqs: [
      { id: "uganda-link", question: "Can I share a product link for something in Uganda?", answer: "Yes. Add a link if you have one and include any details that help identify the product." },
      { id: "uganda-online", question: "Can I request a product I found online?", answer: "Yes. Share the product page link or an image with any requirements that matter to you." },
      { id: "uganda-quantity", question: "Can I request a specific quantity?", answer: "Yes. Include the quantity you have in mind so it can be considered during the request review." },
      { id: "uganda-details", question: "What information should I provide?", answer: "Share a product name or link, quantity, specifications and any other requirements. Budget and timeline are optional." },
    ],
  },
} as const satisfies Record<LocationSlug, LocationPageContent>;

export const locationPages = locations.map((location) => ({
  ...location,
  ...contentByLocation[location.slug],
}));

export type LocationPageData = (typeof locationPages)[number];
