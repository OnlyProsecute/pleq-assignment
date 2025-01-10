import Login from './Login';
import Main from './Main';

export default function Dashboard() {
    const isAuthenticated = false;

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
