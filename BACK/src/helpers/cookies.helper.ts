import { UserTokens } from "../dto/user.dto";

export abstract class CookiesHelper {
    public static UpdateCognitoCookies(res: any, userTokens: UserTokens) {
        res.cookie("access_token", userTokens.access_token, { httpOnly: true, sameSite: "strict", maxAge: this.toMilliseconds(1, "hours") });
        res.cookie("id_token", userTokens.id_token, { httpOnly: true, sameSite: "strict", maxAge: this.toMilliseconds(30, "days") });
        res.cookie("refresh_token", userTokens.refresh_token, { httpOnly: true, sameSite: "strict", maxAge: this.toMilliseconds(30, "days") });
    }

    public static ClearCookies(res: any) {
        res.clearCookie("access_token");
        res.clearCookie("id_token");
        res.clearCookie("refresh_token");
    }

    private static toMilliseconds(value: number, type: "seconds" | "minutes" | "hours" | "days"): number {
        const second = 1000;
        const minute = 60 * second;
        const hour = 60 * minute;
        const day = 24 * hour;
        switch (type) {
            case "seconds":
                return value * second;
            case "minutes":
                return value * minute;
            case "hours":
                return value * hour;
            case "days":
                return value * day;
        }
    }
}