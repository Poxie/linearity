import { SettingsLabels } from "@/components/settings-labels";
import { SidebarLayout } from "@/layouts/sidebar";
import { TeamLayout } from "@/layouts/team";
import TeamSettingsLayout from "@/layouts/team-settings";
import { NextPageWithLayout } from "@/pages/_app";

const SettingsLabelsPage: NextPageWithLayout = () => <SettingsLabels />;

SettingsLabelsPage.getLayout = page => (
    <SidebarLayout>
        <TeamLayout>
            <TeamSettingsLayout>
                {page}
            </TeamSettingsLayout>
        </TeamLayout>
    </SidebarLayout>
)

export default SettingsLabelsPage;