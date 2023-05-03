import React from 'react'
import './orderStatus.css'

const OrderStatus = () => {
  return (
    <div className='tutor_dashboard_page_order_status'>
        <div className='order_status_filter_wrapper'>

          <div className='active_order_status'>Active orders - 1 ($100)</div>
          <div className='option_wrapper'>
            <select>
            <option value={"active"}>Active orders</option>
            <option value={"progress"}>In progress</option>
            <option value={"completed"}>Completed</option>
            <option value={"canceled"}>Canceled</option>
            </select>
          </div>
        </div>
        <div></div>
    </div>
  )
}

export default OrderStatus;