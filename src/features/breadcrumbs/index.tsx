import { usePaths } from "./model/usePaths";

function Breadcrumbs() {
  const crumbs = usePaths();
  console.log("crumbs :>> ", crumbs);
  return <div>Breadcrumbs</div>;
}

export default Breadcrumbs;
