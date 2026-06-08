type OgData = {
  image?: string;
};

export async function fetchOgImage(url: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.microlink.io?url=${encodeURIComponent(url)}&meta=false`,
      { next: { revalidate: 86400 } } // cache for 24 hours
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { data?: OgData };
    return data?.data?.image ?? null;
  } catch {
    return null;
  }
}
