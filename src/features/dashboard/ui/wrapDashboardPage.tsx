import { DashboardLayout } from "./DashboardLayout";

export function wrapDashboardPage<P extends object>(
  Component: React.ComponentType<P>
) {
  return function WrappedDashboardPage(props: P) {
    return (
      <DashboardLayout>
        <Component {...props} />
      </DashboardLayout>
    );
  };
}
