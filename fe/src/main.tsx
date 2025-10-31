import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";

import {
  AntDesignConfigProvider,
  MessageProvider,
  ReactQueryClientProvider,
} from "./components/providers";

export default function Main() {
  return (
    <StrictMode>
      <AntDesignConfigProvider>
        <MessageProvider>
          <ReactQueryClientProvider>
            <App />
          </ReactQueryClientProvider>
        </MessageProvider>
      </AntDesignConfigProvider>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")!).render(<Main />);
