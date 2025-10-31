import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { PropsWithChildren } from "react";
import { useCallback, useState } from "react";

import { useMessage } from "@/hooks/common";

import { HTTP_STATUS, PATH, TOKEN_NAME } from "@/constants";
import type { ExceptionDto } from "@/types/common";
import { removeCookie } from "@/utils/cookie-actions";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError<ExceptionDto>;
  }
}

const ReactQueryClientProvider = ({ children }: PropsWithChildren) => {
  const message = useMessage();

  const onError = useCallback((error: AxiosError<ExceptionDto>) => {
    if (error?.response?.status === HTTP_STATUS.UNAUTHORIZED) {
      removeCookie(TOKEN_NAME.ACCESS_TOKEN);
      location.href = PATH.LOGIN;
    }
  }, []);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
            staleTime: 30000,
          },
        },
        queryCache: new QueryCache({ onError }),
        mutationCache: new MutationCache({ onError }),
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryClientProvider;
