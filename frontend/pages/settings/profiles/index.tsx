import { Profiles } from "@/components/profiles";
import { SidebarLayout } from "@/layouts/sidebar";
import UserSettingsLayout from "@/layouts/user-settings";
import { NextPageWithLayout } from "@/pages/_app";

const ProfilesPage: NextPageWithLayout = () => <Profiles />;

ProfilesPage.getLayout = page => (
    <SidebarLayout>
        <UserSettingsLayout>
            {page}
        </UserSettingsLayout>
    </SidebarLayout>
)

export default ProfilesPage;