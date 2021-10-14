import * as React from "react";
import SSOTrender from "../components/SSOTrender";
import SSOTrenderRepoTwo from "../components/SSOTrenderRepoTwo";
const IndexPage = () => {
  return (
    <>
      <h1>First single source of truth </h1>
      <SSOTrender />
      <h1>Second single source of truth</h1>
      <SSOTrenderRepoTwo />
    </>
  );
};

export default IndexPage;
