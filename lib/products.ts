// Demo catalog for the IFTA DZ preview. Static data — swap for a real backend later.
// Prices are demo prices in DZD.

import { PRODUCT_IMAGES } from "./product-images";

export type CategoryGroup = "components" | "pcs" | "gear";

export type Category = {
  slug: string;
  name: string;
  image: string;
  group: CategoryGroup;
  // Spec keys shown as filters on the shop page when this category is open.
  // Each must exist in the products' `specs`.
  facets: string[];
};

export type Product = {
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  comparePrice?: number;
  images: string[];
  stock: number;
  featured?: boolean;
  promo?: boolean;
  description: string;
  specs: Record<string, string>;
};

export const CATEGORY_GROUPS: { id: CategoryGroup; name: string }[] = [
  { id: "components", name: "PC components" },
  { id: "pcs", name: "PCs & laptops" },
  { id: "gear", name: "Monitors & gear" },
];

// First photo of a product, for category tiles that show one.
const photo = (slug: string, fallback: string) => PRODUCT_IMAGES[slug]?.[0] ?? fallback;

export const CATEGORIES: Category[] = [
  { slug: "graphics-cards", name: "Graphics Cards", image: "/categories/gpu.jpg", group: "components", facets: ["GPU", "Memory"] },
  { slug: "processors", name: "Processors", image: "/categories/cpu.jpg", group: "components", facets: ["Socket", "Cores"] },
  { slug: "motherboards", name: "Motherboards", image: "/categories/motherboard.jpg", group: "components", facets: ["Socket", "Chipset", "Form factor"] },
  { slug: "memory", name: "Memory (RAM)", image: "/categories/ram.jpg", group: "components", facets: ["Type", "Capacity", "Speed"] },
  { slug: "storage", name: "Storage", image: "/categories/storage.jpg", group: "components", facets: ["Type", "Capacity"] },
  { slug: "power-supplies", name: "Power Supplies", image: "/categories/psu.jpg", group: "components", facets: ["Wattage", "Efficiency"] },
  { slug: "cases", name: "Cases", image: "/categories/case.jpg", group: "components", facets: ["Form factor"] },
  { slug: "cooling", name: "Cooling", image: photo("arctic-liquid-freezer-iii-360", "/categories/case.jpg"), group: "components", facets: ["Type"] },
  { slug: "pc-builds", name: "IFTA Gaming PCs", image: photo("lian-li-lancool-216", "/categories/case.jpg"), group: "pcs", facets: ["GPU", "Processor"] },
  { slug: "laptops", name: "Laptops", image: photo("asus-rog-strix-g16-rtx5070ti", "/categories/peripherals.jpg"), group: "pcs", facets: ["GPU", "Screen"] },
  { slug: "monitors", name: "Monitors", image: photo("lg-ultragear-27gs95qe-oled", "/categories/peripherals.jpg"), group: "gear", facets: ["Size", "Resolution", "Refresh rate"] },
  { slug: "peripherals", name: "Peripherals", image: "/categories/peripherals.jpg", group: "gear", facets: ["Type"] },
  { slug: "networking", name: "Networking", image: photo("tp-link-deco-x20-2pack", "/categories/peripherals.jpg"), group: "gear", facets: ["Type"] },
];

type Draft = Omit<Product, "images"> & { imageFrom?: string };

