import React from "react";

const ContentWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="sm:ml-0 md:ml-[300px] transition-all duration-300">
      {children}
    </div>
  );
};

export default ContentWrapper;
