import type { Models } from "appwrite";
import { href, useNavigate } from "react-router-dom";
import { ROUTES } from "../../config/routes";
import { ErrorMessage } from "./ErrorMessage";

type PageBoundaryProps = {
  item?: Models.Document;
  userId?: string;
  isLoggedIn: boolean;
  hasAccess: boolean;
  skeleton: React.ReactNode;
  isLoading: boolean;
  error?: unknown;
  children: (safeItem: Models.Document) => React.ReactNode;
};

export default function PageBoundary({
  item,
  hasAccess,
  userId,
  isLoggedIn,
  skeleton,
  isLoading,
  error,
  children,
}: PageBoundaryProps) {
  const navigate = useNavigate();

  if (error)
    return (
      <ErrorMessage
        variant="not-found"
        withButton={isLoggedIn}
        action={() => navigate(href(ROUTES.DASHBOARD, { userId: userId! }))}
      />
    );
  if (isLoading) return skeleton;
  if (!hasAccess)
    return (
      <ErrorMessage
        variant="no-access"
        withButton={isLoggedIn}
        action={() => navigate(href(ROUTES.DASHBOARD, { userId: userId! }))}
      />
    );

  if (item) return children(item);
}
