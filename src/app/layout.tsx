import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { Geist } from "next/font/google";
import { Toaster } from "@/components/ui/sonner"

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "Skillspoints",
  description: "Skillspoints application",
};

type Props = {
  children: ReactNode;
};

const layout = (props: Props) => {
  return <div className="">
    <Toaster position="top-right" />
    {props.children}
  </div>;
};

export default layout;