// Photos live in public/products/<slug>.<ext> (see lib/product-images.ts).
// A build borrows its case's photo via `imageFrom`.
const DRAFTS: Draft[] = [
  // ── Graphics cards ──────────────────────────────────────────────
  {
    slug: "asus-dual-rtx-5060-8g",
    name: "ASUS Dual GeForce RTX 5060 8GB OC",
    brand: "ASUS",
    category: "graphics-cards",
    price: 85000,
    stock: 14,
    description: "Blackwell for 1080p: DLSS 4 with multi frame generation, full ray tracing and a compact dual-fan design that fits almost any case.",
    specs: { GPU: "RTX 5060", Memory: "8GB GDDR7", "CUDA cores": "3840", "Memory bus": "128-bit", Power: "145 W", Outputs: "3× DP 2.1b, 1× HDMI 2.1b" },
  },
  {
    slug: "msi-rtx-5060-ti-16g-ventus-2x",
    name: "MSI GeForce RTX 5060 Ti 16G Ventus 2X OC",
    brand: "MSI",
    category: "graphics-cards",
    price: 128000,
    comparePrice: 136000,
    stock: 9,
    promo: true,
    description: "16GB of fast GDDR7 for 1440p and creative work. DLSS 4 keeps frame rates high in the newest games while staying quiet and cool.",
    specs: { GPU: "RTX 5060 Ti", Memory: "16GB GDDR7", "CUDA cores": "4608", "Memory bus": "128-bit", Power: "180 W", Outputs: "3× DP 2.1b, 1× HDMI 2.1b" },
  },
  {
    slug: "gigabyte-rtx-5070-windforce-12g",
    name: "Gigabyte GeForce RTX 5070 Windforce OC SFF 12G",
    brand: "Gigabyte",
    category: "graphics-cards",
    price: 162000,
    stock: 7,
    featured: true,
    description: "The sweet spot for high-refresh 1440p gaming. Small-form-factor ready, with Windforce triple-fan cooling and DLSS 4.",
    specs: { GPU: "RTX 5070", Memory: "12GB GDDR7", "CUDA cores": "6144", "Memory bus": "192-bit", Power: "250 W", Outputs: "3× DP 2.1b, 1× HDMI 2.1b" },
  },
  {
    slug: "asus-tuf-rtx-5070-ti-16g",
    name: "ASUS TUF Gaming GeForce RTX 5070 Ti 16GB OC",
    brand: "ASUS",
    category: "graphics-cards",
    price: 238000,
    comparePrice: 252000,
    stock: 5,
    featured: true,
    promo: true,
    description: "Military-grade components, a metal shroud and 16GB of GDDR7. Maxed-out 1440p and confident 4K with DLSS 4.",
    specs: { GPU: "RTX 5070 Ti", Memory: "16GB GDDR7", "CUDA cores": "8960", "Memory bus": "256-bit", Power: "300 W", Outputs: "3× DP 2.1b, 2× HDMI 2.1b" },
  },
  {
    slug: "msi-rtx-5080-gaming-trio-16g",
    name: "MSI GeForce RTX 5080 16G Gaming Trio OC",
    brand: "MSI",
    category: "graphics-cards",
    price: 345000,
    stock: 3,
    featured: true,
    description: "High-end 4K gaming and fast AI and rendering workloads. TRI FROZR 4 cooling keeps it cool and quiet under load.",
    specs: { GPU: "RTX 5080", Memory: "16GB GDDR7", "CUDA cores": "10752", "Memory bus": "256-bit", Power: "360 W", Outputs: "3× DP 2.1b, 1× HDMI 2.1b" },
  },
  {
    slug: "asus-rog-astral-rtx-5090-32g",
    name: "ASUS ROG Astral GeForce RTX 5090 32GB OC",
    brand: "ASUS",
    category: "graphics-cards",
    price: 790000,
    stock: 1,
    description: "The fastest graphics card you can buy. 32GB of GDDR7, a quad-fan ROG cooler and the power for 4K at full settings and serious AI work.",
    specs: { GPU: "RTX 5090", Memory: "32GB GDDR7", "CUDA cores": "21760", "Memory bus": "512-bit", Power: "575 W", Outputs: "3× DP 2.1b, 2× HDMI 2.1b" },
  },
  {
    slug: "sapphire-pulse-rx-9060-xt-16g",
    name: "Sapphire Pulse Radeon RX 9060 XT 16GB",
    brand: "Sapphire",
    category: "graphics-cards",
    price: 108000,
    stock: 10,
    description: "RDNA 4 with 16GB of VRAM at a mid-range price. FSR 4 upscaling and strong 1080p and 1440p performance.",
    specs: { GPU: "RX 9060 XT", Memory: "16GB GDDR6", "Stream processors": "2048", "Memory bus": "128-bit", Power: "160 W", Outputs: "2× DP 2.1a, 1× HDMI 2.1b" },
  },
  {
    slug: "sapphire-nitro-rx-9070-xt-16g",
    name: "Sapphire Nitro+ Radeon RX 9070 XT 16GB",
    brand: "Sapphire",
    category: "graphics-cards",
    price: 205000,
    comparePrice: 219000,
    stock: 4,
    featured: true,
    promo: true,
    description: "AMD's flagship RDNA 4 card in Sapphire's premium Nitro+ design. Excellent 1440p and 4K performance with FSR 4.",
    specs: { GPU: "RX 9070 XT", Memory: "16GB GDDR6", "Stream processors": "4096", "Memory bus": "256-bit", Power: "304 W", Outputs: "2× DP 2.1a, 2× HDMI 2.1b" },
  },

  // ── Processors ──────────────────────────────────────────────────
  {
    slug: "amd-ryzen-5-7600",
    name: "AMD Ryzen 5 7600",
    brand: "AMD",
    category: "processors",
    price: 38000,
    stock: 18,
    description: "Six Zen 4 cores on AM5 with a cooler in the box. The best-value start for a modern gaming PC.",
    specs: { Socket: "AM5", Cores: "6", Threads: "12", "Boost clock": "5.1 GHz", "L3 cache": "32MB", TDP: "65 W", Cooler: "Included" },
  },
  {
    slug: "amd-ryzen-5-9600x",
    name: "AMD Ryzen 5 9600X",
    brand: "AMD",
    category: "processors",
    price: 52000,
    stock: 11,
    description: "Zen 5 efficiency and strong single-core speed for gaming and everyday work, on the AM5 platform.",
    specs: { Socket: "AM5", Cores: "6", Threads: "12", "Boost clock": "5.4 GHz", "L3 cache": "32MB", TDP: "65 W", Cooler: "Not included" },
  },
  {
    slug: "amd-ryzen-7-9800x3d",
    name: "AMD Ryzen 7 9800X3D",
    brand: "AMD",
    category: "processors",
    price: 128000,
    comparePrice: 136000,
    stock: 6,
    featured: true,
    promo: true,
    description: "The fastest gaming processor available. Second-generation 3D V-Cache puts 96MB of L3 cache to work in every game.",
    specs: { Socket: "AM5", Cores: "8", Threads: "16", "Boost clock": "5.2 GHz", "L3 cache": "96MB", TDP: "120 W", Cooler: "Not included" },
  },
  {
    slug: "amd-ryzen-9-9950x3d",
    name: "AMD Ryzen 9 9950X3D",
    brand: "AMD",
    category: "processors",
    price: 198000,
    stock: 3,
    description: "16 cores with 3D V-Cache: top gaming speed and workstation power for rendering, editing and streaming in one chip.",
    specs: { Socket: "AM5", Cores: "16", Threads: "32", "Boost clock": "5.7 GHz", "L3 cache": "128MB", TDP: "170 W", Cooler: "Not included" },
  },
  {
    slug: "intel-core-i5-14400f",
    name: "Intel Core i5-14400F",
    brand: "Intel",
    category: "processors",
    price: 36000,
    stock: 15,
    description: "Ten cores (6P + 4E) for smooth gaming on a budget. Pairs with affordable LGA 1700 boards and a dedicated graphics card.",
    specs: { Socket: "LGA 1700", Cores: "10", Threads: "16", "Boost clock": "4.7 GHz", "L3 cache": "20MB", TDP: "65 W", Cooler: "Included" },
  },
  {
    slug: "intel-core-ultra-5-245k",
    name: "Intel Core Ultra 5 245K",
    brand: "Intel",
    category: "processors",
    price: 72000,
    stock: 8,
    description: "Arrow Lake with 14 cores, an NPU for AI tasks and an unlocked multiplier, on the new LGA 1851 platform.",
    specs: { Socket: "LGA 1851", Cores: "14", Threads: "14", "Boost clock": "5.2 GHz", "L3 cache": "24MB", TDP: "125 W", Cooler: "Not included" },
  },
  {
    slug: "intel-core-ultra-7-265k",
    name: "Intel Core Ultra 7 265K",
    brand: "Intel",
    category: "processors",
    price: 92000,
    stock: 6,
    featured: true,
    description: "20 cores (8P + 12E) up to 5.5 GHz. Excellent for content creation, streaming and multitasking with lower power draw.",
    specs: { Socket: "LGA 1851", Cores: "20", Threads: "20", "Boost clock": "5.5 GHz", "L3 cache": "30MB", TDP: "125 W", Cooler: "Not included" },
  },

  // ── Motherboards ────────────────────────────────────────────────
  {
    slug: "msi-b650-gaming-plus-wifi",
    name: "MSI B650 Gaming Plus WiFi",
    brand: "MSI",
    category: "motherboards",
    price: 48000,
    stock: 9,
    description: "A solid AM5 board with DDR5, PCIe 4.0 M.2 slots and Wi-Fi 6E. The reliable base for a Ryzen gaming build.",
    specs: { Socket: "AM5", Chipset: "B650", "Form factor": "ATX", Memory: "4× DDR5", "M.2 slots": "2", Wireless: "Wi-Fi 6E, BT 5.3" },
  },
  {
    slug: "asus-tuf-b850-plus-wifi",
    name: "ASUS TUF Gaming B850-Plus WiFi",
    brand: "ASUS",
    category: "motherboards",
    price: 58000,
    stock: 7,
    featured: true,
    description: "TUF durability with PCIe 5.0 storage, Wi-Fi 7 and robust power delivery ready for Ryzen 9000 X3D chips.",
    specs: { Socket: "AM5", Chipset: "B850", "Form factor": "ATX", Memory: "4× DDR5", "M.2 slots": "3", Wireless: "Wi-Fi 7, BT 5.4" },
  },
  {
    slug: "gigabyte-x870e-aorus-elite-wifi7",
    name: "Gigabyte X870E Aorus Elite WiFi7",
    brand: "Gigabyte",
    category: "motherboards",
    price: 98000,
    stock: 4,
    description: "Enthusiast AM5 platform with PCIe 5.0 for graphics and storage, USB4 and Wi-Fi 7. Built for top-end Ryzen builds.",
    specs: { Socket: "AM5", Chipset: "X870E", "Form factor": "ATX", Memory: "4× DDR5", "M.2 slots": "4", Wireless: "Wi-Fi 7, BT 5.4" },
  },
  {
    slug: "msi-pro-b760m-a-wifi",
    name: "MSI PRO B760M-A WiFi DDR5",
    brand: "MSI",
    category: "motherboards",
    price: 39000,
    stock: 10,
    description: "Compact micro-ATX board for Intel 12th to 14th gen with DDR5 and Wi-Fi 6E. Great for office and budget gaming PCs.",
    specs: { Socket: "LGA 1700", Chipset: "B760", "Form factor": "Micro-ATX", Memory: "4× DDR5", "M.2 slots": "2", Wireless: "Wi-Fi 6E, BT 5.3" },
  },
  {
    slug: "asrock-b860m-pro-rs",
    name: "ASRock B860M Pro RS",
    brand: "ASRock",
    category: "motherboards",
    price: 36000,
    stock: 8,
    description: "An affordable way into Intel Core Ultra. Micro-ATX, DDR5 and fast M.2 storage in a clean design.",
    specs: { Socket: "LGA 1851", Chipset: "B860", "Form factor": "Micro-ATX", Memory: "4× DDR5", "M.2 slots": "3", Wireless: "None" },
  },
  {
    slug: "asus-rog-strix-z890-e",
    name: "ASUS ROG Strix Z890-E Gaming WiFi",
    brand: "ASUS",
    category: "motherboards",
    price: 145000,
    stock: 2,
    description: "Premium Z890 board for overclocking Core Ultra processors: massive power stages, Thunderbolt 4 and Wi-Fi 7.",
    specs: { Socket: "LGA 1851", Chipset: "Z890", "Form factor": "ATX", Memory: "4× DDR5", "M.2 slots": "5", Wireless: "Wi-Fi 7, BT 5.4" },
  },

  // ── Memory ──────────────────────────────────────────────────────
  {
    slug: "corsair-vengeance-rgb-ddr5-32-6000",
    name: "Corsair Vengeance RGB DDR5 32GB (2×16GB) 6000MHz CL30",
    brand: "Corsair",
    category: "memory",
    price: 34000,
    comparePrice: 37000,
    stock: 20,
    featured: true,
    promo: true,
    description: "The ideal kit for Ryzen 7000 and 9000: 6000MHz at CL30 with AMD EXPO and Intel XMP 3.0, plus iCUE RGB lighting.",
    specs: { Type: "DDR5", Capacity: "32GB", Speed: "6000 MHz", Kit: "2× 16GB", Latency: "CL30", Profiles: "XMP 3.0 / EXPO" },
  },
  {
    slug: "gskill-trident-z5-neo-rgb-32-6000",
    name: "G.Skill Trident Z5 Neo RGB DDR5 32GB (2×16GB) 6000MHz",
    brand: "G.Skill",
    category: "memory",
    price: 36500,
    stock: 12,
    description: "Tuned for AMD EXPO with tight timings and the iconic Trident Z5 heat spreader.",
    specs: { Type: "DDR5", Capacity: "32GB", Speed: "6000 MHz", Kit: "2× 16GB", Latency: "CL30", Profiles: "EXPO" },
  },
  {
    slug: "kingston-fury-beast-ddr5-32-5600",
    name: "Kingston Fury Beast DDR5 32GB (2×16GB) 5600MHz",
    brand: "Kingston",
    category: "memory",
    price: 29000,
    stock: 16,
    description: "Dependable DDR5 with a low-profile heat spreader that clears big air coolers. Works with Intel and AMD.",
    specs: { Type: "DDR5", Capacity: "32GB", Speed: "5600 MHz", Kit: "2× 16GB", Latency: "CL36", Profiles: "XMP 3.0 / EXPO" },
  },
  {
    slug: "kingston-fury-beast-ddr4-16-3200",
    name: "Kingston Fury Beast DDR4 16GB (2×8GB) 3200MHz",
    brand: "Kingston",
    category: "memory",
    price: 9800,
    stock: 25,
    description: "The easy upgrade for DDR4 systems. Plug-and-play overclocking to 3200MHz.",
    specs: { Type: "DDR4", Capacity: "16GB", Speed: "3200 MHz", Kit: "2× 8GB", Latency: "CL16", Profiles: "XMP" },
  },
  {
    slug: "teamgroup-delta-rgb-ddr5-64-6000",
    name: "TeamGroup T-Force Delta RGB DDR5 64GB (2×32GB) 6000MHz",
    brand: "TeamGroup",
    category: "memory",
    price: 62000,
    stock: 5,
    description: "64GB for editing, 3D and heavy multitasking, with a wide-angle RGB light bar.",
    specs: { Type: "DDR5", Capacity: "64GB", Speed: "6000 MHz", Kit: "2× 32GB", Latency: "CL38", Profiles: "XMP 3.0 / EXPO" },
  },

  // ── Storage ─────────────────────────────────────────────────────
  {
    slug: "samsung-990-pro-2tb",
    name: "Samsung 990 PRO 2TB NVMe M.2",
    brand: "Samsung",
    category: "storage",
    price: 42000,
    stock: 9,
    featured: true,
    description: "Top-tier PCIe 4.0 speed: up to 7450 MB/s reads for instant game loads and fast large-file work.",
    specs: { Type: "NVMe SSD", Capacity: "2TB", Interface: "PCIe 4.0 x4", "Read speed": "7450 MB/s", "Write speed": "6900 MB/s", Warranty: "5 years" },
  },
  {
    slug: "samsung-990-evo-plus-1tb",
    name: "Samsung 990 EVO Plus 1TB NVMe M.2",
    brand: "Samsung",
    category: "storage",
    price: 21500,
    stock: 14,
    description: "Fast, efficient and great value. Up to 7150 MB/s on PCIe 4.0, with PCIe 5.0 x2 support.",
    specs: { Type: "NVMe SSD", Capacity: "1TB", Interface: "PCIe 4.0 x4 / 5.0 x2", "Read speed": "7150 MB/s", "Write speed": "6300 MB/s", Warranty: "5 years" },
  },
  {
    slug: "wd-black-sn850x-1tb",
    name: "WD_BLACK SN850X 1TB NVMe",
    brand: "WD",
    category: "storage",
    price: 23000,
    stock: 10,
    description: "A favorite gaming SSD with Game Mode 2.0 and up to 7300 MB/s reads. PS5 compatible.",
    specs: { Type: "NVMe SSD", Capacity: "1TB", Interface: "PCIe 4.0 x4", "Read speed": "7300 MB/s", "Write speed": "6300 MB/s", Warranty: "5 years" },
  },
  {
    slug: "kingston-nv3-1tb",
    name: "Kingston NV3 1TB NVMe M.2",
    brand: "Kingston",
    category: "storage",
    price: 15500,
    comparePrice: 17000,
    stock: 22,
    promo: true,
    description: "The budget upgrade that feels fast: up to 6000 MB/s reads on PCIe 4.0.",
    specs: { Type: "NVMe SSD", Capacity: "1TB", Interface: "PCIe 4.0 x4", "Read speed": "6000 MB/s", "Write speed": "4000 MB/s", Warranty: "3 years" },
  },
  {
    slug: "crucial-p3-plus-2tb",
    name: "Crucial P3 Plus 2TB NVMe M.2",
    brand: "Crucial",
    category: "storage",
    price: 30000,
    stock: 8,
    description: "2TB of fast PCIe 4.0 storage at a fair price. Room for a big game library.",
    specs: { Type: "NVMe SSD", Capacity: "2TB", Interface: "PCIe 4.0 x4", "Read speed": "5000 MB/s", "Write speed": "4200 MB/s", Warranty: "5 years" },
  },
  {
    slug: "seagate-barracuda-2tb",
    name: "Seagate BarraCuda 2TB 3.5\" HDD",
    brand: "Seagate",
    category: "storage",
    price: 17000,
    stock: 12,
    description: "Affordable bulk storage for photos, videos and backups.",
    specs: { Type: "Hard drive", Capacity: "2TB", Interface: "SATA 6Gb/s", "Spindle speed": "7200 RPM", Cache: "256MB", Warranty: "2 years" },
  },

  // ── Power supplies ──────────────────────────────────────────────
  {
    slug: "corsair-rm850e",
    name: "Corsair RM850e 850W ATX 3.1",
    brand: "Corsair",
    category: "power-supplies",
    price: 30000,
    stock: 11,
    featured: true,
    description: "Fully modular, 80 PLUS Gold and ATX 3.1 with a native 12V-2x6 cable for RTX 50 series cards.",
    specs: { Wattage: "850 W", Efficiency: "80+ Gold", Modular: "Fully modular", Standard: "ATX 3.1", "GPU connector": "12V-2x6", Warranty: "7 years" },
  },
  {
    slug: "msi-mag-a750gl-pcie5",
    name: "MSI MAG A750GL PCIE5 750W",
    brand: "MSI",
    category: "power-supplies",
    price: 23000,
    stock: 13,
    description: "80 PLUS Gold and ATX 3.0 ready, with a native PCIe 5.0 cable. A dependable choice for mid-range builds.",
    specs: { Wattage: "750 W", Efficiency: "80+ Gold", Modular: "Fully modular", Standard: "ATX 3.0", "GPU connector": "12VHPWR", Warranty: "10 years" },
  },
  {
    slug: "seasonic-focus-gx-1000-atx3",
    name: "Seasonic Focus GX-1000 ATX 3.0",
    brand: "Seasonic",
    category: "power-supplies",
    price: 45000,
    stock: 4,
    description: "1000W of quiet, rock-solid Seasonic power for RTX 5080 and 5090 systems.",
    specs: { Wattage: "1000 W", Efficiency: "80+ Gold", Modular: "Fully modular", Standard: "ATX 3.0", "GPU connector": "12VHPWR", Warranty: "10 years" },
  },
  {
    slug: "coolermaster-mwe-gold-650-v2",
    name: "Cooler Master MWE Gold 650 V2",
    brand: "Cooler Master",
    category: "power-supplies",
    price: 17500,
    stock: 15,
    description: "Efficient 80 PLUS Gold power for budget and office builds.",
    specs: { Wattage: "650 W", Efficiency: "80+ Gold", Modular: "Non-modular", Standard: "ATX 2.52", "GPU connector": "2× 8-pin", Warranty: "5 years" },
  },

  // ── Cases ───────────────────────────────────────────────────────
  {
    slug: "lian-li-lancool-216",
    name: "Lian Li Lancool 216",
    brand: "Lian Li",
    category: "cases",
    price: 24000,
    stock: 9,
    featured: true,
    description: "Airflow champion: two 160mm front fans, a mesh front and room for big graphics cards.",
    specs: { "Form factor": "ATX mid-tower", "Fans included": "3 (2× 160mm ARGB, 1× 140mm)", "Max GPU length": "392 mm", "Max CPU cooler": "180 mm", "Side panel": "Tempered glass" },
  },
  {
    slug: "nzxt-h6-flow",
    name: "NZXT H6 Flow",
    brand: "NZXT",
    category: "cases",
    price: 29000,
    stock: 6,
    description: "Dual-chamber panoramic glass design with angled intake fans. Clean cable management and great airflow.",
    specs: { "Form factor": "ATX mid-tower", "Fans included": "3× 120mm", "Max GPU length": "365 mm", "Max CPU cooler": "163 mm", "Side panel": "Tempered glass" },
  },
  {
    slug: "corsair-4000d-airflow",
    name: "Corsair 4000D Airflow",
    brand: "Corsair",
    category: "cases",
    price: 25500,
    stock: 8,
    description: "A builder favorite: high-airflow front panel, easy cable routing and a clean minimal look.",
    specs: { "Form factor": "ATX mid-tower", "Fans included": "2× 120mm", "Max GPU length": "360 mm", "Max CPU cooler": "170 mm", "Side panel": "Tempered glass" },
  },
  {
    slug: "montech-air-903-max",
    name: "Montech AIR 903 MAX",
    brand: "Montech",
    category: "cases",
    price: 21000,
    stock: 10,
    description: "Four large fans included and a full mesh front at a budget price. Room for E-ATX boards and 360mm radiators.",
    specs: { "Form factor": "E-ATX mid-tower", "Fans included": "4 (3× 140mm, 1× 140mm)", "Max GPU length": "400 mm", "Max CPU cooler": "180 mm", "Side panel": "Tempered glass" },
  },

  // ── Cooling ─────────────────────────────────────────────────────
  {
    slug: "deepcool-ak400",
    name: "DeepCool AK400",
    brand: "DeepCool",
    category: "cooling",
    price: 7500,
    stock: 20,
    description: "Quiet single-tower cooler that handles 220W. Fits AM5 and LGA 1700 out of the box.",
    specs: { Type: "Air cooler", Size: "Single tower, 120mm fan", "Rated TDP": "220 W", Height: "155 mm", Sockets: "AM5, AM4, LGA 1700/1851" },
  },
  {
    slug: "thermalright-peerless-assassin-120-se",
    name: "Thermalright Peerless Assassin 120 SE",
    brand: "Thermalright",
    category: "cooling",
    price: 9000,
    comparePrice: 10500,
    stock: 18,
    promo: true,
    description: "Dual-tower, dual-fan performance that rivals liquid coolers, at an air cooler price.",
    specs: { Type: "Air cooler", Size: "Dual tower, 2× 120mm fans", "Rated TDP": "245 W", Height: "155 mm", Sockets: "AM5, AM4, LGA 1700/1851" },
  },
  {
    slug: "arctic-liquid-freezer-iii-360",
    name: "Arctic Liquid Freezer III 360",
    brand: "Arctic",
    category: "cooling",
    price: 28000,
    stock: 7,
    description: "A thick 360mm radiator and offset mounting for lower temperatures on high-end CPUs.",
    specs: { Type: "Liquid AIO", Size: "360mm radiator, 3× 120mm fans", "Rated TDP": "300+ W", Sockets: "AM5, AM4, LGA 1700/1851" },
  },
  {
    slug: "nzxt-kraken-360",
    name: "NZXT Kraken 360 with LCD",
    brand: "NZXT",
    category: "cooling",
    price: 48000,
    stock: 3,
    description: "Premium 360mm AIO with a customizable LCD pump head for temps, GIFs or your logo.",
    specs: { Type: "Liquid AIO", Size: "360mm radiator, 3× 120mm fans", Display: "1.54\" LCD", Sockets: "AM5, AM4, LGA 1700/1851" },
  },

  // ── IFTA gaming PCs ─────────────────────────────────────────────
  {
    slug: "ifta-starter-r5-rtx5060",
    name: "IFTA Starter — Ryzen 5 7600 / RTX 5060",
    brand: "IFTA",
    category: "pc-builds",
    price: 249000,
    comparePrice: 262000,
    stock: 5,
    promo: true,
    imageFrom: "montech-air-903-max",
    description: "Assembled and tested by IFTA. Smooth 1080p at high settings in every popular game, with room to upgrade.",
    specs: { Processor: "Ryzen 5 7600", GPU: "RTX 5060", Memory: "32GB DDR5 5600", Storage: "1TB NVMe", Motherboard: "MSI B650 Gaming Plus WiFi", Case: "Montech AIR 903 MAX", Warranty: "1 year IFTA" },
  },
  {
    slug: "ifta-gamer-pro-9800x3d-rtx5070ti",
    name: "IFTA Gamer Pro — Ryzen 7 9800X3D / RTX 5070 Ti",
    brand: "IFTA",
    category: "pc-builds",
    price: 549000,
    comparePrice: 575000,
    stock: 3,
    featured: true,
    promo: true,
    imageFrom: "lian-li-lancool-216",
    description: "Our best-selling gaming build: the fastest gaming CPU with an RTX 5070 Ti for high-refresh 1440p and smooth 4K.",
    specs: { Processor: "Ryzen 7 9800X3D", GPU: "RTX 5070 Ti", Memory: "32GB DDR5 6000 CL30", Storage: "2TB NVMe", Motherboard: "ASUS TUF B850-Plus WiFi", Case: "Lian Li Lancool 216", Warranty: "1 year IFTA" },
  },
  {
    slug: "ifta-creator-9950x3d-rtx5080",
    name: "IFTA Creator — Ryzen 9 9950X3D / RTX 5080",
    brand: "IFTA",
    category: "pc-builds",
    price: 829000,
    stock: 2,
    imageFrom: "nzxt-h6-flow",
    description: "Built for creators who also game: 16 cores, 64GB of RAM and an RTX 5080 for 4K editing, 3D and AI.",
    specs: { Processor: "Ryzen 9 9950X3D", GPU: "RTX 5080", Memory: "64GB DDR5 6000", Storage: "2TB NVMe", Motherboard: "Gigabyte X870E Aorus Elite", Case: "NZXT H6 Flow", Warranty: "1 year IFTA" },
  },

  // ── Laptops ─────────────────────────────────────────────────────
  {
    slug: "asus-tuf-a15-rtx4060",
    name: "ASUS TUF Gaming A15 — Ryzen 7 / RTX 4060",
    brand: "ASUS",
    category: "laptops",
    price: 225000,
    comparePrice: 239000,
    stock: 4,
    featured: true,
    promo: true,
    description: "Tough, well-cooled gaming laptop with RTX 4060 graphics and a fast 144Hz screen. Great 1080p performance at a fair price.",
    specs: { Processor: "AMD Ryzen 7 7435HS", GPU: "RTX 4060 8GB", Memory: "16GB DDR5", Storage: "512GB NVMe", Screen: "15.6\" FHD 144Hz", Weight: "2.2 kg" },
  },
  {
    slug: "lenovo-loq-15-rtx5050",
    name: "Lenovo LOQ 15 — Core i5 / RTX 5050",
    brand: "Lenovo",
    category: "laptops",
    price: 205000,
    stock: 6,
    description: "An affordable entry into RTX 50 gaming laptops, with Lenovo's reliable cooling and keyboard.",
    specs: { Processor: "Intel Core i5-13450HX", GPU: "RTX 5050 8GB", Memory: "16GB DDR5", Storage: "512GB NVMe", Screen: "15.6\" FHD 144Hz", Weight: "2.4 kg" },
  },
  {
    slug: "asus-rog-strix-g16-rtx5070ti",
    name: "ASUS ROG Strix G16 — Core Ultra 9 / RTX 5070 Ti",
    brand: "ASUS",
    category: "laptops",
    price: 520000,
    comparePrice: 545000,
    stock: 2,
    promo: true,
    description: "Desktop-class gaming anywhere: Core Ultra 9 with RTX 5070 Ti on a 240Hz QHD+ screen.",
    specs: { Processor: "Intel Core Ultra 9 275HX", GPU: "RTX 5070 Ti 12GB", Memory: "32GB DDR5", Storage: "1TB NVMe", Screen: "16\" QHD+ 240Hz", Weight: "2.5 kg" },
  },
  {
    slug: "hp-victus-15",
    name: "HP Victus 15 — Ryzen 5 / RTX 4050",
    brand: "HP",
    category: "laptops",
    price: 165000,
    stock: 7,
    description: "A clean-looking all-rounder for students and casual gaming.",
    specs: { Processor: "AMD Ryzen 5 8645HS", GPU: "RTX 4050 6GB", Memory: "16GB DDR5", Storage: "512GB NVMe", Screen: "15.6\" FHD 144Hz", Weight: "2.3 kg" },
  },

  // ── Monitors ────────────────────────────────────────────────────
  {
    slug: "samsung-odyssey-g5-27-qhd",
    name: "Samsung Odyssey G5 27\" QHD 180Hz",
    brand: "Samsung",
    category: "monitors",
    price: 62000,
    comparePrice: 68000,
    stock: 8,
    promo: true,
    description: "Sharp 1440p on a fast IPS panel with 180Hz and 1ms response for competitive play.",
    specs: { Size: "27\"", Resolution: "2560 × 1440", "Refresh rate": "180 Hz", Panel: "IPS", "Response time": "1 ms", Sync: "FreeSync Premium, G-Sync compatible" },
  },
  {
    slug: "asus-tuf-vg27aq3a",
    name: "ASUS TUF Gaming VG27AQ3A 27\" QHD 180Hz",
    brand: "ASUS",
    category: "monitors",
    price: 58000,
    stock: 9,
    description: "Fast IPS, 180Hz and ELMB Sync for crisp motion at 1440p.",
    specs: { Size: "27\"", Resolution: "2560 × 1440", "Refresh rate": "180 Hz", Panel: "Fast IPS", "Response time": "1 ms", Sync: "FreeSync Premium, G-Sync compatible" },
  },
  {
    slug: "dell-s2425h",
    name: "Dell S2425H 24\" FHD 100Hz",
    brand: "Dell",
    category: "monitors",
    price: 28000,
    stock: 14,
    description: "Slim 24-inch IPS monitor with built-in speakers. Ideal for home and office.",
    specs: { Size: "24\"", Resolution: "1920 × 1080", "Refresh rate": "100 Hz", Panel: "IPS", "Response time": "4 ms", Sync: "FreeSync" },
  },
  {
    slug: "lg-ultragear-27gs95qe-oled",
    name: "LG UltraGear 27GS95QE 27\" OLED 240Hz",
    brand: "LG",
    category: "monitors",
    price: 185000,
    stock: 2,
    featured: true,
    description: "True blacks and 0.03ms response on a 240Hz QHD OLED panel. The ultimate gaming display.",
    specs: { Size: "27\"", Resolution: "2560 × 1440", "Refresh rate": "240 Hz", Panel: "OLED", "Response time": "0.03 ms", Sync: "G-Sync compatible, FreeSync Premium Pro" },
  },

  // ── Peripherals ─────────────────────────────────────────────────
  {
    slug: "logitech-g502-x-plus",
    name: "Logitech G502 X Plus Wireless",
    brand: "Logitech",
    category: "peripherals",
    price: 29000,
    stock: 10,
    description: "The legendary G502 shape, now wireless with Lightspeed, hybrid optical switches and RGB.",
    specs: { Type: "Mouse", Connection: "Lightspeed wireless / USB-C", Sensor: "HERO 25K", Weight: "106 g", Battery: "Up to 130 h" },
  },
  {
    slug: "razer-deathadder-v3",
    name: "Razer DeathAdder V3",
    brand: "Razer",
    category: "peripherals",
    price: 17500,
    stock: 12,
    description: "Ultra-light 59g ergonomic esports mouse with Razer's Focus Pro 30K sensor.",
    specs: { Type: "Mouse", Connection: "Wired USB-C", Sensor: "Focus Pro 30K", Weight: "59 g" },
  },
  {
    slug: "razer-blackwidow-v4",
    name: "Razer BlackWidow V4 Mechanical Keyboard",
    brand: "Razer",
    category: "peripherals",
    price: 32000,
    stock: 6,
    description: "Clicky Razer Green switches, a multi-function roller, macro keys and Chroma RGB.",
    specs: { Type: "Keyboard", Connection: "Wired USB", Switches: "Razer Green (clicky)", Layout: "Full size", Lighting: "Chroma RGB" },
  },
  {
    slug: "logitech-g-pro-x-tkl",
    name: "Logitech G PRO X TKL Lightspeed",
    brand: "Logitech",
    category: "peripherals",
    price: 38000,
    stock: 5,
    description: "Pro-grade tenkeyless keyboard with wireless Lightspeed, Bluetooth and GX switches.",
    specs: { Type: "Keyboard", Connection: "Lightspeed / Bluetooth / USB-C", Switches: "GX Brown (tactile)", Layout: "Tenkeyless", Lighting: "LIGHTSYNC RGB" },
  },
  {
    slug: "hyperx-cloud-iii",
    name: "HyperX Cloud III Gaming Headset",
    brand: "HyperX",
    category: "peripherals",
    price: 19500,
    stock: 11,
    description: "Signature HyperX comfort with 53mm angled drivers and a clear noise-cancelling microphone.",
    specs: { Type: "Headset", Connection: "3.5mm / USB-C / USB-A", Drivers: "53 mm", Weight: "310 g", Microphone: "Detachable, noise-cancelling" },
  },

  // ── Networking ──────────────────────────────────────────────────
  {
    slug: "tp-link-archer-ax55",
    name: "TP-Link Archer AX55 Wi-Fi 6 Router",
    brand: "TP-Link",
    category: "networking",
    price: 14500,
    stock: 15,
    description: "AX3000 dual-band Wi-Fi 6 for fast, stable internet across the home.",
    specs: { Type: "Router", Standard: "Wi-Fi 6 (AX3000)", Bands: "Dual band", Ports: "4× Gigabit LAN, 1× Gigabit WAN" },
  },
  {
    slug: "tp-link-deco-x20-2pack",
    name: "TP-Link Deco X20 Mesh Wi-Fi 6 (2-pack)",
    brand: "TP-Link",
    category: "networking",
    price: 24000,
    stock: 7,
    description: "Whole-home mesh Wi-Fi with no dead zones. Easy setup in the Deco app.",
    specs: { Type: "Mesh system", Standard: "Wi-Fi 6 (AX1800)", Bands: "Dual band", Ports: "2× Gigabit per unit" },
  },
];

