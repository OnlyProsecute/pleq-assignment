import Main from "@/components/Main";
import Dashboard from "@/components/Dashboard";
import Login from "@/components/Login";

export const metadata = {
    title: "Pleq - Dashboard",
  };

const DashboardPage = () => {
  const isAuthenticated = true;

  let children = (
      <Login/>
  )

  if(isAuthenticated) {
      children = (
          <Dashboard/>
      )
  }

  return (
    <Main>
        {children}
    </Main>
  )
}

export default DashboardPage