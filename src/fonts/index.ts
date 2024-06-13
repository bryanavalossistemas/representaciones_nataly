import { GeistSans } from "geist/font/sans";
import { Inter, Montserrat_Alternates } from "next/font/google";

export const fontSans = GeistSans;

export const inter = Inter({ subsets: ["latin"] });

export const titleFont = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["500", "700"],
});
