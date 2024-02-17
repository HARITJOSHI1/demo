import CrewList from "@/components/client/crew-list";
import { StarWarsData } from "@/server/routers/types/types";
import { api } from "@/server/server";
import { TRPCError } from "@trpc/server";
import { cookies } from "next/headers";

const page = async () => {
  const response = await api.starwarsPublic({
    page: Number(cookies().get("page")?.value),
  });

  let error;
  let crew: StarWarsData[] = [];
  let hasMore = false;
  let next;

  if (response instanceof TRPCError) error = response.message;
  else if (response) {
    crew = response.results;
    hasMore = response.next ? true : false;
    next = response.next;
  }

  return (
    <section className="p-2 md:p-5">
      <CrewList hasMore={hasMore} crew={crew} error={error} next={next} />
    </section>
  );
};

export default page;
