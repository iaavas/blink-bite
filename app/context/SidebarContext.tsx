// "use client";
// import React, { createContext, useContext, useState, ReactNode } from "react";

// interface SideBarContextProps {
//   nav: string;
//   setMyNav: () => void;
// }

// const SidebarContext = createContext<SideBarContextProps | undefined>();

// export const AuthProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [nav, setNav] = useState("");

//   function setMyNav(nav: string) {
//     setNav(nav);
//   }
//   return (
//     <SidebarContext.Provider value={{ nav, setMyNav }}>
//       {children}
//     </SidebarContext.Provider>
//   );
// };

// export const useAuth = (): SideBarContextProps => {
//   const context = useContext(SidebarContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
