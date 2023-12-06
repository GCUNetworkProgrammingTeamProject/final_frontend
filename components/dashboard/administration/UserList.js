// UserList.js
import React from "react";

function UserList({ users }) { // props 이름 변경
    return (
        <div>
            <ul>
                    <li key={users.id}>
                        <p>유저 이름: {users.name}</p>
                        <p>이메일: {users.email}</p>
                    </li>
            </ul>
        </div>
    );
}

export default UserList;
