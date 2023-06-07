import { css } from "@emotion/react";
import { display } from "@mui/system";
import { FadeLoader } from "react-spinners";

const override = css`
  margin: 50px;
`;
function Loading({ loading, phrase }) {  
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
        opacity: "80%",
        position: "fixed",        
        top: 0,
        left: 0,
        display: loading ? "flex" : "none",
        zIndex: 10000,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <div style={{marginRight: "45px"}}>
          <FadeLoader
            color="#aebd36"
            loading={loading}
            css={override}
            size={150}
          />
        </div>
        <h3 style={{ color: "white", marginTop: "75px" }}>{phrase}</h3>
      </div>
    </div>
  );
}

export { Loading };
