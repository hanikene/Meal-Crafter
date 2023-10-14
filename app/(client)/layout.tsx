import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Footer from "@/app/components/Footer";
import QueryClientProvider from "@/app/components/QueryClientProvider";
import "@/app/globals.css";
import Navbar from "../components/Navbar";
import ErrorModal from "../components/ErrorModal";
import ErrorProvider from "../hooks/ErrorContext";
import MealProvider from "../hooks/MealContext";

const inter = Poppins({
  weight: ["400", "600", "700", "900"],
  style: "normal",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Meal crafter",
  description: "Use the power of AI to get delicious recipes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  resultModal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " text-black bg-neutral-50"}>
        <Navbar />
        <MealProvider>
          <ErrorProvider>
            <ErrorModal />
            <QueryClientProvider>{children}</QueryClientProvider>
          </ErrorProvider>
        </MealProvider>
        <Footer />
      </body>
    </html>
  );
}
