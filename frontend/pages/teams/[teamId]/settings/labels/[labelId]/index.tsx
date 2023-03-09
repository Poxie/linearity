import { LabelInfo } from "@/components/label-info";
import { SidebarLayout } from "@/layouts/sidebar";
import { TeamLayout } from "@/layouts/team";
import TeamSettingsLayout from "@/layouts/team-settings";
import { NextPageWithLayout } from "@/pages/_app";

const LabelInfoPage: NextPageWithLayout = () => <LabelInfo />;

LabelInfoPage.getLayout = page => (
    <SidebarLayout>
        <TeamLayout>
            <TeamSettingsLayout>
                {page}
            </TeamSettingsLayout>
        </TeamLayout>
    </SidebarLayout>
)

export default LabelInfoPage;