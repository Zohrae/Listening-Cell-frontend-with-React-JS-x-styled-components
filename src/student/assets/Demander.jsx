import React from 'react';
import styled from 'styled-components';

const Demander = () => {
    const username = sessionStorage.getItem('username');

    return (
        <Container>
            <style>
                {`
                @import url('https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css');
                `}
            </style>
            <Navbar>
                {/* <Logo>My Dashboard</Logo> */}
                <SearchBarDash>
                    <input type="text" placeholder="Search..." />
                    <i className="bx bx-search"></i>
                </SearchBarDash>
                <NavIcons>
                    <i className="bx bxs-bell" style={{ color: 'grey' }}></i> {/* Notification icon */}
                    <i className="bx bxs-user" style={{ color: 'var(--secondary-color)' }}></i> {/* Profile icon */}
                </NavIcons>
            </Navbar>
            <Sidebar>
                <ul>
                    <li><i className="bx bxs-dashboard"></i> Dashboard</li>
                    <li><i className="bx bxs-folder"></i> Demandes</li>
                    <li><i className="bx bxs-folder"></i> Rendez-Vous</li>
                    <li><i className="bx bxs-calendar"></i> Evénements</li>
                    <li><i className="bx bxs-log-out"></i> Logout</li>
                </ul>
            </Sidebar>
            <Content>
             
        
            </Content>
        </Container>
    );
};

export default Demander;

const Container = styled.div`
    display: flex;
    height: 100vh;
    width: 100%;
    overflow: hidden;
`;

const Navbar = styled.nav`
    position: fixed;
    top: 0;
    right: 0;
    width: calc(100% - 230px); /* Adjusted width */
    height: 60px;
    background-color: var(--light); /* Changed background color */
    // color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    // box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    z-index: 1000; /* Ensure Navbar is on top */
    border-radius: 25px;
`;

const Logo = styled.div`
    font-size: 24px;
    font-weight: bold;
`;

const SearchBarDash = styled.div`
    position: relative;
    left: 20%; 
    padding: 5px;


    input {
        padding: 8px 60px;
        border-radius: 75px;
        border: none; /* Set border to none */
        background-color: var(--shade10);
        outline: none;
        
    }
    i {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        color: var(--secondary-color); /* Ensure search icon is visible */
    }
`;
const NavIcons = styled.div`
    display: flex;
    gap: 15px;
    color: var(--pshade5);
    i {
        font-size: 24px;
        cursor: pointer;
        &:hover {
            color: var(--shade3);
        }
    }
`;

const Sidebar = styled.div`
    position: fixed;
    top: 30px; /* Added space from Navbar */
    left: 30px; /* Added left margin */
    bottom: 20px; /* Added bottom margin */
    width: 200px;
    height: calc(100% - 110px); /* Adjusted height */
    background-color: var(--dark-grey);
    // background-color: var(--pshade3);

    color: black;
    padding: 20px 0;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    z-index: 999; /* Ensure Sidebar is behind Navbar */
    border-top-left-radius: 25px; /* Added border radius */
    border-bottom-left-radius: 25px; /* Added border radius */
    border-top-right-radius: 25px; /* Added border radius */
    border-bottom-right-radius: 25px; /* Added border radius */
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        li {
            padding: 15px 20px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 10px;
            &:hover {
                background-color: var(--shade10);
                border-radius: 25px;
                padding: 6px 5px;
            }
        }
    }
`;



const Content = styled.div`
    margin-left: 230px; /* Adjusted margin */
    padding: 80px 20px;
    width: calc(100% - 230px);
    height: calc(100% - 60px);
    overflow-y: auto;
    background-color: var(--light);
    h1 {
        font-size: 28px;
        margin-bottom: 20px;
    }
`;

