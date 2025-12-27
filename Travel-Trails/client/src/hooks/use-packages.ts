import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function usePackages(filters?: { category?: string; featured?: boolean }) {
  // Construct query key based on filters to ensure caching works correctly
  const queryKey = [api.packages.list.path, filters];
  
  // Construct URL with query parameters
  const params: Record<string, string> = {};
  if (filters?.category) params.category = filters.category;
  if (filters?.featured !== undefined) params.featured = String(filters.featured);
  
  const queryString = new URLSearchParams(params).toString();
  const url = `${api.packages.list.path}${queryString ? `?${queryString}` : ''}`;

  return useQuery({
    queryKey,
    queryFn: async () => {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch packages");
      return api.packages.list.responses[200].parse(await res.json());
    },
  });
}

export function usePackage(id: number) {
  return useQuery({
    queryKey: [api.packages.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.packages.get.path, { id });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch package details");
      return api.packages.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}
