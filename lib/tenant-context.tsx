"use client";

import { createContext, useContext, ReactNode } from "react";

export interface TenantContextType {
  tenant: {
    id: string;
    slug: string;
    name: string;
  } | null;
}

const TenantContext = createContext<TenantContextType>({
  tenant: null,
});

export function TenantProvider({
  children,
  tenant,
}: {
  children: ReactNode;
  tenant: TenantContextType["tenant"];
}) {
  return (
    <TenantContext.Provider value={{ tenant }}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error("useTenant must be used within TenantProvider");
  }
  return context;
}

