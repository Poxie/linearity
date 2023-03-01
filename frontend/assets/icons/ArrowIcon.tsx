import { CSSProperties } from "react";

export const ArrowIcon: React.FC<{
    className?: string;
    style?: CSSProperties;
}> = ({ className, style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} style={style} viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>
)