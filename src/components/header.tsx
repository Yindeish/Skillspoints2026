import { FC } from "react";
interface IHeaderProps { };

export const Header: FC<IHeaderProps> = (props) => {
    return (
        <div className="w-full h-[97px] bg-white">
            <img src="/images/skillspoints-logo.png" alt="" />

            <div></div>
        </div>
    );
}
