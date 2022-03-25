const AuthLayout = ({ children }) => {
  return (
    <div className=" absolute bg-slate-700 w-full h-full">
      <div className="flex items-center justify-around  w-full h-full">
        <div
          className="  w-full h-full"
          style={{
            backgroundImage: `
                        linear-gradient(
                            rgba(51,65,85, 0.5), 
                            rgba(51,65,85, 0.5)
                        ), 
                        url("https://www.theladders.com/wp-content/uploads/to-do-list-190702.jpg")`,
            backgroundSize: "cover",
          }}
        ></div>
        <div className=" shadow-2xl bg-slate-100 w-full h-full">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
