import React from "react";
import { LayoutWrapper } from "./styles";
import { SEO } from "../SEO";
export function Layout({ title, description, children }) {
  return (
    <LayoutWrapper>
      <SEO title={title} description={description} />
      <main>{children}</main>
    </LayoutWrapper>
  );
}
