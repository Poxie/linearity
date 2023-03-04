import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectToken = (state: RootState) => state.user.token;
export const selectUser = (state: RootState) => state.user.user;
export const selectUserLoading = (state: RootState) => state.user.loading;

export const selectUserInvites = (state: RootState) => state.user.invites;
export const selectUserInviteCount = createSelector(
    [selectUserInvites],
    invites => invites.filter(invite => invite.status === 'pending').length
)