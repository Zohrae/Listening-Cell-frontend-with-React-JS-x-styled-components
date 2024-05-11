import React from 'react';

const DashboardStudent = () => {
    const username = sessionStorage.getItem('username');

    return (
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <title>Dashboard Student</title>
            </head>
            <body>
                <h1>Hello, Student!</h1>
                {username && <p>Hello, {username}</p>}
            </body>
        </html>
    );
};

export default DashboardStudent;
