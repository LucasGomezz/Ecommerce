
export abstract class LocalStorageHelper {
    public static get(key: string): any {
        return JSON.parse(localStorage.getItem(key)!);
    }

    public static save(key: string, data: any) {
        localStorage.setItem(key, JSON.stringify(data));
    }
}