const categoryImage = (slug: string) => CATEGORIES.find((c) => c.slug === slug)?.image ?? "/logo-mark.png";

export const PRODUCTS: Product[] = DRAFTS.map(({ imageFrom, ...p }) => ({
  ...p,
  images: PRODUCT_IMAGES[imageFrom ?? p.slug] ?? [categoryImage(p.category)],
}));

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const getCategory = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
export const featuredProducts = () => PRODUCTS.filter((p) => p.featured).slice(0, 8);
export const promoProducts = () => PRODUCTS.filter((p) => p.promo);

// Distinct values of a spec within a set of products, sorted naturally so
// "8GB" comes before "16GB" and "650 W" before "1000 W".
export function facetValues(products: Product[], key: string): string[] {
  const values = new Set(products.map((p) => p.specs[key]).filter(Boolean));
  return [...values].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

const watts = (v?: string) => (v ? parseInt(v, 10) || 0 : 0);

// Parts that fit with `product`: matching socket, memory type, or a power
// supply with headroom for a graphics card. Empty for other categories.
export function compatibleWith(product: Product): { title: string; items: Product[] } | null {
  const { category, specs } = product;
  const pick = (cat: string, ok: (p: Product) => boolean) => PRODUCTS.filter((p) => p.category === cat && ok(p));

  if (category === "processors") {
    return { title: `${specs.Socket} motherboards`, items: pick("motherboards", (p) => p.specs.Socket === specs.Socket) };
  }
  if (category === "motherboards") {
    const memType = specs.Memory?.replace(/^\d+×\s*/, "");
    return {
      title: `${specs.Socket} processors and ${memType} memory`,
      items: [
        ...pick("processors", (p) => p.specs.Socket === specs.Socket),
        ...pick("memory", (p) => !!specs.Memory?.includes(p.specs.Type)),
      ],
    };
  }
  if (category === "memory") {
    return { title: `${specs.Type} motherboards`, items: pick("motherboards", (p) => !!p.specs.Memory?.includes(specs.Type)) };
  }
  if (category === "graphics-cards") {
    // Card + a high-end CPU + the rest of the system, the usual sizing rule.
    const need = watts(specs.Power) + 250;
    return { title: `Power supplies for this card (${need} W+)`, items: pick("power-supplies", (p) => watts(p.specs.Wattage) >= need) };
  }
  return null;
}
