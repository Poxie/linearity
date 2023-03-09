import { GroupSelector } from "@/components/team/GroupSelector";
import { useRouter } from "next/router";

export const GroupLayout: React.FC<{
    children: any;
}> = ({ children }) => {
    const { query: { teamId } } = useRouter();

    return(
        <>
            <GroupSelector teamId={Number(teamId)} /> 
            {children}
        </>
    )
}