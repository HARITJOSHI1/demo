"use client";

import { createCookie } from "@/app/action";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";

type TProps = {
  hasMore: boolean;
};

const useInfinityScroll = ({ hasMore }: TProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    createCookie(`${page}`);
  }, []);

  useEffect(() => {
    if (loading && hasMore) {
      setPage((prev) => {
        createCookie(String(prev + 1));
        return prev + 1;
      });
    }
  }, [loading]);

  const observer = useRef<IntersectionObserver | null>(null);
  const setInfiniteScroll = useCallback<(node: HTMLElement | null) => void>(
    (node) => {
      if (observer.current) observer.current.disconnect();

      const intrsObserver = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setLoading(true);
            router.refresh();
          }
        },
        {
          rootMargin: "20px",
        }
      );

      if (node) intrsObserver.observe(node);
    },
    [hasMore]
  );

  return { setInfiniteScroll, loading, setLoading };
};

export default useInfinityScroll;
