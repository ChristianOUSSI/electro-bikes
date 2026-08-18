import { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { locales } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://evolt-bikes.com";
  const sitemapEntries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    // Main pages
    sitemapEntries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    });
    sitemapEntries.push({
      url: `${baseUrl}/${locale}/catalogue`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    });
    sitemapEntries.push({
      url: `${baseUrl}/${locale}/catalogue?type=velo`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
    sitemapEntries.push({
      url: `${baseUrl}/${locale}/catalogue?type=moto`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });

    // Product pages
    products.forEach((product) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/product/${product.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.85,
      });
    });
  });

  return sitemapEntries;
}
