export const setPageTitle = (page?: string) => {
  const appName = import.meta.env.VITE_APP_NAME;

  if (!page || page.toLowerCase() === "home") {
    document.title = appName;
  } else {
    document.title = `${page} | ${appName}`;
  }
};