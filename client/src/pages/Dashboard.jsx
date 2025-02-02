import { Outlet, redirect, useLoaderData, useNavigate, useNavigation } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import Wrapper from '../assets/wrappers/Dashboard'
import { BigSideBar, Navbar, SmallSidebar, Loading } from '../components'
import { useState, createContext, useContext, useEffect } from "react";
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';

const userQuery = {
  queryKey: ["user"],
  queryFn: async () => {
    const { data } = await customFetch("/users/current-user");
    return data;
  },
};

export const loader = (queryClient) => async() => {
  try {
    return await queryClient.ensureQueryData(userQuery)
  } catch (error) {
    return redirect('/');
  }
}

const DashboardContext = createContext();

const dashboard = ({isDarkThemeEnabled, queryClient}) => {
  const { user } = useQuery(userQuery)?.data;
  const navigate = useNavigate();
  const navigation = useNavigation()
  const isPageLoading = navigation.state === 'loading'
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled);
  const [isAuthError, setIsAuthError] = useState(false)

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme); 
    document.body.classList.toggle('dark-theme', newDarkTheme);
    localStorage.setItem('darkTheme', newDarkTheme)
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    navigate("/");
    await customFetch.get("/auth/logout");
    queryClient.invalidateQueries()
    toast.success("Logging out...");
  };

  customFetch.interceptors.response.use((response) => {
    return response
  }, (error) => {
    if(error?.response?.status === 401){
      setIsAuthError(true)
    }
    return Promise.reject(error)
  })

  useEffect(() => {
    if(!IsAuthError) return 
    logoutUser()
  }, [isAuthError])

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar/>
          <BigSideBar/>
          <div>
            <Navbar/>
            <div className="dashboard-page">
              {isPageLoading ? <Loading/> : <Outlet context={{user}}/>}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  )
}

export const useDashboardContext = () => useContext(DashboardContext);
export default dashboard
