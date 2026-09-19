'use client'

import Header from "@/components/header";
import { FC } from "react";
interface IpageProps { };

export const page: FC<IpageProps> = (props) => {
    return (
        <div className="w-full h-screen bg-yellow-700">
            <Header />
        </div>
    );
}

export default page;

