import { Account } from "@/components/account";
import { SidebarLayout } from "@/layouts/sidebar";
import UserSettingsLayout from "@/layouts/user-settings";
import { NextPageWithLayout } from "../_app";

const AccountPage: NextPageWithLayout = () => <Account />;

AccountPage.getLayout = page => (
    <SidebarLayout>
        <UserSettingsLayout>
            {page}
        </UserSettingsLayout>
    </SidebarLayout>
)

export default AccountPage;