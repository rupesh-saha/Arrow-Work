import BrowseTasksClient from "@/components/BrowseTasksClient";

export default async function BrowseTasksPage({ searchParams }) {
  const params = await searchParams;
  
  const search = params.search || "";
  const category = params.category || "All";
  const page = parseInt(params.page) || 1;

  const queryParams = new URLSearchParams({ search, category, page, limit: 9 }).toString();

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/api/tasks?${queryParams}`, { cache: 'no-store' });
  const data = res.ok ? await res.json() : { tasks: [], totalPages: 0, currentPage: 1 };

  return <BrowseTasksClient initialData={data} />;
}