import React from 'react';
import shoppingcart from './imgs/shoppingcart.png';
import discount from './imgs/discount.png';
import pricetag from './imgs/pricetag.png';
import receipt from './imgs/receipt.png';
import '../index.css'




const Prompt = ({ id, schoolInfo, netPrice }) => {
  let school_info = [];
  let school_name = "";
  let school_state = "";
  let school_city = "";
  let tuition_fee_num = 0;
  let total_retail_price = 0;
  let room_supplies_fees = 0;
  let discount_fee_num = 0;
  let netPrice_num = 0;
  let currency_options = {};
  if (id === 1) {
    school_info = schoolInfo.address.split(',');
    school_name = school_info[0];
    school_state = school_info[1];
    school_city = school_info[2];
    tuition_fee_num = schoolInfo.tuition;
    total_retail_price = schoolInfo.fee;
    room_supplies_fees = total_retail_price - tuition_fee_num
    currency_options = { style: 'currency', currency: 'USD'};
  }

  if (id === 3) {
    school_info = schoolInfo.address.split(',');
    school_name = school_info[0];
    school_state = school_info[1];
    school_city = school_info[2];
    tuition_fee_num = schoolInfo.tuition;
    total_retail_price = schoolInfo.fee;
    room_supplies_fees = total_retail_price - tuition_fee_num
    netPrice_num = netPrice
    discount_fee_num = total_retail_price - netPrice_num
    currency_options = { style: 'currency', currency: 'USD', maximumFractionDigits: 0 };
  }
  return (
    <div className='prompt'>
      {id == 0 &&
        <div>
          <p>Tution is only the sticker price - you might be eligible for a big discount! Estimate the <span style={{ fontWeight: 'bold', fontStyle: 'italic' }}>real</span> costs of college, for schools acroos the country.</p>
          <img src={shoppingcart} className='img' />
        </div>
      }
      {id == 1 &&
        <div className="price-tag-div">
          <div id="school-div">
            <p id="school-text">SCHOOL</p>
            <p id="school-name">{school_name.toLocaleUpperCase('en-US')}</p>
            <p id="school-address">{school_city.toLocaleUpperCase('en-US') + ", " + school_state.toLocaleUpperCase('en-US')}</p>
          </div>

          <div id="tuition-div">
            <p id="tuition-text">TUITION</p>
            <p id="tution-fee">{tuition_fee_num.toLocaleString('en-US', currency_options)}</p>
          </div>

          <div id="room-supplies-div">
            <p id="room-supplies-text">ROOM AND BOARD, FEES, SUPPLIES</p>
            <p id="room-supplies-fee">{room_supplies_fees.toLocaleString('en-US', currency_options)}</p>
          </div>

          <hr id="total-price-delim" />
          <div id="total-price-div">

            <p id="total-price-text">TOTAL RETAIL PRICE**</p>
            <p id="total-price-fee">{total_retail_price.toLocaleString('en-US', currency_options)}</p>
          </div>
        </div>
      }
      {id == 2 &&
        <div>
          <p>Remember, tution is only the sticker price - you might be eligible for a big discount! <br /><br />Let's see if you qualify for any discounts.</p>
          <img src={discount} className='img' />
        </div>
      }
      {id == 3 &&
        <div className="receipt-div">
          <div id="receipt-school-div">
            <p id="receipt-school-name">{school_name.toLocaleUpperCase('en-US')}</p>
            <p id="receipt-school-address">{school_city.toLocaleUpperCase('en-US') + ", " + school_state.toLocaleUpperCase('en-US')}</p>
          </div>

          <hr id="receipt-invoice-upper-delim" />
          <div id="receipt-invoice">
            <div id="receipt-invoice-descriptions">
              <span id="receipt-invoice-descriptions-qty">QTY</span>
              <span id="receipt-invoice-descriptions-des">DESCRIPTION</span>
              <span id="receipt-invoice-descriptions-amt">AMOUNT</span>
            </div>
          </div>

          <hr id="receipt-invoice-lower-delim" />

          <div id="receipt-tution-row">
            <span id="receipt-tution-row-tution-qty">1</span>
            <span id="receipt-tution-row-tution-text">TUITION</span>
            <span id="receipt-tution-row-tution-num">{tuition_fee_num.toLocaleString('en-US', currency_options)}</span>
          </div>

          <div id="receipt-supplies-row">
            <span id="receipt-supplies-row-qty">1</span>
            <span id="receipt-supplies-row-text">FEES, SUPPLIES AND LIVING EXPENSES</span>
            <span id="receipt-supplies-row-num">{room_supplies_fees.toLocaleString('en-US', currency_options)}</span>
          </div>

          <div id="receipt-subtotal-row">
            <span id="receipt-subtotal-row-text">SUBTOTAL</span>
            <span id="receipt-subtotal-row-number">{total_retail_price.toLocaleString('en-US', currency_options)}</span>
          </div>

          <hr id="receipt-invoice-end-delim" />

          <div id="receipt-discount-row">
            <span id="receipt-discount-text">DISCOUNT</span>
            <span id="receipt-discount">{"-" + discount_fee_num.toLocaleString('en-US', currency_options)}</span>
          </div>

          <div id="receipt-total-row">
            <span id="receipt-total-row-text">TOTAL</span>
            <span id="receipt-total-row-num">{netPrice_num.toLocaleString('en-US', currency_options) + "*"}</span>
          </div>

          <div id="receipt-prompts">

            <p id="receipt-prompts-first-paragraph"><span id="receipt-prompts_asterisk">*</span>This estimate is based on actual costs for families that received federal aid or loans by applying with the FAFSA form. It always pays to ask for a discount!</p>

            <p id="receipt-prompts-second-paragraph">Cost includes tuition, living costs, books and supplies, and fees minus the average grants and scholarships for federal financial aid recipients.</p>

            <p id="receipt-prompts-third-paragraph">Depending on the federal, state, or institutional grant aid available, students in your income bracket may pay more or less than the overall average costs.</p>
          </div>
        </div>
      }
    </div>
  )
}

export default Prompt
