export function checkCurrentEnvironment() {
  if (process.env.NODE_ENV === "production") {
    return "product";
  } else {
    return "dev";
  }
}
