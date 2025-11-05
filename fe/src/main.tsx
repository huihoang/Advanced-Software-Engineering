import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";

import {
  AntDesignConfigProvider,
  MessageProvider,
  ReactQueryClientProvider,
  UserContextProvider,
} from "./components/providers";

export default function Main() {
  return (
    <StrictMode>
      <AntDesignConfigProvider>
        <MessageProvider>
          <ReactQueryClientProvider>
            <UserContextProvider>
              <App />
            </UserContextProvider>
          </ReactQueryClientProvider>
        </MessageProvider>
      </AntDesignConfigProvider>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")!).render(<Main />);
