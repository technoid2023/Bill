import React from "react";
import "./Dashboard.css";
import { isLoggedIn } from "../../Auth/PrivateRoute";
import Cookies from "js-cookie";

function Dashboard(props) {


  let statData=Cookies.get('_ST')
  statData=JSON.parse(statData)
  let stats=statData;
  console.log(statData);
  console.log("isLoggedIn", isLoggedIn());
  return (
   
        <div>
        <div className="container">
        
        </div>
        <div class="row row-cols-1 row-cols-md-3 g-4">
          <div class="col main-card">
            <a href="#">
              <div class="card h-100 card-view view1" style={{ backgroundColor: "#A5F1E9" }}>
                <div>
                  <p class="fs-6 text">GROSS SALES</p>
                  <h5 class="card-title">₹{stats.gross_sale}.00</h5>
                  <p class="card-text">
                    <small class="text-muted">₹{stats.gross_sale}.00 Charges</small>
                  </p>
                </div>
  
                <div className="Icon-style">
                  <svg
                    fill="#000000"
                    opacity={2}
                    width="60"
                    height="60"
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M136.948 908.811c5.657 0 10.24-4.583 10.24-10.24V610.755c0-5.657-4.583-10.24-10.24-10.24h-81.92a10.238 10.238 0 00-10.24 10.24v287.816c0 5.657 4.583 10.24 10.24 10.24h81.92zm0 40.96h-81.92c-28.278 0-51.2-22.922-51.2-51.2V610.755c0-28.278 22.922-51.2 51.2-51.2h81.92c28.278 0 51.2 22.922 51.2 51.2v287.816c0 28.278-22.922 51.2-51.2 51.2zm278.414-40.96c5.657 0 10.24-4.583 10.24-10.24V551.322c0-5.657-4.583-10.24-10.24-10.24h-81.92a10.238 10.238 0 00-10.24 10.24v347.249c0 5.657 4.583 10.24 10.24 10.24h81.92zm0 40.96h-81.92c-28.278 0-51.2-22.922-51.2-51.2V551.322c0-28.278 22.922-51.2 51.2-51.2h81.92c28.278 0 51.2 22.922 51.2 51.2v347.249c0 28.278-22.922 51.2-51.2 51.2zm278.414-40.342c5.657 0 10.24-4.583 10.24-10.24V492.497c0-5.651-4.588-10.24-10.24-10.24h-81.92c-5.652 0-10.24 4.589-10.24 10.24v406.692c0 5.657 4.583 10.24 10.24 10.24h81.92zm0 40.96h-81.92c-28.278 0-51.2-22.922-51.2-51.2V492.497c0-28.271 22.924-51.2 51.2-51.2h81.92c28.276 0 51.2 22.929 51.2 51.2v406.692c0 28.278-22.922 51.2-51.2 51.2zm278.414-40.958c5.657 0 10.24-4.583 10.24-10.24V441.299c0-5.657-4.583-10.24-10.24-10.24h-81.92a10.238 10.238 0 00-10.24 10.24v457.892c0 5.657 4.583 10.24 10.24 10.24h81.92zm0 40.96h-81.92c-28.278 0-51.2-22.922-51.2-51.2V441.299c0-28.278 22.922-51.2 51.2-51.2h81.92c28.278 0 51.2 22.922 51.2 51.2v457.892c0 28.278-22.922 51.2-51.2 51.2zm-6.205-841.902C677.379 271.088 355.268 367.011 19.245 387.336c-11.29.683-19.889 10.389-19.206 21.679s10.389 19.889 21.679 19.206c342.256-20.702 670.39-118.419 964.372-284.046 9.854-5.552 13.342-18.041 7.79-27.896s-18.041-13.342-27.896-7.79z" />
                    <path d="M901.21 112.64l102.39.154c11.311.017 20.494-9.138 20.511-20.449s-9.138-20.494-20.449-20.511l-102.39-.154c-11.311-.017-20.494 9.138-20.511 20.449s9.138 20.494 20.449 20.511z" />
                    <path d="M983.151 92.251l-.307 101.827c-.034 11.311 9.107 20.508 20.418 20.542s20.508-9.107 20.542-20.418l.307-101.827c.034-11.311-9.107-20.508-20.418-20.542s-20.508 9.107-20.542 20.418z" />
                  </svg>
                </div>
              </div>
            </a>
          </div>
          <div class="col main-card">
            <a href="#">
              <div class="card h-100 card-view view2" style={{backgroundColor: '#F7E6AD'}}>
                <div>
                  <p class="fs-6 text">DUE AMOUNTS</p>
                  {/* <h5 class="card-title text">DISCOUNTS</h5> */}
                  <h5 class="card-title">₹{stats.due_amount}.00</h5>
                  <p class="card-text">
                    <small class="text-muted">₹{stats.due_amount}.00 Amount Unpaid</small>
                  </p>
                </div>
                <div className="Icon-style">
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 7C3 4.79086 4.79086 3 7 3H17C19.2091 3 21 4.79086 21 7V17C21 19.2091 19.2091 21 17 21H7C4.79086 21 3 19.2091 3 17V7Z"
                      stroke="#000000"
                      stroke-width="2"
                    />
                    <path
                      d="M15 9L9 15"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M16 14.5C16 15.3284 15.3284 16 14.5 16C13.6716 16 13 15.3284 13 14.5C13 13.6716 13.6716 13 14.5 13C15.3284 13 16 13.6716 16 14.5Z"
                      fill="#000000"
                    />
                    <path
                      d="M11 9.5C11 10.3284 10.3284 11 9.5 11C8.67157 11 8 10.3284 8 9.5C8 8.67157 8.67157 8 9.5 8C10.3284 8 11 8.67157 11 9.5Z"
                      fill="#000000"
                    />
                  </svg>
                </div>
              </div>
            </a>
          </div>
          <div class="col main-card">
            <a href="#">
              <div class="card h-100 card-view view3" style={{backgroundColor: '#CEE5D0'}}>
                <div>
                  <p class="fs-6 text">REFUNDS</p>
                  {/* <h5 class="card-title text">REFUNDS</h5> */}
                  <h5 class="card-title">₹{stats.refund_amount}.00</h5>
                  <p class="card-text">
                    <small class="text-muted">{stats.due_bill} No of Refunded Bills</small>
                  </p>
                </div>
                <div className="Icon-style">
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M5.671 4.257c3.928-3.219 9.733-2.995 13.4.672 3.905 3.905 3.905 10.237 0 14.142-3.905 3.905-10.237 3.905-14.142 0A9.993 9.993 0 0 1 2.25 9.767l.077-.313 1.934.51a8 8 0 1 0 3.053-4.45l-.221.166 1.017 1.017-4.596 1.06 1.06-4.596 1.096 1.096zM13 6v2h2.5v2H10a.5.5 0 0 0-.09.992L10 11h4a2.5 2.5 0 1 1 0 5h-1v2h-2v-2H8.5v-2H14a.5.5 0 0 0 .09-.992L14 13h-4a2.5 2.5 0 1 1 0-5h1V6h2z" />
                    </g>
                  </svg>
                </div>
              </div>
            </a>
          </div>
          <div class="col main-card">
            <a href="#">
              <div class="card h-100 card-view view4" style={{backgroundColor: '#F4BFBF'}}>
                <div>
                  <h5 class="card-title text">PROFITS</h5>
                  <h5 class="card-title">₹{stats.net_profit}.00</h5>
                  <p class="card-text">
                    <small class="text-muted">{stats.customer_count} Transactions</small>
                  </p>
                </div>
                <div className="Icon-style">
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_443_3628)">
                      <rect
                        x="2"
                        y="6"
                        width="20"
                        height="12"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M22 10C21.4747 10 20.9546 9.89654 20.4693 9.69552C19.984 9.4945 19.543 9.19986 19.1716 8.82843C18.8001 8.45699 18.5055 8.01604 18.3045 7.53073C18.1035 7.04543 18 6.52529 18 6L22 6L22 10Z"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M18 18C18 16.9391 18.4214 15.9217 19.1716 15.1716C19.9217 14.4214 20.9391 14 22 14L22 18L18 18Z"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M2 14C3.06087 14 4.07828 14.4214 4.82843 15.1716C5.57857 15.9217 6 16.9391 6 18L2 18L2 14Z"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M6 6C6 7.06087 5.57857 8.07828 4.82843 8.82843C4.07828 9.57857 3.06087 10 2 10L2 6H6Z"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M14.0741 9.5H11.3333C10.597 9.5 10 10.0596 10 10.75C10 11.4404 10.597 12 11.3333 12H13.1111C13.8475 12 14.4444 12.5596 14.4444 13.25C14.4444 13.9404 13.8475 14.5 13.1111 14.5H10"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12 9.51733V8.5"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12 15.5173V14.5"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_443_3628">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            </a>
          </div>
          <div class="col main-card">
            <a href="#">
              <div class="card h-100 card-view view5" style={{backgroundColor: '#AEE2FF'}}>
                <div>
                  <h5 class="card-title text">TAXES</h5>
                  <h5 class="card-title">₹{stats.tax_value}.00</h5>
                </div>
                <div className="Icon-style">
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 3L13.7071 2.29289C13.5196 2.10536 13.2652 2 13 2V3ZM19 9H20C20 8.73478 19.8946 8.48043 19.7071 8.29289L19 9ZM13.109 8.45399L14 8V8L13.109 8.45399ZM13.546 8.89101L14 8L13.546 8.89101ZM10 13C10 12.4477 9.55228 12 9 12C8.44772 12 8 12.4477 8 13H10ZM8 16C8 16.5523 8.44772 17 9 17C9.55228 17 10 16.5523 10 16H8ZM8.5 9C7.94772 9 7.5 9.44772 7.5 10C7.5 10.5523 7.94772 11 8.5 11V9ZM9.5 11C10.0523 11 10.5 10.5523 10.5 10C10.5 9.44772 10.0523 9 9.5 9V11ZM8.5 6C7.94772 6 7.5 6.44772 7.5 7C7.5 7.55228 7.94772 8 8.5 8V6ZM9.5 8C10.0523 8 10.5 7.55228 10.5 7C10.5 6.44772 10.0523 6 9.5 6V8ZM17.908 20.782L17.454 19.891L17.454 19.891L17.908 20.782ZM18.782 19.908L19.673 20.362L18.782 19.908ZM5.21799 19.908L4.32698 20.362H4.32698L5.21799 19.908ZM6.09202 20.782L6.54601 19.891L6.54601 19.891L6.09202 20.782ZM6.09202 3.21799L5.63803 2.32698L5.63803 2.32698L6.09202 3.21799ZM5.21799 4.09202L4.32698 3.63803L4.32698 3.63803L5.21799 4.09202ZM12 3V7.4H14V3H12ZM14.6 10H19V8H14.6V10ZM12 7.4C12 7.66353 11.9992 7.92131 12.0169 8.13823C12.0356 8.36682 12.0797 8.63656 12.218 8.90798L14 8C14.0293 8.05751 14.0189 8.08028 14.0103 7.97537C14.0008 7.85878 14 7.69653 14 7.4H12ZM14.6 8C14.3035 8 14.1412 7.99922 14.0246 7.9897C13.9197 7.98113 13.9425 7.9707 14 8L13.092 9.78201C13.3634 9.92031 13.6332 9.96438 13.8618 9.98305C14.0787 10.0008 14.3365 10 14.6 10V8ZM12.218 8.90798C12.4097 9.2843 12.7157 9.59027 13.092 9.78201L14 8V8L12.218 8.90798ZM8 13V16H10V13H8ZM8.5 11H9.5V9H8.5V11ZM8.5 8H9.5V6H8.5V8ZM13 2H8.2V4H13V2ZM4 6.2V17.8H6V6.2H4ZM8.2 22H15.8V20H8.2V22ZM20 17.8V9H18V17.8H20ZM19.7071 8.29289L13.7071 2.29289L12.2929 3.70711L18.2929 9.70711L19.7071 8.29289ZM15.8 22C16.3436 22 16.8114 22.0008 17.195 21.9694C17.5904 21.9371 17.9836 21.8658 18.362 21.673L17.454 19.891C17.4045 19.9162 17.3038 19.9539 17.0322 19.9761C16.7488 19.9992 16.3766 20 15.8 20V22ZM18 17.8C18 18.3766 17.9992 18.7488 17.9761 19.0322C17.9539 19.3038 17.9162 19.4045 17.891 19.454L19.673 20.362C19.8658 19.9836 19.9371 19.5904 19.9694 19.195C20.0008 18.8114 20 18.3436 20 17.8H18ZM18.362 21.673C18.9265 21.3854 19.3854 20.9265 19.673 20.362L17.891 19.454C17.7951 19.6422 17.6422 19.7951 17.454 19.891L18.362 21.673ZM4 17.8C4 18.3436 3.99922 18.8114 4.03057 19.195C4.06287 19.5904 4.13419 19.9836 4.32698 20.362L6.10899 19.454C6.0838 19.4045 6.04612 19.3038 6.02393 19.0322C6.00078 18.7488 6 18.3766 6 17.8H4ZM8.2 20C7.62345 20 7.25117 19.9992 6.96784 19.9761C6.69617 19.9539 6.59545 19.9162 6.54601 19.891L5.63803 21.673C6.01641 21.8658 6.40963 21.9371 6.80497 21.9694C7.18864 22.0008 7.65645 22 8.2 22V20ZM4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673L6.54601 19.891C6.35785 19.7951 6.20487 19.6422 6.10899 19.454L4.32698 20.362ZM8.2 2C7.65645 2 7.18864 1.99922 6.80497 2.03057C6.40963 2.06287 6.01641 2.13419 5.63803 2.32698L6.54601 4.10899C6.59545 4.0838 6.69617 4.04612 6.96784 4.02393C7.25117 4.00078 7.62345 4 8.2 4V2ZM6 6.2C6 5.62345 6.00078 5.25117 6.02393 4.96784C6.04612 4.69617 6.0838 4.59545 6.10899 4.54601L4.32698 3.63803C4.13419 4.01641 4.06287 4.40963 4.03057 4.80497C3.99922 5.18864 4 5.65645 4 6.2H6ZM5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803L6.10899 4.54601C6.20487 4.35785 6.35785 4.20487 6.54601 4.10899L5.63803 2.32698Z"
                      fill="#000000"
                    />
                  </svg>
                </div>
              </div>
            </a>
          </div>
          <div class="col main-card">
            <a href="#">
              <div class="card h-100 card-view view6" style={{backgroundColor: '#DFCCFB'}}>
                <div>
                  <h5 class="card-title text">Unpaid Bills</h5>
                  <h5 class="card-title">No : {stats.unpaid_bill}</h5>
                  <p class="card-text">
                    <small class="text-muted">₹{stats.due_amount}.00 </small>
                  </p>
                </div>
                <div className="Icon-style">
                  <svg
                    fill="#000000"
                    width="60"
                    height="60"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M31,7H1A1,1,0,0,0,0,8V24a1,1,0,0,0,1,1H31a1,1,0,0,0,1-1V8A1,1,0,0,0,31,7ZM25.09,23H6.91A6,6,0,0,0,2,18.09V13.91A6,6,0,0,0,6.91,9H25.09A6,6,0,0,0,30,13.91v4.18A6,6,0,0,0,25.09,23ZM30,11.86A4,4,0,0,1,27.14,9H30ZM4.86,9A4,4,0,0,1,2,11.86V9ZM2,20.14A4,4,0,0,1,4.86,23H2ZM27.14,23A4,4,0,0,1,30,20.14V23Z" />
                    <path d="M7.51.71a1,1,0,0,0-.76-.1,1,1,0,0,0-.61.46l-2,3.43a1,1,0,0,0,1.74,1L7.38,2.94l5.07,2.93a1,1,0,0,0,1-1.74Z" />
                    <path d="M24.49,31.29a1,1,0,0,0,.5.14.78.78,0,0,0,.26,0,1,1,0,0,0,.61-.46l2-3.43a1,1,0,1,0-1.74-1l-1.48,2.56-5.07-2.93a1,1,0,0,0-1,1.74Z" />
                    <path d="M16,10a6,6,0,1,0,6,6A6,6,0,0,0,16,10Zm0,10a4,4,0,1,1,4-4A4,4,0,0,1,16,20Z" />
                  </svg>
                </div>
              </div>
            </a>
          </div>
          <div class="col main-card">
            <a href="#">
              <div class="card h-100 card-view view7" style={{backgroundColor: '#DDDDDD'}}>
                <div>
                  <h5 class="card-title text">PAID BILLS</h5>
                  <h5 class="card-title">No: {stats.paid_bill}</h5>
                  <p class="card-text">
                    <small class="text-muted">₹{stats.gross_sale-stats.due_amount}.00 </small>
                  </p>
                </div>
                <div className="Icon-style">
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 15H8M3 11H21M3 8H21M12 15H16M6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19Z"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </a>
          </div>
          <div class="col main-card">
            <a href="#">
              <div class="card h-100 card-view view8" style={{backgroundColor: '#b7f3c9'}}>
                <div>
                  <h5 class="card-title text">TOTAL CUSTOMERS</h5>
                  <h5 class="card-title">{stats.customer_count}</h5>
                  <p class="card-text">
                    <small class="text-muted">{stats.customer_count} Customers</small>
                  </p>
                </div>
                <div className="Icon-style">
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </a>
          </div>
          
        </div>
        <div className="row row-cols-1 row-cols-md-2 g-2 second_container">
          <div className="col main-card">
            <div className="card text-dark bg-light mb-3">
              <div className="card-header">
                <h5 className="card-title">Top Item by Sales</h5>
              </div>
              <div className="card-body">
                <p className="card-text">No Items</p>
              </div>
            </div>
          </div>
          <div className="col main-card">
            <div className="card text-dark bg-light mb-3">
              <div className="card-header">
                <h5 className="card-title">Top Category by Sales</h5>
              </div>
              <div className="card-body">
                <p className="card-text">No Items</p>
              </div>
            </div>
          </div>
          
        </div></div>
    
      
    
  );
}

export default Dashboard;
