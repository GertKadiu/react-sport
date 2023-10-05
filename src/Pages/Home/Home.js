import NavBar from "../../Components/NavBar/NavBar";
import Fab from "../../Components/Fab/Fab";
import { FormControl } from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import SearchIcon from "@mui/icons-material/Search";
import classes from "./Home.module.css";
import { HomeAction } from "../../hooks/Action";


function Home() {

const { displayedPostData,  posts, handleLoadMore, navigate, displayedPosts } = HomeAction()
  return (
    <div className={classes.contanier}>
      <div className={classes.navBar}>
        <NavBar
          isNavbar
          Icon={
            <PermIdentityIcon
              onClick={() => navigate("/profile")}
              sx={{ color: "white" }}
            />
          }
          SearchIcon={
            <SearchIcon
              sx={{ color: "white", marginTop: "3px", marginLeft: "7px" }}
            />
          }
        />
      </div>
      <FormControl
        sx={{ width: "340px", marginBottom: "4px", marginTop: "66px" }}
      ></FormControl>
      {displayedPostData}
      <div style={{ marginBottom: "20px" }}>
        {displayedPosts < posts.length ? (
          <button onClick={handleLoadMore} className={classes.loadmore}>
            Load More
          </button>
        ) : null}
      </div>
      <Fab />
    </div>
  );
}

export default Home;
