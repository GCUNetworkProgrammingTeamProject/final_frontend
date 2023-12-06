"use client";

import React, {useEffect, useState} from "react";
import axios from 'axios';

export default function Survey() {
    const [purchaseList, setPurchaseList] = useState([]);
    const [subscribeList, setSubscribeList] = useState([]);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');

        axios.get("/admin/order", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(function (response) {
                console.log("response", response);
                setPurchaseList(response.data.lectures);
                setSubscribeList(response.data.subscribe);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <>
            <table className="custom-table">
                <thead>
                <tr>
                    <th>구매번호</th>
                    <th>구매상태</th>
                    <th>강의번호</th>
                    <th>강의제목</th>
                    <th>강사이름</th>
                    <th>구매자번호</th>
                    <th>구매자</th>
                    <th>가격</th>
                </tr>
                </thead>
                <tbody>
                {purchaseList.map((elm, i) => (
                    <tr key={i}>
                        <td>{elm.purSeq}</td>
                        <td>{elm.purchaseStatus}</td>
                        <td>{elm.lecture.id}</td>
                        <td>{elm.lecture.title}</td>
                        <td>{elm.lecture.authorName}</td>
                        <td>{elm.member.userSeq}</td>
                        <td>{elm.member.name}</td>
                        <td>{elm.lecture.originalPrice}원</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <h1 className="text-30 lh-12 fw-700 mt-40 mb-40">집중도 분석권 결제내역</h1>

            <table className="custom-table">
                <thead>
                <tr>
                    <th>구매번호</th>
                    <th>시작일</th>
                    <th>종료일</th>
                    <th>분석권 상태</th>
                </tr>
                </thead>
                <tbody>
                {subscribeList.map((elm, i) => (
                    <tr key={i}>
                        <td>{elm.startDate}</td>
                        <td>{elm.startDate}</td>
                        <td>{elm.endDate}</td>
                        <td>{elm.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}
