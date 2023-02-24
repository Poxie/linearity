import { GroupSelector } from "./GroupSelector"

export const Team: React.FC<{
    params: { teamId: number };
}> = ({ params: { teamId } }) => {
    return(
        <div>
            <GroupSelector teamId={teamId} />
            teammm
        </div>
    )
}