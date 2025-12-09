import { useEffect, useReducer } from "react";

const initialState = {
  status: "idle", // "idle" | "loading" | "resolved" | "rejected"
  data: null,
  error: null,
};

const validTransitions = {
  idle: ["FETCH_INIT"],
  loading: ["FETCH_SUCCESS", "FETCH_FAILURE"],
  resolved: ["FETCH_INIT"],
  rejected: ["FETCH_INIT"],
};

function fetchReducer(state, action) {
  const allowedActions = validTransitions[state.status];

  if (!allowedActions?.includes(action.type)) {
    return state; // ignore invalid state transitions
  }

  switch (action.type) {
    case "FETCH_INIT": {
      return {
        ...state,
        status: "loading",
        data: null,
        error: null,
      };
    }

    case "FETCH_SUCCESS": {
      return {
        ...state,
        status: "resolved",
        data: action.payload,
        error: null,
      };
    }

    case "FETCH_FAILURE": {
      return {
        ...state,
        status: "rejected",
        data: null,
        error: action.payload,
      };
    }

    default:
      return state;
  }
}

export default function UserProfile({ userId }) {
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const { status, data, error } = state;

  useEffect(() => {
    if (!userId) return; // neu chua co id thi khoi fetch

    let ignore = false;

    async function fetchUser() {
      dispatch({ type: "FETCH_INIT" });

      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );

        if (!res.ok) {
          throw new Error("Network error");
        }

        const json = await res.json();

        if (!ignore) {
          dispatch({ type: "FETCH_SUCCESS", payload: json });
        }
      } catch (err) {
        if (!ignore) {
          dispatch({
            type: "FETCH_FAILURE",
            payload: err.message || "Unknown error",
          });
        }
      }
    }

    fetchUser();

    return () => {
      ignore = true; // tranh set state sau khi unmount
    };
  }, [userId]);

  if (!userId) {
    return <p>Nhap user ID de bat dau.</p>;
  }

  if (status === "idle") {
    return <p>San sang fetch du lieu...</p>;
  }

  if (status === "loading") {
    return <p>Dang tai user...</p>;
  }

  if (status === "rejected") {
    return <p style={{ color: "red" }}>Loi: {error}</p>;
  }

  if (status === "resolved") {
    return (
      <div>
        <h2>{data.name}</h2>
        <p>Email: {data.email}</p>
        <p>Phone: {data.phone}</p>
        <p>Website: {data.website}</p>
      </div>
    );
  }

  return null;
}
