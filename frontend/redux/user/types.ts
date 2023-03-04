import { User } from "@/types"

export type UserState = {
    user: User | null;
    token: string | null;
    loading: boolean;
}