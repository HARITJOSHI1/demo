"use client";

import useInfinityScroll from "@/global/hook/useInfinityScroll";
import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import { StarWarsData } from "@/server/routers/types/types";
import { Badge } from "../ui/badge";
import clsx from "clsx";

type TProps = {
  crew: StarWarsData[];
  hasMore: boolean;
  error?: string;
  next?: string;
};

const CrewList = ({ crew, hasMore, next }: TProps) => {
  const [data, setData] = useState<StarWarsData[]>([]);
  const { setInfiniteScroll, loading, setLoading } = useInfinityScroll({
    hasMore,
  });

  const memoCrew = useMemo(() => {
    return crew;
  }, [next]);

  useEffect(() => {
    setLoading(false);
    setData([...data, ...crew]);
  }, [memoCrew]);

  return (
    <ul className="h-50 overflow-y-scroll flex flex-col gap-y-2 sm:grid sm:grid-cols-2 sm:gap-4 md:grid md:grid-cols-3 md:gap-4">
      {data.map((m, i) => {
        return (
          <Card
            key={i}
            className="mb-4"
            ref={i === data.length - 1 ? setInfiniteScroll : null}
          >
            <div className="w-100 flex flex-row justify-end p-2">
              <Badge
                className={clsx([
                  "bg-blue-500",
                  { "bg-red-600": i === data.length - 1 },
                ])}
              >
                Public
              </Badge>
            </div>

            <CardHeader className="flex flex-col justify-between">
              <AspectRatio ratio={16 / 9}>
                <Image
                  src="https://picsum.photos/1080/720"
                  alt="Product Image"
                  fill
                />
              </AspectRatio>
              <CardTitle>
                <span className="text-lg text-blue-950">{m.name}</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col justify-between">
              <div>
                <span>Height: </span>
                <span>{m.height}</span>
              </div>

              <div>
                <span>Mass: </span>
                <span>{m.mass}</span>
              </div>

              <div>
                <span>Skin Color: </span>
                <span>{m.skin_color}</span>
              </div>

              <div>
                <span>Eye Color: </span>
                <span>{m.eye_color}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
      {loading && hasMore && <>Loading</>}
    </ul>
  );
};

export default CrewList;
