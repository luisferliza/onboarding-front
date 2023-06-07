import { Link } from "react-router-dom";

function NonDecoratedLink(props) {
  return (
    <Link {...props} style={{ textDecoration: "none", color: "inherit", display: props.visible? "block": "none"  }}>
      {props.children}
    </Link>
  );
}

export { NonDecoratedLink };
