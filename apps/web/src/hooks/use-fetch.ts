import { useEffect, useReducer } from "react";

type Args<TData> = {
  fetchFn: () => Promise<TData>;
};

export function useFetch<TData>(args: Args<TData>) {
  const [state, dispatch] = useReducer(reducer, { fetchState: "idle" });

  useEffect(() => {}, []);

  return {} as const;
}

type Action = { type: "ON_"; payload: {} };

type State = {
  fetchState: "idle" | "error" | "loading" | "success";
};

function reducer(state: State, action: Action): State {
  const { type } = action;

  switch (type) {
    default: {
      return state;
    }
  }
}
