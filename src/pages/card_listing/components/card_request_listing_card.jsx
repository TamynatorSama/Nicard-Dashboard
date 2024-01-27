import CustomDropDown from "../../../component/customDropdown";

const CardRequestListingCard = ({ status = "Pending NIMC Verification" }) => {
  const contactStyle = {
    "grid-column": "1/3",
  };
  const actionStyle = {
    "grid-column": "5/7",
  };
  let statusStyle = {};

  switch (status.split(" ")[0].toLowerCase()) {
    case "pending":
      statusStyle = {
        "background-color": "#ffe5c8",
        color: "#e3a57e",
      };
      break;
    case "done":
      statusStyle = {
        "background-color": "#d7f8f1",
        color: "#83c6b4",
      };
      break;
    case "processing":
      statusStyle = {
        "background-color": "#f2f1f6",
        color: "#838287",
      };
      break;
    case "approved":
      statusStyle = {
        "background-color": "#d4e4ff",
        color: "#636fbb",
      };
      break;
      case "ready":
      statusStyle = {
        "background-color": "#fee5ff",
        color: "#d1a8e0",
      };
      break;
    default:
      break;
  }

  return (
    <div className="hover:shadow-md rounded-xl transition-all duration-200 grid grid-cols-8 gap-7  p-2 grid-rows-1">
      <div style={contactStyle}>
        <h1 className="text-[0.8rem] font-medium w-full text-stone-800">
          Tamilore Kolawole
        </h1>
        <p className="text-[0.7em] text-stone-500 w-full">09063976031</p>
      </div>
      <h1 className="text-[0.8rem] font-medium w-full text-stone-800">
        33349204234
      </h1>
      <h1 className="text-[0.8rem] font-medium w-full text-stone-400">
        {new Date("2024-01-25T11:27:47.137Z").toLocaleDateString("en-us", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </h1>

      <div style={actionStyle}>
        <h1
          className={`text-[0.8rem] font-medium w-fit h-fit p-2 leading-none text-center rounded-2xl text-stone-400`}
          style={statusStyle}
        >
          {status}
        </h1>
      </div>
      <h1 className="text-[0.8rem] font-medium w-full text-stone-700">
        Renew
      </h1>
      <CustomDropDown title="Actions" items={["Approve","Processing","Done","Ready for Pickup"]}/>
    </div>
  );
};
export default CardRequestListingCard;
