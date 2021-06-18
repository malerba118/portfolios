export default ({ user }) => {
  const isAuthenticated = () => {
    return user != null;
  };

  const isAdmin = () => {
    return isAuthenticated() && user.roles.includes("admin");
  };

  return {
    isAuthenticated,
    isAdmin,
  };
};
