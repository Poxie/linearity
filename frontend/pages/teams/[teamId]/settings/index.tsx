import { Settings } from "@/components/settings";
import { SidebarLayout } from "@/layouts/sidebar";
import { TeamLayout } from "@/layouts/team";
import TeamSettingsLayout from "@/layouts/team-settings";
import { NextPageWithLayout } from "@/pages/_app";

export const SettingsPage: NextPageWithLayout = () => <Settings />;

SettingsPage.getLayout = page => (
    <SidebarLayout>
        <TeamLayout>
            <TeamSettingsLayout>
                {page}
            </TeamSettingsLayout>
        </TeamLayout>
    </SidebarLayout>
)

export default SettingsPage;