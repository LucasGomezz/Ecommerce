export const bindClassMethods = <T extends object>(obj: T): void => {
  Object.getOwnPropertyNames(Object.getPrototypeOf(obj)).forEach((key) => {
    let attribute = obj[key as keyof T];
    if (typeof attribute === "function") {
      attribute = attribute.bind(obj);
    }
    obj[key as keyof T] = attribute;
  });
};
