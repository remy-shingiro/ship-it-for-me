export const navigationLinks = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Services", href: "/services" },
  { label: "Locations", href: "/locations" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
] as const;

export const valuePoints = [
  "Sourcing from China, Dubai and Uganda",
  "Product research around your request",
  "Supplier coordination through agents",
  "Support for customers in Rwanda",
] as const;

export const processSteps = [
  { number: "01", title: "Tell us what you need", description: "Share a product name, link or image, the quantity you need and any requirements you already know." },
  { number: "02", title: "We assess the request", description: "The team reviews the details and considers what sourcing approach may be available. Not every request can be fulfilled." },
  { number: "03", title: "We explore sourcing options", description: "The team checks possible options through sourcing agents in China, Dubai or Uganda." },
  { number: "04", title: "We coordinate next steps", description: "If an option is available, the team shares relevant details so you can decide how to proceed." },
] as const;

export const sourceCategories = [
  "Electronics", "Machinery", "Auto parts", "Fashion",
  "Household products", "Business supplies", "Specialized products",
] as const;

export const locations = [
  { name: "China", href: "/locations/china", slug: "china", index: "01", description: "Send us a product request for sourcing through our network in China." },
  { name: "Dubai", href: "/locations/dubai", slug: "dubai", index: "02", description: "Send us a product request for sourcing through our network in Dubai." },
  { name: "Uganda", href: "/locations/uganda", slug: "uganda", index: "03", description: "Send us a product request for sourcing through our network in Uganda." },
] as const;

export const serviceBenefits = [
  { title: "Spend less time chasing suppliers", description: "Tell us what you have in mind and we can help explore the sourcing options." },
  { title: "One local point of contact", description: "Discuss your request with a team focused on helping customers in Rwanda." },
  { title: "Explore more than one market", description: "Ask about sourcing through agents in China, Dubai or Uganda." },
  { title: "Understand the next steps", description: "Review the available details before deciding how you want to proceed." },
] as const;

export const serviceCapabilities = [
  { number: "01", title: "Identify the product", description: "Send a product name, online link or image so the team can understand what you are looking for." },
  { number: "02", title: "Share your requirements", description: "Add the quantity, specifications, budget or source country you have in mind. Optional details can be left blank." },
  { number: "03", title: "Explore sourcing options", description: "The team reviews whether options may be available through agents in China, Dubai or Uganda." },
  { number: "04", title: "Review available details", description: "If an option is identified, the team shares relevant information to help you assess it." },
  { number: "05", title: "Discuss next steps", description: "Review the available next steps for your request before deciding how to proceed." },
] as const;

export const aboutPrinciples = [
  { number: "01", title: "Understand the request", description: "Start with the product, quantity and requirements the customer shares." },
  { number: "02", title: "Clarify the details", description: "Review the information provided and identify what else may be useful to know." },
  { number: "03", title: "Explore sourcing options", description: "Determine whether there is an appropriate approach to explore through the sourcing network." },
  { number: "04", title: "Communicate and coordinate", description: "Share relevant information and discuss the next steps available for that request." },
] as const;

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
  configuredContactOnly?: "whatsapp";
};

export const faqCategories = [
  {
    id: "general",
    title: "General",
    items: [
      { id: "what-we-do", question: "What does the sourcing service do?", answer: "You describe a product you want. The team reviews your request and explores whether a sourcing option may be available through its network." },
      { id: "who-can-use", question: "Who can use the service?", answer: "The service is for customers in Rwanda who want to explore product sourcing options from China, Dubai or Uganda." },
      { id: "source-countries", question: "Which countries can you source from?", answer: "You can submit requests for sourcing through China, Dubai or Uganda." },
    ],
  },
  {
    id: "requests",
    title: "Product requests",
    items: [
      { id: "how-to-request", question: "How do I request a product?", answer: "Use the Request a Quote form. Add the product name, quantity and any useful details, then choose how you prefer to be contacted." },
      { id: "product-link", question: "Can I send a product link?", answer: "Yes. Add the link to your request so the team can see which product you mean. You can also include specifications or other requirements." },
      { id: "product-image", question: "Can I send a product image?", answer: "Yes. The request form accepts up to five JPG, PNG or WebP images, up to 5 MB each." },
      { id: "multiple-products", question: "Can I request more than one product?", answer: "The form is set up for one product per request. Send a separate request for each different product so the details stay clear." },
      { id: "request-details", question: "What information should I provide?", answer: "Share what you know: the product name or link, quantity, specifications, preferred source country, budget, timeline and any other requirements. Optional details can be left blank." },
      { id: "supplier-known", question: "Do I need to know the supplier?", answer: "No. Start with the product details you have. The team will review the request and determine whether there is a sourcing approach to explore." },
    ],
  },
  {
    id: "pricing",
    title: "Pricing",
    items: [
      { id: "request-fee", question: "Is there a fee to submit a request?", answer: "The form collects details for review. Ask the team to confirm whether any fee applies to your specific request before proceeding." },
      { id: "pricing-work", question: "How does pricing work?", answer: "Product and sourcing costs depend on the request and the option available. Confirm the applicable costs with the team before deciding whether to proceed." },
    ],
  },
  {
    id: "process",
    title: "The process",
    items: [
      { id: "after-submit", question: "What happens after I submit a request?", answer: "The team reviews the product details and sourcing preferences, then contacts you using your preferred contact method to discuss what options may be available." },
      { id: "contact-method", question: "How will you contact me?", answer: "Choose your preferred contact method in the form and provide the matching contact details. The team will use the information you submit." },
      { id: "not-available", question: "What if a product cannot be sourced?", answer: "Not every request can be fulfilled. If the team cannot identify an option for your request, it will explain what it can and you can decide whether to explore another option." },
    ],
  },
  {
    id: "contact",
    title: "Contact",
    items: [
      { id: "contact-team", question: "How can I contact the team?", answer: "Send your details through the Request a Quote form and choose a preferred contact method. The team can review the request and follow up using the details you provide." },
      { id: "whatsapp", question: "Can I use WhatsApp?", answer: "If WhatsApp is offered as a contact option in the request form, you can select it as your preference.", configuredContactOnly: "whatsapp" },
    ],
  },
] as const satisfies readonly { id: string; title: string; items: readonly FAQItem[] }[];

const homepageFaqIds = new Set(["source-countries", "product-link", "product-image", "multiple-products", "after-submit"]);

export function getFaqCategories(whatsappConfigured: boolean) {
  return faqCategories
    .map((category) => ({
      ...category,
      items: category.items.filter((item) => !("configuredContactOnly" in item) || item.configuredContactOnly !== "whatsapp" || whatsappConfigured),
    }))
    .filter((category) => category.items.length > 0);
}

export function getHomepageFaqs(whatsappConfigured: boolean) {
  return getFaqCategories(whatsappConfigured)
    .flatMap((category) => category.items)
    .filter((item) => homepageFaqIds.has(item.id));
}

export type ProcessStepItem = (typeof processSteps)[number];
export type SourcingLocation = (typeof locations)[number];
