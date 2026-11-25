/**
 * =========================================================================
 * PHOTOGRAPHER TEMPLATE CONFIGURATION (src/config/siteConfig.ts)
 * =========================================================================
 * 
 * When you get a new job from a different photographer, you ONLY need to
 * edit this file and replace the images in the `public/images/` folder!
 *
 * All text, titles, logos, phone numbers, WhatsApp links, gallery photos,
 * tours, and FAQs across the entire website will update automatically!
 * =========================================================================
 */

export interface SiteConfig {
  brand: {
    name: string;
    nameSecondary: string;
    tagline: string;
    logo: string;
    menuImage?: string;
    seoTitle: string;
    seoDescription: string;
  };
  contact: {
    phone: string;
    whatsappNumber: string; // international format without + (e.g. "94776311184" or "15551234567")
    whatsappMessage: string;
    email: string;
    address: string;
    instagram: string;
    facebook: string;
    youtube?: string;
  };
  hero: {
    tag: string;
    title: string;
    subtitle: string;
    description: string;
    image: string; // The primary hero background image (e.g. /images/carasol_image.jpg)
    images?: string[]; // Multiple carousel slides (e.g. ['/images/carasol_image.jpg', '/images/carasol_image2.jpg'])
    ctaText: string;
    ctaLink: string;
  };
  about: {
    badge: string;
    title: string;
    description: string;
    heroImage?: string;
    overviewImage?: string;
    stats: Array<{ number: string; label: string }>;
    countries: Array<{ name: string; flag: string }>;
  };
  tours: Array<{
    title: string;
    subtitle: string;
    date: string;
    destination: string;
    image: string;
    flag: string;
    tag: string;
  }>;
  services: Array<{
    num: string;
    title: string;
    description: string;
    image: string;
  }>;
  spotlight: Array<{
    name: string;
    location: string;
    image: string;
    category: string;
    description: string;
    slug?: string;
    images?: string[];
  }>;
  portfolioItems?: Array<{
    title: string;
    slug: string;
    image: string;
    category: string;
    country?: string;
    flag?: string;
  }>;
  cinematographyItems?: Array<{
    title: string;
    category: string;
    image: string;
    videoUrl: string;
  }>;
  portfolioStories?: Array<{
    slug: string;
    title: string;
    category: string;
    location: string;
    coverImage: string;
    galleryImages: string[];
    related?: Array<{
      title: string;
      slug: string;
      image: string;
      category: string;
      location?: string;
    }>;
  }>;
  booking: {
    badge: string;
    title: string;
    description: string;
    image: string;
    images?: string[];
  };
  testimonials: Array<{
    name: string;
    origin: string;
    image: string;
    quote: string;
  }>;
  ctaBanner: {
    tag: string;
    title: string;
    titleAccent: string;
    description: string;
    image: string;
    ctaText: string;
  };
  insights: Array<{
    title: string;
    tag: string;
    excerpt: string;
    image: string;
    readTime: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export const siteConfig: SiteConfig = {
  brand: {
    name: "MiE Weddings",
    nameSecondary: "",
    tagline: "World-Class Wedding Photography, Wherever Love Takes You",
    logo: "/images/gemini-svg.svg",
    menuImage: "/images/cta_03y.jpg",
    seoTitle: "MiE Weddings - World-Class Wedding Photography, Wherever Love Takes You",
    seoDescription: "World-class destination wedding photography and videography capturing timeless romance across borders.",
  },

  contact: {
    phone: "",
    whatsappNumber: "+94 78 379 3366",
    whatsappMessage: "Hello! I would like to inquire about wedding photography availability and packages.",
    email: "studio.mie@outlook.com",
    address: "MiE Weddings, Colombo",
    instagram: "https://www.instagram.com/mie_weddings/",
    facebook: "https://www.facebook.com/mieweddings",
    youtube: "",
  },

  hero: {
    tag: "Destination Wedding Artists",
    title: "World-Class Wedding Photography,",
    subtitle: "Wherever Love Takes You",
    description: "Capturing timeless romance and raw emotion across the world’s most breathtaking destinations.",
    image: "/images/carasol_image.jpg", // Primary fallback
    ctaText: "Reserve Your Date",
    ctaLink: "#booking",
  },

  about: {
    badge: "Beyond Borders",
    title: "Crafting Timeless Wedding Stories Across the World",
    description: "We specialize in capturing the elegance and emotion of your wedding, no matter where it takes place. From exotic island landscapes to stunning destinations worldwide, we are here to make your special moments unforgettable with world-class photography and a personal touch.",
    heroImage: "/images/about_hero.jpg",
    overviewImage: "/images/about_overview.jpg",
    stats: [
      { number: "12+", label: "Countries Toured" },
      { number: "650+", label: "Weddings Captured" },
      { number: "100%", label: "Bespoke Curation" },
      { number: "15+", label: "Industry Accolades" },
    ],
    countries: [
      { name: "United Kingdom", flag: "/images/flag_uk.jpg" },
      { name: "Singapore", flag: "/images/flag_singapore.jpg" },
      { name: "Italy", flag: "/images/flag_italy.png" },
      { name: "South Africa", flag: "/images/flag_sa.png" },
      { name: "Qatar", flag: "/images/flag_qatar.svg" },
      { name: "Spain", flag: "/images/flag_spain.svg" },
      { name: "Switzerland", flag: "/images/flag_swiss.png" },
      { name: "Sri Lanka", flag: "/images/flag_sl.png" },
    ],
  },

  tours: [
    {
      title: "Ciao Italy",
      subtitle: "Make your love story timeless in this Winter",
      date: "Dec 10 — 17 Dec",
      destination: "Rome • Florence • Venice • Amalfi",
      image: "/images/tour_italy.jpg",
      flag: "/images/flag_italy.png",
      tag: "Limited Dates",
    },
    {
      title: "SWISS TOUR",
      subtitle: "Lenses Set to Capture Love in",
      date: "Aug 08 — 11 Aug",
      destination: "Zermatt • Interlaken • Lucerne • Zurich",
      image: "/images/tour_swiss.jpg",
      flag: "/images/flag_swiss.png",
      tag: "Exclusive Slots",
    },
  ],

  services: [
    {
      num: "01",
      title: "Wedding Photography",
      description: "Elegantly composed and natural images that reflect your unique love story. With a focus on both candid and classic shots, we capture the essence of your celebration, ensuring that each moment is remembered as vividly as it was lived.",
      image: "/images/service_weddings.avif",
    },
    {
      num: "02",
      title: "Destination Weddings",
      description: "On-location photography, capturing every breathtaking view and special moment. From tropical beaches to enchanting historical destinations worldwide, our team creates an immersive photography experience that enhances the beauty and emotion of your day.",
      image: "/images/service_destinational.avif",
    },
    {
      num: "03",
      title: "International Availability",
      description: "With curated travel schedules across Europe, Asia, the Middle East, and beyond, our travel-ready visual crew delivers seamless logistics, flight itineraries, and multi-day coverage tailored specifically for international couples.",
      image: "/images/service_international.avif",
    },
    {
      num: "04",
      title: "Signature Heritage",
      description: "Blending rich hospitality, fine-art lighting mastery, and haute-couture editorial sensibilities into every frame we deliver to create lifelong family heirlooms.",
      image: "/images/heritage.avif",
    },
  ],

  spotlight: [
    {
      name: "Shalin & Shuha",
      slug: "shalin-shuha",
      location: "SL",
      image: "/images/spotlight_1.jpg",
      category: "Casual Shoot",
      description: "An intimate sun-drenched ceremony amidst ancient mosque architecture and classical cobblestone charm.",
      images: [
        "/images/stories/Shalin-Shuha/1.1.jpg",
        "/images/stories/Shalin-Shuha/1.2.jpg",
        "/images/stories/Shalin-Shuha/1.3.jpg",
        "/images/stories/Shalin-Shuha/1.4.jpg",
        "/images/stories/Shalin-Shuha/1.5.jpg",
      ],
    },
    {
      name: "Akila & Nisansala",
      slug: "akila-nisansala",
      location: "SL",
      image: "/images/spotlight_2.jpg",
      category: "Fine Art Celebration",
      description: "Renaissance romance framed against panoramic Tuscan hills and historic stone villa estates.",
      images: [
        "/images/stories/Akila-Nisansala/2.1.jpg",
        "/images/stories/Akila-Nisansala/2.2.jpg",
        "/images/stories/Akila-Nisansala/2.3.jpg",
        "/images/stories/Akila-Nisansala/2.4.jpg",
      ],
    },
    {
      name: "Madusha & Sethuni",
      slug: "madusha-sethuni",
      location: "SL",
      image: "/images/spotlight_3.jpg",
      category: "Destination Wedding",
      description: "Caldera cliffside vows celebrated under golden hour light and iconic Aegean minimalism.",
      images: [
        "/images/stories/Madusha-Sethuni/3.1.jpg",
        "/images/stories/Madusha-Sethuni/3.2.jpg",
        "/images/stories/Madusha-Sethuni/3.3.jpg",
        "/images/stories/Madusha-Sethuni/3.4.jpg",
        "/images/stories/Madusha-Sethuni/3.5.jpg",
      ],
    },
    {
      name: "Ravi & Kuluni",
      slug: "ravi-kuluni",
      location: "SL",
      image: "/images/spotlight_4.jpg",
      category: "Alpine Wonder",
      description: "Crisp snow-capped peaks, sweeping valley vistas, and an unforgettable fairytale mountain shoot.",
      images: [
        "/images/stories/Ravi-Kuluni/4.1.jpg",
        "/images/stories/Ravi-Kuluni/4.2.jpg",
        "/images/stories/Ravi-Kuluni/4.3.jpg",
        "/images/stories/Ravi-Kuluni/4.4.jpg",
      ],
    },
    {
      name: "Ovindu & Vihara",
      slug: "ovindu-vihara",
      location: "SL",
      image: "/images/spotlight_5.jpg",
      category: "Lakeside Luxury",
      description: "Dramatic mountain backdrops, crystal waters, and timeless editorial styling in Northern Italy.",
      images: [
        "/images/stories/Ovindu-Vihara/5.1.jpg",
        "/images/stories/Ovindu-Vihara/5.2.jpg",
        "/images/stories/Ovindu-Vihara/5.3.jpg",
        "/images/stories/Ovindu-Vihara/5.4.jpg",
        "/images/stories/Ovindu-Vihara/5.5.jpg",
      ],
    },
    {
      name: "Sanjay & Prathiba",
      slug: "sanjay-prathiba",
      location: "SL",
      image: "/images/spotlight_6.jpg",
      category: "Heritage Island",
      description: "Colonial ramparts, crashing ocean waves, and the tropical warmth of a timeless island union.",
      images: [
        "/images/spotlight_6.jpg",
        "/images/stories/Sanjay-Prathiba/6.1.jpg",
        "/images/stories/Sanjay-Prathiba/6.2.jpg",
        "/images/stories/Sanjay-Prathiba/6.3.jpg",
        "/images/stories/Sanjay-Prathiba/6.4.jpg",
      ],
    },
  ],

  booking: {
    badge: "International Inquiries",
    title: "Booking For Clients",
    description: "Bringing our team to your wedding is as simple as filling out a quick contact. We connect with you to guide you through package selection and tailor our services to fit your vision—no matter where in the world you celebrate.",
    image: "/images/booking_1.jpg",
    images: [
      "/images/booking_1.jpg",
      "/images/booking_2.jpg",
      "/images/booking_3.jpg",
      "/images/love.jpg",
    ],
  },

  testimonials: [
    {
      name: "Ravi Perera",
      origin: "Destination Wedding • Sri Lanka & UK",
      image: "/images/spotlight_4.jpg",
      quote: "One of the most exceptional wedding photography teams. As always, they did incredible work on my wedding day, capturing natural moments and raw emotion without ever feeling intrusive.",
    },
    {
      name: "Ovindu & Vihara",
      origin: "Pre Shoot",
      image: "/images/stories/Ovindu-Vihara/5.2.jpg",
      quote: "From our initial Zoom consultation to the final heirloom gallery delivery, everything was flawless. They handled location scouting across our venue with such elegance. Our guests are still raving about the photos!",
    },
    {
      name: "Madushan & Sethni",
      origin: "Engagement",
      image: "/images/testimonial_3.jpg",
      quote: "The imagery looks like high-end Vogue editorials. Their ability to catch quiet glances, dramatic light, and architectural lines made our special day feel like an absolute fairytale.",
    },
    {
      name: "Sanjay Almeda",
      origin: "Multi-Day Wedding Experience",
      image: "/images/spotlight_6.jpg",
      quote: "Traveling across different locations with the crew was pure joy. They bring so much calm confidence, warmth, and artistic mastery. We cherish our wedding album every single day.",
    },
    {
      name: "Shuha Hajmeer",
      origin: "Weddings",
      image: "/images/testimonial_5.jpg",
      quote: "Every single portrait feels like a timeless work of art. The team's eye for lighting and authentic smiles is second to none. We couldn't have chosen better storytellers.",
    },
  ],

  ctaBanner: {
    tag: "Available Worldwide",
    title: "Let Us Capture Your",
    titleAccent: "Wedding Journey",
    description: "Connect with us to discuss your wedding photography needs, wherever in the world your celebration awaits.",
    image: "/images/cta_june.jpg",
    ctaText: "Reserve Your Date",
  },

  insights: [
    {
      title: "Capturing Love Beyond Borders",
      tag: "International Guide",
      excerpt: "We specialize in fine art wedding photography that beautifully preserves the essence of your love story across global landscapes with poise and grace.",
      image: "/images/insights_1.jpg",
      readTime: "4 min read",
    },
    {
      title: "Where Your Love Story Becomes Timeless Art",
      tag: "Signature Vision",
      excerpt: "Transforming wedding moments into breathtaking works of art, blending stunning natural landscapes with raw, heartfelt emotion.",
      image: "/images/insights_2.jpg",
      readTime: "5 min read",
    },
  ],

  portfolioItems: [
    {
      title: "Shalin & Shuha",
      slug: "shalin-shuha",
      category: "Casual Shoot",
      country: "Sri Lanka",
      image: "/images/spotlight_1.jpg",
      flag: "/images/flags/685d8ccb9d035d251d07b58e_Sri%20Lanka%20Flag.png",
    },
    {
      title: "Akila & Nisansala",
      slug: "akila-nisansala",
      category: "Fine Art Celebration",
      country: "Sri Lanka",
      image: "/images/spotlight_2.jpg",
      flag: "/images/flags/685d8ccb9d035d251d07b58e_Sri%20Lanka%20Flag.png",
    },
    {
      title: "Madusha & Sethuni",
      slug: "madusha-sethuni",
      category: "Destination Wedding",
      country: "Sri Lanka",
      image: "/images/spotlight_3.jpg",
      flag: "/images/flags/685d8ccb9d035d251d07b58e_Sri%20Lanka%20Flag.png",
    },
    {
      title: "Ravi & Kuluni",
      slug: "ravi-kuluni",
      category: "Alpine Wonder",
      country: "Sri Lanka",
      image: "/images/spotlight_4.jpg",
      flag: "/images/flags/685d8ccb9d035d251d07b58e_Sri%20Lanka%20Flag.png",
    },
    {
      title: "Ovindu & Vihara",
      slug: "ovindu-vihara",
      category: "Lakeside Luxury",
      country: "Sri Lanka",
      image: "/images/spotlight_5.jpg",
      flag: "/images/flags/685d8ccb9d035d251d07b58e_Sri%20Lanka%20Flag.png",
    },
    {
      title: "Sanjay & Prathiba",
      slug: "sanjay-prathiba",
      category: "Heritage Island",
      country: "Sri Lanka",
      image: "/images/spotlight_6.jpg",
      flag: "/images/flags/685d8ccb9d035d251d07b58e_Sri%20Lanka%20Flag.png",
    },
  ],

  portfolioStories: [
    {
      slug: "shalin-shuha",
      title: "Shalin & Shuha",
      category: "Casual Shoot",
      location: "Sri Lanka",
      coverImage: "/images/spotlight_1.jpg",
      galleryImages: [
        "/images/stories/Shalin-Shuha/1.1.jpg",
        "/images/stories/Shalin-Shuha/1.2.jpg",
        "/images/stories/Shalin-Shuha/1.3.jpg",
        "/images/stories/Shalin-Shuha/1.4.jpg",
        "/images/stories/Shalin-Shuha/1.5.jpg",
      ],
      related: [
        {
          title: "Akila & Nisansala",
          slug: "akila-nisansala",
          image: "/images/spotlight_2.jpg",
          category: "Fine Art Celebration",
          location: "Sri Lanka",
        },
        {
          title: "Madusha & Sethuni",
          slug: "madusha-sethuni",
          image: "/images/spotlight_3.jpg",
          category: "Destination Wedding",
          location: "Sri Lanka",
        },
      ],
    },
    {
      slug: "akila-nisansala",
      title: "Akila & Nisansala",
      category: "Fine Art Celebration",
      location: "Sri Lanka",
      coverImage: "/images/spotlight_2.jpg",
      galleryImages: [
        "/images/stories/Akila-Nisansala/2.1.jpg",
        "/images/stories/Akila-Nisansala/2.2.jpg",
        "/images/stories/Akila-Nisansala/2.3.jpg",
        "/images/stories/Akila-Nisansala/2.4.jpg",
      ],
      related: [
        {
          title: "Shalin & Shuha",
          slug: "shalin-shuha",
          image: "/images/spotlight_1.jpg",
          category: "Casual Shoot",
          location: "Sri Lanka",
        },
        {
          title: "Madusha & Sethuni",
          slug: "madusha-sethuni",
          image: "/images/spotlight_3.jpg",
          category: "Destination Wedding",
          location: "Sri Lanka",
        },
      ],
    },
    {
      slug: "madusha-sethuni",
      title: "Madusha & Sethuni",
      category: "Destination Wedding",
      location: "Sri Lanka",
      coverImage: "/images/spotlight_3.jpg",
      galleryImages: [
        "/images/stories/Madusha-Sethuni/3.1.jpg",
        "/images/stories/Madusha-Sethuni/3.2.jpg",
        "/images/stories/Madusha-Sethuni/3.3.jpg",
        "/images/stories/Madusha-Sethuni/3.4.jpg",
        "/images/stories/Madusha-Sethuni/3.5.jpg",
      ],
      related: [
        {
          title: "Ravi & Kuluni",
          slug: "ravi-kuluni",
          image: "/images/spotlight_4.jpg",
          category: "Alpine Wonder",
          location: "Sri Lanka",
        },
        {
          title: "Ovindu & Vihara",
          slug: "ovindu-vihara",
          image: "/images/spotlight_5.jpg",
          category: "Lakeside Luxury",
          location: "Sri Lanka",
        },
      ],
    },
    {
      slug: "ravi-kuluni",
      title: "Ravi & Kuluni",
      category: "Alpine Wonder",
      location: "Sri Lanka",
      coverImage: "/images/spotlight_4.jpg",
      galleryImages: [
        "/images/stories/Ravi-Kuluni/4.1.jpg",
        "/images/stories/Ravi-Kuluni/4.2.jpg",
        "/images/stories/Ravi-Kuluni/4.3.jpg",
        "/images/stories/Ravi-Kuluni/4.4.jpg",
      ],
      related: [
        {
          title: "Madusha & Sethuni",
          slug: "madusha-sethuni",
          image: "/images/spotlight_3.jpg",
          category: "Destination Wedding",
          location: "Sri Lanka",
        },
        {
          title: "Ovindu & Vihara",
          slug: "ovindu-vihara",
          image: "/images/spotlight_5.jpg",
          category: "Lakeside Luxury",
          location: "Sri Lanka",
        },
      ],
    },
    {
      slug: "ovindu-vihara",
      title: "Ovindu & Vihara",
      category: "Lakeside Luxury",
      location: "Sri Lanka",
      coverImage: "/images/spotlight_5.jpg",
      galleryImages: [
        "/images/stories/Ovindu-Vihara/5.1.jpg",
        "/images/stories/Ovindu-Vihara/5.2.jpg",
        "/images/stories/Ovindu-Vihara/5.3.jpg",
        "/images/stories/Ovindu-Vihara/5.4.jpg",
        "/images/stories/Ovindu-Vihara/5.5.jpg",
      ],
      related: [
        {
          title: "Ravi & Kuluni",
          slug: "ravi-kuluni",
          image: "/images/spotlight_4.jpg",
          category: "Alpine Wonder",
          location: "Sri Lanka",
        },
        {
          title: "Sanjay & Prathiba",
          slug: "sanjay-prathiba",
          image: "/images/spotlight_6.jpg",
          category: "Heritage Island",
          location: "Sri Lanka",
        },
      ],
    },
    {
      slug: "sanjay-prathiba",
      title: "Sanjay & Prathiba",
      category: "Heritage Island",
      location: "Sri Lanka",
      coverImage: "/images/spotlight_6.jpg",
      galleryImages: [
        "/images/stories/Sanjay-Prathiba/6.1.jpg",
        "/images/stories/Sanjay-Prathiba/6.2.jpg",
        "/images/stories/Sanjay-Prathiba/6.3.jpg",
        "/images/stories/Sanjay-Prathiba/6.4.jpg",
      ],
      related: [
        {
          title: "Ovindu & Vihara",
          slug: "ovindu-vihara",
          image: "/images/spotlight_5.jpg",
          category: "Lakeside Luxury",
          location: "Sri Lanka",
        },
        {
          title: "Shalin & Shuha",
          slug: "shalin-shuha",
          image: "/images/spotlight_1.jpg",
          category: "Casual Shoot",
          location: "Sri Lanka",
        },
      ],
    },
  ],

  faqs: [
    {
      question: "How do I book photography services for my wedding?",
      answer: "Simply fill out our contact and our team will reach out to discuss package options, availability, and specific requirements you may have. We make the process smooth and straightforward for all clients.",
    },
    {
      question: "Do you travel for destination weddings internationally?",
      answer: "Yes, absolutely! We are available for weddings worldwide—from Europe, the UK, and UAE to the USA, Asia, and Australia.",
    },
    {
      question: "What is included in your wedding photography packages?",
      answer: "Our packages include comprehensive coverage of your wedding day with a focus on candid and fine-art moments. We also offer options for pre-wedding shoots, engagement sessions, and heirloom fine-art albums.",
    },
    {
      question: "Can I have a pre wedding or engagement shoot?",
      answer: "Yes! We offer pre-wedding and engagement sessions both locally and at international travel locations, allowing you to capture stunning moments before your big day.",
    },
    {
      question: "How far in advance should I book?",
      answer: "We recommend booking as early as possible typically 6 to 12 months in advance—especially for popular summer and winter destination dates.",
    },
  ],
};
