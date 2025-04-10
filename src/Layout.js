import './index.css';

function Layout() {
  return (
    <div style={{display: "flex", justifyContent: "center", width: "100%", position: "absolute", bottom: "0%"}}>
      <p style={{opacity: "0.7"}}>
        Made by  
        <span style={{color: "rgb(112, 131, 233)", cursor: "pointer"}} onClick={() => window.location.href = "https://github.com/ochocss"}> chocs </span>
      </p>
    </div>
  )
}

export default Layout;