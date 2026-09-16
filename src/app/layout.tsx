import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Skillspoints",
    description: "Skillspoints application",
};


type Props = {
    children: ReactNode
}

const layout = (props: Props) => {

    return (
        <div className="">
            {props.children}
        </div>
    )

}

export default layout;
