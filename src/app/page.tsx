import type { Metadata } from "next";
import ComingSoonWeskale from "./component/ComingSoonWeskale";

export const metadata: Metadata = {
    title: "Weskale — Measured creativity. Calculated impact.",
    description:
        "Premium, performance-driven experiences by Weskale ID-Brandlab, Weskale Digital, and Weskale Influence.",
    openGraph: {
        type: "website",
        title: "Weskale — Measured creativity. Calculated impact.",
        description:
            "Premium, performance-driven experiences by Weskale ID-Brandlab, Weskale Digital, and Weskale Influence.",
        url: "https://www.weskaleagency.com",
        siteName: "Weskale",
        images: [{ url: "/og/weskale-og.jpg", width: 1200, height: 630, alt: "Weskale brand preview" }],
    },
    twitter: { card: "summary_large_image" },
    metadataBase: new URL("https://www.weskaleagency.com"),
    themeColor: "#000000",
};

export default function Page() {
    return <ComingSoonWeskale />;
}
