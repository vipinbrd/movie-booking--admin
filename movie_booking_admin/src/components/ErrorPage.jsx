import { useRouteError } from "react-router-dom";

export function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">Oops!</h1>
        <p className="text-xl text-gray-700 mb-2">Something went wrong.</p>
        {error?.statusText || error?.message ? (
          <p className="text-sm text-gray-500">{error.statusText || error.message}</p>
        ) : null}
        <a
          href="/"
          className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Go to Home
        </a>
      </div>
    </div>
  );
}
