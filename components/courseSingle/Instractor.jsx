import Image from "next/image";
import React from "react";

export default function Instractor({coursesData}) {
  return (
      <div id="instructors" className="pt-60 lg:pt-40">
        <h2 className="text-20 fw-500">강좌정보</h2>

        <div className="mt-30">
          <div className="d-flex x-gap-20 y-gap-20 items-center flex-wrap">
            <div className="size-120">
              <Image
                  width={100}
                  height={100}
                  className="object-cover"
                  src={coursesData[0].imageSrc}
                  alt="image"
              />
            </div>

            {/**
             <div className="">
             <h5 className="text-17 lh-14 fw-500">Floyd Miles</h5>
             <p className="mt-5">President of Sales</p>

             <div className="d-flex x-gap-20 y-gap-10 flex-wrap items-center pt-10">
             <div className="d-flex items-center">
             <div className="d-flex items-center mr-8">
             <div className="icon-star text-11 text-yellow-1"></div>
             <div className="text-14 lh-12 text-yellow-1 ml-5">4.5</div>
             </div>
             <div className="text-13 lh-1">강사 평점</div>
             </div>

             <div className="d-flex items-center text-light-1">
             <div className="icon-comment text-13 mr-8"></div>
             <div className="text-13 lh-1">23,987 Reviews</div>
             </div>

             <div className="d-flex items-center text-light-1">
             <div className="icon-person-3 text-13 mr-8"></div>
             <div className="text-13 lh-1">692 Students</div>
             </div>

             <div className="d-flex items-center text-light-1">
             <div className="icon-wall-clock text-13 mr-8"></div>
             <div className="text-13 lh-1">15 Course</div>
             </div>
             </div>
             </div>
             */}

          </div>

          <h5 className="text-17 lh-14 fw-500">
            <p>
              {coursesData[0].desc}
            </p>
          </h5>
        </div>
      </div>
  );
}
