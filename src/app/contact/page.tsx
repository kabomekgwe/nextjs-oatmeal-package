import { ContactPageClient } from "./ContactPageClient";
import { getContactPageContent } from "@/lib/wordpress/service";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContactPageContent();
  return {
    title: content?.page?.title || "Contact",
    description: content?.fields?.heroDescription || "Get in touch with us.",
  };
}

export default async function ContactPage() {
  const content = await getContactPageContent();
  const fields = content?.fields;

  return (
    <ContactPageClient
      headline={fields?.heroHeadline}
      description={fields?.heroDescription}
      contactInfo={fields?.contactInfo}
      formTitle={fields?.formTitle}
      formDescription={fields?.formDescription}
      successMessage={fields?.successMessage}
    />
  );
}
