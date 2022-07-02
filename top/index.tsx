import { FC, Suspense } from "react";
import { createRoot } from "react-dom/client";
const App: FC = () => {
  return (
    <div>
      <h1>Top Page</h1>
      <p>This is monorepo example app.</p>
      <p>goto <a href="./about.html">About</a> page</p>
      <p>goto <a href="./colors.html">Colors</a> page</p>
      <h2>repos ↓ this is Suspense component!</h2>
      <Repos />
    </div>
  );
}

function fetchRepos() {
  const responsePromise = fetch("https://api.github.com/users/naoki-tomita/repos?sort=updated").then(it => it.json());
  let result: any;
  let status: "pending" | "error" | "success" = "pending";

  const promise = new Promise<void>((ok, ng) => {
    responsePromise.then(response => {
      status = "success";
      result = response;
      console.log(response);
      ok();
    });
  });

  return function () {
    switch (status) {
      case "pending":
        throw promise;
      case "error":
        throw result;
      case "success":
        return result;
    }
  }
}

const reader = fetchRepos();
const ReposComponent: FC = () => {
  const result = reader();
  return (
    <ul>
      {result.slice(0, 5).map(it => <li key={it.id}>{it.name}</li>)}
    </ul>
  );
}

const Repos: FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReposComponent />
    </Suspense>
  );
}

const root = createRoot(document.body);
root.render(<App />);
