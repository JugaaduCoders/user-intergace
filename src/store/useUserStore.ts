import { User } from "@/types";
import { SignUpFormData } from "@/types/signup";
import { request, requestHandler } from "@/utils/request";
import {
  getTokenFromLS,
  getUserFromLS,
  removeItem,
  setItem,
  setUserInLS,
} from "@/utils/storage/localStorage";
import { defineStore } from "pinia";
import { reactive } from "vue";
import { useMessageStore } from "./useMessageStore";

interface UserState {
  user: User;
  token: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface UpdatePasswordPayload {
  password: string;
  rePassword: string;
}

export const useUserStore = defineStore("user", {
  state: (): UserState =>
    reactive({
      user: {} as User,
      token: "",
    }),

  getters: {
    getUser: (state): User => state.user,
    getUserId: (state): number => state.user.id,
    getToken: (state): string => state.token || "",
  },

  actions: {
    init() {
      if (typeof window !== "undefined") {
        this.checkLocalToken();
      }
    },

    async checkLocalToken() {
      if (typeof window !== "undefined") {
        const token = getTokenFromLS();
        this.token = token ?? "";
        let user = getUserFromLS();
        if (token && user && user.id) {
          await requestHandler<User>("GET", "/api/user/" + user.id).then(
            (res) => {
              if (res.success) {
                user = res.payload;
                setUserInLS(user);
              }
            }
          );
        } else this.logout();
      }
    },

    async login(payload: LoginPayload) {
      const resp = await requestHandler<{ authToken: string; user: User }>(
        "POST",
        "/api/auth/login",
        payload
      );
      if (resp.success) {
        const { payload } = resp;
        this.user = payload.user;
        this.token = payload.authToken;
        setItem("user", JSON.stringify(payload.user));
        setItem("token", payload.authToken);
      }
      return resp;
    },

    async logout() {
      this.token = "";
      this.user = {} as User;
      removeItem("token");
      removeItem("user");
    },

    async signup(payload: SignUpFormData) {
      const res = await requestHandler<{ authToken: string; user: User }>(
        "POST",
        "/api/auth/signup",
        payload
      );
      if (res.success) {
        const { payload } = res;
        this.user = payload.user;
        this.token = payload.authToken;
        setItem("user", JSON.stringify(payload.user));
        setItem("token", payload.authToken);
      }
    },

    async updatePassword(
      payload: UpdatePasswordPayload
    ): Promise<boolean | void> {
      let response = false;
      let error = "";

      if (payload?.password !== payload?.rePassword) {
        error = "Password and Re-password must be the same!";
      } else if (payload?.password.length < 5) {
        error = "Password must be at least 5 characters!";
      }

      if (error) {
        useMessageStore().setError({ error });
        return;
      }

      await request("PUT", "/api/user/update", payload).then((res) => {
        if (res) {
          response = true;
          this.token = "res";
          setItem("token", res);
        }
      });

      return response;
    },
  },
});
