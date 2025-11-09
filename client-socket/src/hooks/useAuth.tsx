const useAuth = () => {
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const setUserId = (id: string) => localStorage.setItem("userId", id);
  const setUserName = (name: string) => localStorage.setItem("userName", name);

  return { userId, userName, setUserId, setUserName };
};

export default useAuth;
