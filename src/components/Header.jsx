import React from "react";

const Header = ({ category, title }) => {
  return (
    <div className="mb-10">
      <p className="text-gray-400 text-lg ">{category}</p>
      <p className="font-extrabold tracking-tight text-slate-900 text-3xl">
        {title}
      </p>
    </div>
  );
};

export default Header;
