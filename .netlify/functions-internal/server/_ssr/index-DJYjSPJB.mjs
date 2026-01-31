import { r as reactExports, j as jsxRuntimeExports } from "../_chunks/_libs/react.mjs";
import { u as useQuery, a as useQueryClient, b as useMutation } from "../_chunks/_libs/@tanstack/react-query.mjs";
import "../_chunks/_libs/@tanstack/query-core.mjs";
function WinnerDisplay({
  result,
  bets,
  departureTime
}) {
  if (!departureTime) {
    return null;
  }
  const departureMinutes = parseInt(departureTime.split(":")[0]) * 60 + parseInt(departureTime.split(":")[1]);
  parseInt(result.actualTime.split(":")[0]) * 60 + parseInt(result.actualTime.split(":")[1]);
  const winner = bets.reduce((closest, bet) => {
    const betMinutes = parseInt(bet.time.split(":")[0]) * 60 + parseInt(bet.time.split(":")[1]);
    const closestMinutes = parseInt(closest.time.split(":")[0]) * 60 + parseInt(closest.time.split(":")[1]);
    const betDiff = Math.abs(departureMinutes - betMinutes);
    const closestDiff = Math.abs(departureMinutes - closestMinutes);
    return betDiff < closestDiff ? bet : closest;
  });
  const winnerDiff = Math.abs(
    departureMinutes - (parseInt(winner.time.split(":")[0]) * 60 + parseInt(winner.time.split(":")[1]))
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 rounded-lg p-8 mb-6 shadow-lg border-2 border-yellow-300", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl mb-6", children: "🎉🏆🎉" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl font-bold text-gray-900 mb-2", children: [
      "🌟 Way to go, ",
      winner.name,
      "! 🌟"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-gray-800 mb-6", children: "You're the closest to the departure time!" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 justify-center mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-700 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow border border-gray-600", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-300 text-xs uppercase font-semibold tracking-wide", children: "🛫 Scheduled Departure" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-white mt-2", children: departureTime })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-700 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow border border-gray-600", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-300 text-xs uppercase font-semibold tracking-wide", children: "🎲 Your Bet Time" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-yellow-400 mt-2", children: winner.time }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-yellow-400 font-semibold mt-2", children: [
          winnerDiff,
          " min off"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 text-2xl text-white", children: "✨ Congratulations! You won! 🎊" })
  ] }) });
}
const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
const getUserId = () => {
  if (typeof window === "undefined") {
    return "";
  }
  let userId = localStorage.getItem("userId");
  if (!userId) {
    userId = `user_${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem("userId", userId);
  }
  return userId;
};
const canEditBets = () => {
  const now = /* @__PURE__ */ new Date();
  const currentHour = now.getHours();
  return currentHour < 12;
};
const parseTimeToMinutes = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};
const ArrivalTime = ({
  onSubmit,
  departureTime
}) => {
  const [value, setValue] = reactExports.useState("");
  const [error, setError] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const id = reactExports.useId();
  const submit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!timeRegex.test(value)) {
      setError("Wrong format. Use HH:MM (e.g., 15:30)");
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      await onSubmit(value);
      setValue("");
    } catch (err) {
      console.error("Error submitting arrival time:", err);
      setError("Failed to save arrival time. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: submit, className: "w-full max-w-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-700 rounded-lg p-6 shadow-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "label",
      {
        htmlFor: id,
        className: "block text-white text-sm font-medium mb-2",
        children: "Arrival Time ✈️"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        id,
        placeholder: "example 15:30",
        value,
        onChange: (e) => {
          const newValue = e.target.value;
          if (/^[0-9:]*$/.test(newValue)) {
            setValue(newValue);
            setError(null);
          }
        },
        className: "w-full px-4 py-2 bg-gray-600 text-white rounded-md border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
      }
    ),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-400 text-sm mt-2", children: error }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "submit",
        disabled: isLoading,
        className: "w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200 disabled:opacity-50",
        children: isLoading ? "Submitting..." : "Submit"
      }
    )
  ] }) }) });
};
const BetsList = ({
  bets,
  userId,
  onEdit,
  canEdit,
  result,
  departureTime
}) => {
  const getBetsWithDifference = () => {
    if (!departureTime) {
      return bets.map((bet) => ({ ...bet, difference: 0 }));
    }
    return bets.map((bet) => {
      const betMinutes = parseTimeToMinutes(bet.time);
      const departureMinutes = parseTimeToMinutes(departureTime);
      const difference = Math.abs(betMinutes - departureMinutes);
      return { ...bet, difference };
    }).sort((a, b) => a.difference - b.difference);
  };
  const sortedBets = getBetsWithDifference();
  const shouldShowWinner = Boolean(result && departureTime);
  const shouldShowDifference = Boolean(departureTime);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-white text-2xl font-semibold mb-4", children: "All Bets" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: bets.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-center py-8", children: "No bets placed yet. Be the first!" }) : sortedBets.map((bet, index) => {
      const isOwnBet = bet.userId === userId;
      const isWinner = shouldShowWinner && index === 0;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `bg-gray-700 rounded-lg p-4 border ${isOwnBet ? "border-blue-500" : "border-gray-600"} ${isWinner ? "ring-2 ring-yellow-500 ring-inset" : ""}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                isWinner && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "🏆" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-semibold", children: bet.name }),
                isOwnBet && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-blue-600 text-white px-2 py-1 rounded", children: "You" }),
                isWinner && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-yellow-600 text-white px-2 py-1 rounded font-bold", children: "WINNER" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-300 text-lg", children: bet.time }),
                shouldShowDifference && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-gray-400", children: [
                  "(",
                  bet.difference,
                  " min off)"
                ] })
              ] })
            ] }),
            isOwnBet && canEdit && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => onEdit(bet.id),
                className: "px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md transition-colors duration-200",
                children: "Edit"
              }
            ),
            isOwnBet && !canEdit && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-400", children: "🔒 Locked" })
          ] })
        },
        bet.id
      );
    }) })
  ] });
};
const DepartureTimeModal = ({
  onSubmit,
  onCancel,
  currentDepartureTime
}) => {
  const [time, setTime] = reactExports.useState(currentDepartureTime || "");
  const [error, setError] = reactExports.useState(false);
  const id = reactExports.useId();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!timeRegex.test(time)) {
      setError(true);
      return;
    }
    void onSubmit(time);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: handleSubmit, className: "w-full max-w-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-white text-2xl font-semibold", children: "Set Departure Time" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: id,
          className: "block text-white text-sm font-medium mb-2",
          children: "Departure Time"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          id,
          type: "text",
          placeholder: "HH:MM (e.g., 14:00)",
          value: time,
          onChange: (e) => {
            const newValue = e.target.value;
            if (/^[0-9:]*$/.test(newValue)) {
              setTime(newValue);
              setError(false);
            }
          },
          className: `w-full px-4 py-2 bg-gray-600 text-white rounded-md border ${error ? "border-red-500 focus:ring-red-500" : "border-gray-500 focus:ring-indigo-500"} focus:outline-none focus:ring-2 focus:border-transparent placeholder-gray-400`
        }
      ),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-400 text-sm mt-1", children: "Invalid time format. Use HH:MM (e.g., 14:00)" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "submit",
        className: "w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors duration-200",
        children: [
          currentDepartureTime ? "Update" : "Set",
          " Departure Time"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: onCancel,
        className: "w-full px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white font-medium rounded-md transition-colors duration-200",
        children: "Cancel"
      }
    )
  ] }) }) });
};
const EditArrivalTimeModal = ({
  onSubmit,
  onCancel,
  currentArrivalTime
}) => {
  const [time, setTime] = reactExports.useState(currentArrivalTime);
  const [error, setError] = reactExports.useState(false);
  const id = reactExports.useId();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!timeRegex.test(time)) {
      setError(true);
      return;
    }
    void onSubmit(time);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: handleSubmit, className: "w-full max-w-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-white text-2xl font-semibold", children: "Edit Arrival Time" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: id,
          className: "block text-white text-sm font-medium mb-2",
          children: "Actual Arrival Time"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          id,
          type: "text",
          placeholder: "HH:MM (e.g., 14:28)",
          value: time,
          onChange: (e) => {
            const newValue = e.target.value;
            if (/^[0-9:]*$/.test(newValue)) {
              setTime(newValue);
              setError(false);
            }
          },
          className: `w-full px-4 py-2 bg-gray-600 text-white rounded-md border ${error ? "border-red-500 focus:ring-red-500" : "border-gray-500 focus:ring-yellow-500"} focus:outline-none focus:ring-2 focus:border-transparent placeholder-gray-400`
        }
      ),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-400 text-sm mt-1", children: "Invalid time format. Use HH:MM (e.g., 14:28)" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "submit",
        className: "w-full px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-medium rounded-md transition-colors duration-200",
        children: "Update Arrival Time"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: onCancel,
        className: "w-full px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white font-medium rounded-md transition-colors duration-200",
        children: "Cancel"
      }
    )
  ] }) }) });
};
function Loader() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-12 h-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 border-4 border-gray-600 rounded-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 border-4 border-transparent border-t-blue-500 border-r-blue-500 rounded-full animate-spin" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-semibold", children: "Loading..." })
  ] }) });
}
const Modal = ({
  children,
  onClose
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: onClose,
        className: "absolute top-4 right-4 text-gray-400 hover:text-white text-2xl",
        children: "×"
      }
    ),
    children
  ] }) });
};
const ResultsDisplay = ({
  result,
  bets,
  departureTime,
  onEditArrival
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-700 border border-gray-600 rounded-lg p-6 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-300 mb-4", children: [
      "Actual arrival time for ",
      new Date(result.date).toLocaleDateString()
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-800 rounded-lg p-4 inline-block mb-4 border border-gray-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white text-5xl font-bold", children: result.actualTime }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: onEditArrival,
        className: "px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors duration-200",
        children: "Edit Arrival Time"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-300 mt-4 text-sm", children: [
      bets.length,
      " bet",
      bets.length !== 1 ? "s" : "",
      " placed"
    ] })
  ] }) });
};
const UserInputs = ({
  onSubmit,
  onCancel,
  existingBet
}) => {
  const [state, setState] = reactExports.useState({
    name: existingBet?.name || "",
    time: existingBet?.time || ""
  });
  const [errors, setErrors] = reactExports.useState({ name: false, time: false });
  const nameId = reactExports.useId();
  const timeId = reactExports.useId();
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "time" && !/^[0-9:]*$/.test(value)) return;
    setState((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };
  const submit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newErrors = {
      name: state.name.trim().length === 0,
      time: !timeRegex.test(state.time)
    };
    setErrors(newErrors);
    if (!newErrors.name && !newErrors.time) {
      onSubmit(state.name, state.time);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: submit, className: "w-full max-w-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-700 rounded-lg p-6 shadow-lg space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-white text-xl font-semibold mb-4", children: "User Information" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: nameId,
          className: "block text-white text-sm font-medium mb-2",
          children: "Name"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          id: nameId,
          type: "text",
          value: state.name,
          placeholder: "Enter your name",
          name: "name",
          onChange: handleChange,
          className: `w-full px-4 py-2 bg-gray-600 text-white rounded-md border ${errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-500 focus:ring-blue-500"} focus:outline-none focus:ring-2 focus:border-transparent placeholder-gray-400`
        }
      ),
      errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-400 text-sm mt-1", children: "Name is required" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: timeId,
          className: "block text-white text-sm font-medium mb-2",
          children: "Time"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          id: timeId,
          type: "text",
          value: state.time,
          placeholder: "HH:MM (e.g., 15:30)",
          name: "time",
          onChange: handleChange,
          className: `w-full px-4 py-2 bg-gray-600 text-white rounded-md border ${errors.time ? "border-red-500 focus:ring-red-500" : "border-gray-500 focus:ring-blue-500"} focus:outline-none focus:ring-2 focus:border-transparent placeholder-gray-400`
        }
      ),
      errors.time && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-400 text-sm mt-1", children: "Invalid time format. Use HH:MM (e.g., 15:30)" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "submit",
        className: "w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200",
        children: existingBet ? "Update Bet" : "Submit Bet"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: onCancel,
        className: "w-full px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white font-medium rounded-md transition-colors duration-200",
        children: "Cancel"
      }
    )
  ] }) }) });
};
const WinnerHistoryModal = ({
  history,
  onClose
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-white text-2xl font-semibold mb-6", children: "🏆 Winner History" }),
    history.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-center py-8", children: "No winners recorded yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm text-left text-gray-300", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "text-xs uppercase bg-gray-700 text-gray-200 sticky top-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Departure Time" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Winner Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Winner Bet Time" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-gray-700", children: history.map((entry, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: `${index % 2 === 0 ? "bg-gray-800" : "bg-gray-750"} hover:bg-gray-700 transition-colors`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: new Date(entry.date).toLocaleDateString() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: entry.departureTime }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-semibold", children: entry.winnerName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-gray-600 text-white px-3 py-1 rounded", children: entry.winnerBetTime }) })
          ]
        },
        entry.id
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: onClose,
        className: "w-full mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200",
        children: "Close"
      }
    )
  ] }) });
};
function useBets() {
  return useQuery({
    queryKey: ["bets"],
    queryFn: async () => {
      const res = await fetch("/api/bets");
      return res.json();
    }
  });
}
function useResult() {
  return useQuery({
    queryKey: ["result"],
    queryFn: async () => {
      const res = await fetch("/api/result");
      const data = await res.json();
      if (data && !("error" in data)) {
        return {
          actualTime: data.actualTime,
          date: data.date
        };
      }
      return null;
    }
  });
}
function useDepartureTime() {
  return useQuery({
    queryKey: ["departureTime"],
    queryFn: async () => {
      const res = await fetch("/api/departure-time");
      const data = await res.json();
      if (data && !("error" in data)) {
        return data.departureTime ?? null;
      }
      return null;
    }
  });
}
function useWinnerHistory() {
  return useQuery({
    queryKey: ["winnerHistory"],
    queryFn: async () => {
      const res = await fetch("/api/winner-history");
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    }
  });
}
function useSubmitBet(userId, onSuccess) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ name, time }) => {
      const response = await fetch("/api/bets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId,
          name,
          time
        })
      });
      if (!response.ok) {
        throw new Error("Failed to submit bet");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bets"] });
      onSuccess?.();
    }
  });
}
function useSaveResult(onSuccess) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (actualTime) => {
      const response = await fetch("/api/result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          actualTime
        })
      });
      if (!response.ok) {
        throw new Error("Failed to save arrival time");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["result"] });
    }
  });
}
function useSaveWinnerHistory(onSuccess) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      date,
      departureTime,
      winnerUserId,
      winnerName,
      winnerBetTime
    }) => {
      const response = await fetch("/api/winner-history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          date,
          departureTime,
          winnerUserId,
          winnerName,
          winnerBetTime
        })
      });
      if (!response.ok) {
        throw new Error("Failed to save winner history");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["winnerHistory"] });
    }
  });
}
function useSaveDepartureTime(onSuccess) {
  const queryClient = useQueryClient();
  const saveWinnerMutation = useSaveWinnerHistory();
  return useMutation({
    mutationFn: async ({
      departureTime,
      bets
    }) => {
      const response = await fetch("/api/departure-time", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          departureTime
        })
      });
      if (!response.ok) {
        throw new Error("Failed to save departure time");
      }
      if (bets && bets.length > 0) {
        const departureMinutes = parseInt(departureTime.split(":")[0]) * 60 + parseInt(departureTime.split(":")[1]);
        const winner = bets.reduce((closest, bet) => {
          const betMinutes = parseInt(bet.time.split(":")[0]) * 60 + parseInt(bet.time.split(":")[1]);
          const closestMinutes = parseInt(closest.time.split(":")[0]) * 60 + parseInt(closest.time.split(":")[1]);
          const betDiff = Math.abs(departureMinutes - betMinutes);
          const closestDiff = Math.abs(departureMinutes - closestMinutes);
          return betDiff < closestDiff ? bet : closest;
        });
        const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        await saveWinnerMutation.mutateAsync({
          date: today,
          departureTime,
          winnerUserId: winner.userId,
          winnerName: winner.name,
          winnerBetTime: winner.time
        });
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departureTime"] });
      onSuccess?.();
    }
  });
}
function App() {
  const [isModalOpen, setIsModalOpen] = reactExports.useState(false);
  const [isDepartureModalOpen, setIsDepartureModalOpen] = reactExports.useState(false);
  const [isEditArrivalModalOpen, setIsEditArrivalModalOpen] = reactExports.useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = reactExports.useState(false);
  const [userId] = reactExports.useState(getUserId());
  const [editingBetId, setEditingBetId] = reactExports.useState(null);
  const {
    data: bets = [],
    isLoading: isBetsLoading
  } = useBets();
  const {
    data: result = null,
    isLoading: isResultLoading
  } = useResult();
  const {
    data: departureTime = null,
    isLoading: isDepartureTimeLoading
  } = useDepartureTime();
  const {
    data: winnerHistory = [],
    isLoading: isWinnerHistoryLoading
  } = useWinnerHistory();
  const submitBetMutation = useSubmitBet(userId, () => {
    setIsModalOpen(false);
    setEditingBetId(null);
  });
  const saveResultMutation = useSaveResult();
  const saveDepartureTimeMutation = useSaveDepartureTime(() => {
    setIsDepartureModalOpen(false);
  });
  const isMutating = submitBetMutation.isPending || saveResultMutation.isPending || saveDepartureTimeMutation.isPending;
  const isDataLoading = isBetsLoading || isResultLoading || isWinnerHistoryLoading || isDepartureTimeLoading;
  const handleSubmitBet = async (name, time) => {
    await submitBetMutation.mutateAsync({
      name,
      time
    });
  };
  const handleEditBet = (betId) => {
    if (canEditBets()) {
      setEditingBetId(betId);
      setIsModalOpen(true);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-800 min-h-screen pb-8", children: [
    (isMutating || isDataLoading) && /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-center text-white p-8 text-5xl font-bold", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-3", children: "🎰" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Betting Departure" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-3", children: "🎰" })
    ] }),
    !result ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrivalTime, { onSubmit: async (time) => {
      await saveResultMutation.mutateAsync(time);
    }, departureTime }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-700 border border-gray-600 rounded-lg p-3 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setIsHistoryModalOpen(true), className: "px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200", children: "📜 Winner History" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setIsDepartureModalOpen(true), className: "px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200", children: [
          departureTime ? "Change" : "Set",
          " Departure Time"
        ] })
      ] }) }),
      departureTime ? /* @__PURE__ */ jsxRuntimeExports.jsx(WinnerDisplay, { result, bets, departureTime }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-700 border border-gray-600 text-gray-300 rounded-lg p-4 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", children: [
          "📌 You can place or edit your bet until",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "12:00 PM" }),
          ". After that, all bets are locked."
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResultsDisplay, { result, bets, departureTime, onEditArrival: () => setIsEditArrivalModalOpen(true) })
      ] }),
      !departureTime && !bets.some((bet) => bet.userId === userId) && (canEditBets() ? /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setIsModalOpen(true), className: "w-full max-w-md mx-auto block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 mt-6", children: "Add Your Bet" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-md mx-auto block px-6 py-3 bg-red-600 text-white font-semibold rounded-lg text-center mt-6", children: "🔒 Bets are closed" })),
      /* @__PURE__ */ jsxRuntimeExports.jsx(BetsList, { bets, userId, onEdit: handleEditBet, canEdit: canEditBets(), result, departureTime })
    ] }),
    isModalOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(Modal, { onClose: () => setIsModalOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserInputs, { onSubmit: handleSubmitBet, onCancel: () => setIsModalOpen(false), existingBet: editingBetId ? bets.find((bet) => bet.id === editingBetId) : bets.find((bet) => bet.userId === userId) }) }),
    isDepartureModalOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(Modal, { onClose: () => setIsDepartureModalOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DepartureTimeModal, { onSubmit: async (time) => {
      await saveDepartureTimeMutation.mutateAsync({
        departureTime: time,
        bets
      });
    }, onCancel: () => setIsDepartureModalOpen(false), currentDepartureTime: departureTime }) }),
    isEditArrivalModalOpen && result && /* @__PURE__ */ jsxRuntimeExports.jsx(Modal, { onClose: () => setIsEditArrivalModalOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsx(EditArrivalTimeModal, { onSubmit: async (time) => {
      await saveResultMutation.mutateAsync(time);
      setIsEditArrivalModalOpen(false);
    }, onCancel: () => setIsEditArrivalModalOpen(false), currentArrivalTime: result.actualTime }) }),
    isHistoryModalOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(Modal, { onClose: () => setIsHistoryModalOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsx(WinnerHistoryModal, { history: winnerHistory, onClose: () => setIsHistoryModalOpen(false) }) })
  ] });
}
export {
  App as component
};
