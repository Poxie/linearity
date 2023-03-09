import { SettingsInvites } from "@/components/settings-invites";
import { SidebarLayout } from "@/layouts/sidebar";
import { TeamLayout } from "@/layouts/team";
import TeamSettingsLayout from "@/layouts/team-settings";
import { NextPageWithLayout } from "@/pages/_app";

const SettingsInvitesPage: NextPageWithLayout = () => <SettingsInvites />;

SettingsInvitesPage.getLayout = page => (
    <SidebarLayout>
        <TeamLayout>
            <TeamSettingsLayout>
                {page}
            </TeamSettingsLayout>
        </TeamLayout>
    </SidebarLayout>
)

export default SettingsInvitesPage;