import {
  Footer,
  NavBar,
  Guide,
  Transaction,
  Dashboard,
  MyWallet,
  Reverse,
} from "./components";

const App = () => {
  let component;
  switch (window.location.pathname) {
    case "/homepage":
      component = (
        <>
          <Dashboard />
          <Guide />
          <Transaction />
        </>
      );
      break;
    case "/mywallet":
      component = (
        <>
          <MyWallet />
          <Reverse />
        </>
      );
      break;
    case "/history":
      component = <Transaction />;
      break;
  }
  return (
    <div className="min-h-screen">
      <div className="dashboard-bg">
        <NavBar />
        {component}
      </div>
      <Footer />
    </div>
  );
};

export default App;
