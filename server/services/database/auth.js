export default ({ user }) => {
  const isAuthenticated = () => {
    return user != null;
  };

  const isAdmin = () => {
    return isAuthenticated() && user.roles.includes("admin");
  };

  const isSuperAdmin = () => {
    return isAuthenticated() && user.roles.includes("superadmin");
  };

  return {
    isAuthenticated,
    isAdmin,
    isSuperAdmin,
  };
};
