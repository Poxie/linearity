import { Group } from "@/components/group";
import { GroupLayout } from "@/layouts/group";
import { SidebarLayout } from "@/layouts/sidebar";
import { TeamLayout } from "@/layouts/team";
import { NextPageWithLayout } from "@/pages/_app";
import { useRouter } from "next/router";

const GroupPage: NextPageWithLayout = () => {
    const { teamId, groupId } = useRouter().query as {
        teamId: string;
        groupId: string;
    };

    return(
        <Group 
            teamId={Number(teamId)}
            groupId={Number(groupId)}
        />
    )
}

GroupPage.getLayout = page => (
    <SidebarLayout>
        <TeamLayout>
            <GroupLayout>
                {page}
            </GroupLayout>
        </TeamLayout>
    </SidebarLayout>
)

export default GroupPage;