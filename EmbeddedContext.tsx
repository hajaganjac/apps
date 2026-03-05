import React from "react";

export const EmbeddedContext = React.createContext(false);

export function useEmbedded() {
  return React.useContext(EmbeddedContext);
}
