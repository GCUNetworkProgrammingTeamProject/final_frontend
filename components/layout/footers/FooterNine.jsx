import React from "react";
//import Links from "../component/Links";

export default function FooterNine() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="py-30 border-top-light">
          <div className="row items-center justify-between">
            <div className="col-auto">
              <div className="text-13 lh-1">
                © {new Date().getFullYear()} Anything. All Right Reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
