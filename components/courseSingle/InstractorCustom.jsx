import Image from "next/image";
import React, {useState, useEffect} from 'react';

export default function Instractor({coursesData}) {
    console.log(coursesData.imageSrc);
    const [src, setSrc] = useState('');
    useEffect(() => {
        setSrc('assets/img/courses/' + coursesData.imageSrc);
    }, []);



    return (
        <div id="instructors" className="pt-60 lg:pt-40">
            <h2 className="text-20 fw-500">강좌정보</h2>

            <div className="mt-30">
                <div className="d-flex x-gap-20 y-gap-20 items-center flex-wrap">
                </div>

            </div>
        </div>
    );
}
