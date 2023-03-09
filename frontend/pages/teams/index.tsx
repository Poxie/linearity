import { TeamSelection } from "@/components/team-selection";
import { SidebarLayout } from "@/layouts/sidebar";
import { NextPageWithLayout } from "../_app";

const Teams: NextPageWithLayout = () => <TeamSelection />

Teams.getLayout = page => (
    <SidebarLayout>
        {page}
    </SidebarLayout>
)

export default Teams;