"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React, { useState } from "react";
import { trpc } from "@/app/_trpc/client";
import superjson from "superjson";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const ReactQueryDevtoolsProduction = React.lazy(() =>
  import("@tanstack/react-query-devtools/build/modern/production.js").then(
    (d) => ({
      default: d.ReactQueryDevtools,
    })
  )
);

export const TRPCSetupProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 5,
          },
        },
      })
  );
  const [showProdDevtools, setShowProdDevtools] = React.useState(false);

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:3000/api/trpc",
          transformer: superjson,
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
        {showProdDevtools ? (
          <React.Suspense fallback={'Loading react devtools for prod...'}>
            <ReactQueryDevtoolsProduction />
          </React.Suspense>
        ) : (
          <ReactQueryDevtools initialIsOpen />
        )}
      </QueryClientProvider>
    </trpc.Provider>
  );
};
