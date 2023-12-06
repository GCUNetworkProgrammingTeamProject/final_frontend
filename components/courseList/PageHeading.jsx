import React from "react";

export default function PageHeading() {
  return (
    <section className="page-header -type-1">
      <div className="container">
        <div className="page-header__content">
          <div className="row">
            <div className="col-auto">
              <div>
                <h1 className="page-header__title">강의</h1>
              </div>

              <div>
                <p className="page-header__text">
                  Anything과 함께하는 강의 !
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
