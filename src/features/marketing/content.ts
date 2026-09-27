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
  { number: "01", title: "Tell us what you need", description: "Share the product, quantity and any useful details you have." },
  { number: "02", title: "We review your request", description: "We look at the product and the sourcing requirements you describe." },
  { number: "03", title: "We explore sourcing options", description: "Our agents help us check options in the market you selected." },
  { number: "04", title: "We discuss next steps", description: "We talk through the quotation and arrangements for getting it to Rwanda." },
] as const;

export const sourceCategories = [
  "Electronics", "Machinery", "Auto parts", "Fashion",
  "Household products", "Business supplies", "Specialized products",
] as const;

export const locations = [
  { name: "China", href: "/locations/china", slug: "china", index: "01", description: "Connect with our sourcing network in China." },
  { name: "Dubai", href: "/locations/dubai", slug: "dubai", index: "02", description: "Connect with our sourcing network in Dubai." },
  { name: "Uganda", href: "/locations/uganda", slug: "uganda", index: "03", description: "Connect with our sourcing network in Uganda." },
] as const;

export const serviceBenefits = [
  { title: "Spend less time chasing suppliers", description: "Tell us what you have in mind and we can help explore the sourcing options." },
  { title: "One local point of contact", description: "Discuss your request with a team focused on helping customers in Rwanda." },
  { title: "Explore more than one market", description: "Ask about sourcing through agents in China, Dubai or Uganda." },
  { title: "Understand the next steps", description: "Review the available details before deciding how you want to proceed." },
] as const;

export const faqs = [
  { question: "What can I ask you to source?", answer: "You can ask us to look into a product you have in mind. We review each request before confirming whether and how we can help." },
  { question: "Which countries can you source from?", answer: "Our sourcing network includes China, Dubai and Uganda." },
  { question: "How do I request a product?", answer: "Use the Request a Quote link and share the product, quantity and any useful details. A product link can help identify what you mean." },
  { question: "Can I provide a product link?", answer: "Yes. A link is a useful reference. You can also describe the product and its important requirements." },
  { question: "Can I send a product image?", answer: "If a photo is important, mention that in your request and we can confirm the best way to share it." },
  { question: "How does the quotation process work?", answer: "We review the product details and sourcing preferences, then contact you to discuss options and a quotation. Costs and arrangements depend on the product and route." },
  { question: "How will you contact me?", answer: "You can tell us whether you prefer WhatsApp, a phone call or email when making your request." },
] as const;

export type ProcessStepItem = (typeof processSteps)[number];
export type SourcingLocation = (typeof locations)[number];
