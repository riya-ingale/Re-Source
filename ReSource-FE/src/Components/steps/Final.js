export default function Final() {
  return (
    <div className="container md:mt-10">
      <div className="flex flex-col items-center ">
        <div className="wrapper">
           <svg
               d="M14.1 27.2l7.1 7.2 16.7-16.8"
             className="checkmark"
            xmlns=""
            viewBox="0 0 52 52"
          >
            <circle
              className="checkmark__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="checkmark__check"
              fill="none"
             />
           </svg>
        </div>

        <div className="mt-3 text-xl font-semibold uppercase text-blue-500">
          Congratulations!
        </div>
        <div className="text-lg font-semibold text-gray-500">
          Your resource has been added.
        </div>
        <a className="mt-10" href="/user/dashboard">
          <button className="h-10 px-5 text-blue-700 transition-colors duration-150 border border-gray-300 rounded-lg focus:shadow-outline hover:bg-blue-500 hover:text-blue-100">
            Close
          </button>
        </a>
      </div>
    </div>
  );
}
