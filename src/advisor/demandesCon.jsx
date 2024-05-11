import React from 'react';
import styles from './dash.module.css'; // Import your CSS module

const DemandeC = () => {
    return (
        <div className={styles.container}>
            <section id={styles.sidebar}>
                <a href="#" className={styles.brand}>
                    <i className={`${styles.bx} ${styles['bxs-smile']}`}></i>
                    <span className={styles.text}>AdminHub</span>
                </a>
                <ul className={`${styles['side-menu']} ${styles.top}`}>
                    <li className={styles.active}>
                        <a href="#">
                            <i className={`${styles.bx} ${styles['bxs-dashboard']}`}></i>
                            <span className={styles.text}>Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className={`${styles.bx} ${styles['bxs-shopping-bag-alt']}`}></i>
                            <span className={styles.text}>My Store</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className={`${styles.bx} ${styles['bxs-doughnut-chart']}`}></i>
                            <span className={styles.text}>Analytics</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className={`${styles.bx} ${styles['bxs-message-dots']}`}></i>
                            <span className={styles.text}>Message</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className={`${styles.bx} ${styles['bxs-group']}`}></i>
                            <span className={styles.text}>Team</span>
                        </a>
                    </li>
                </ul>
                <ul className={styles['side-menu']}>
                    <li>
                        <a href="#">
                            <i className={`${styles.bx} ${styles['bxs-cog']}`}></i>
                            <span className={styles.text}>Settings</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className={styles.logout}>
                            <i className={`${styles.bx} ${styles['bxs-log-out-circle']}`}></i>
                            <span className={styles.text}>Logout</span>
                        </a>
                    </li>
                </ul>
            </section>

            <section id={styles.content}>
                <nav>
                    <i className={`${styles.bx} ${styles['bx-menu']}`}></i>
                    <a href="#" className={styles['nav-link']}>Categories</a>
                    <form action="#">
                        <div className={styles['form-input']}>
                            <input type="search" placeholder="Search..." />
                            <button type="submit" className={styles['search-btn']}><i className={`${styles.bx} ${styles['bx-search']}`}></i></button>
                        </div>
                    </form>
                    <input type="checkbox" id="switch-mode" hidden />
                    <label htmlFor="switch-mode" className={styles['switch-mode']}></label>
                    <a href="#" className={styles.notification}>
                        <i className={`${styles.bx} ${styles['bxs-bell']}`}></i>
                        <span className={styles.num}>8</span>
                    </a>
                    <a href="#" className={styles.profile}>
                        <img src="img/people.png" alt="Profile" />
                    </a>
                </nav>

                <main>
                    <div className={styles['head-title']}>
                        <div className={styles.left}>
                            <h1>Dashboard</h1>
                            <ul className={styles.breadcrumb}>
                                <li>
                                    <a href="#">Dashboard</a>
                                </li>
                                <li><i className={`${styles.bx} ${styles['bx-chevron-right']}`}></i></li>
                                <li>
                                    <a className={styles.active} href="#">Home</a>
                                </li>
                            </ul>
                        </div>
                        <a href="#" className={styles['btn-download']}>
                            <i className={`${styles.bx} ${styles['bxs-cloud-download']}`}></i>
                            <span className={styles.text}>Download PDF</span>
                        </a>
                    </div>

                    <ul className={styles['box-info']}>
                        <li>
                            <i className={`${styles.bx} ${styles['bxs-calendar-check']}`}></i>
                            <span className={styles.text}>
                                <h3>1020</h3>
                                <p>New Order</p>
                            </span>
                        </li>
                        <li>
                            <i className={`${styles.bx} ${styles['bxs-group']}`}></i>
                            <span className={styles.text}>
                                <h3>2834</h3>
                                <p>Visitors</p>
                            </span>
                        </li>
                        <li>
                            <i className={`${styles.bx} ${styles['bxs-dollar-circle']}`}></i>
                            <span className={styles.text}>
                                <h3>$2543</h3>
                                <p>Total Sales</p>
                            </span>
                        </li>
                    </ul>

                    <div className={styles['table-data']}>
                        <div className={styles.order}>
                            <div className={styles.head}>
                                <h3>Recent Orders</h3>
                                <i className={`${styles.bx} ${styles['bx-search']}`}></i>
                                <i className={`${styles.bx} ${styles['bx-filter']}`}></i>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>User</th>
                                        <th>Date Order</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <img src="img/people.png" alt="User" />
                                            <p>John Doe</p>
                                        </td>
                                        <td>01-10-2021</td>
                                        <td><span className={`${styles.status} ${styles.completed}`}>Completed</span></td>
                                    </tr>
                                    {/* Repeat similar rows for other orders */}
                                </tbody>
                            </table>
                        </div>
                        <div className={styles.todo}>
                            <div className={styles.head}>
                                <h3>Todos</h3>
                                <i className={`${styles.bx} ${styles['bx-plus']}`}></i>
                                <i className={`${styles.bx} ${styles['bx-filter']}`}></i>
                            </div>
                            <ul className={styles['todo-list']}>
                                <li className={styles.completed}>
                                    <p>Todo List</p>
                                    <i className={`${styles.bx} ${styles['bx-dots-vertical-rounded']}`}></i>
                                </li>
                                {/* Repeat similar todo items */}
                            </ul>
                        </div>
                    </div>
                </main>
            </section>
        </div>
    );
}

export default DemandeC;
