import { SettingsMembers } from "@/components/settings-members";
import { SidebarLayout } from "@/layouts/sidebar";
import { TeamLayout } from "@/layouts/team";
import TeamSettingsLayout from "@/layouts/team-settings";
import { NextPageWithLayout } from "@/pages/_app";

const SettingsMembersPage: NextPageWithLayout = () => <SettingsMembers />;

SettingsMembersPage.getLayout = page => (
    <SidebarLayout>
        <TeamLayout>
            <TeamSettingsLayout>
                {page}
            </TeamSettingsLayout>
        </TeamLayout>
    </SidebarLayout>
)

export default SettingsMembersPage;