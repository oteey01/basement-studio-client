import React from "react";

const Header = ({ category, title }) => {
  return (
    <div className="mb-5">
      <p className="text-gray-400 text-normal ">{category}</p>
      <p className="font-extrabold tracking-tight text-slate-900 text-3xl">
        {title}
      </p>
    </div>
  );
};

export default Header;
