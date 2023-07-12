import React, { Component } from "react";
import { ReactComponent as IconPersonSquare } from "bootstrap-icons/icons/person-square.svg";
import { ReactComponent as IconReceiptCutoff } from "bootstrap-icons/icons/receipt-cutoff.svg";
import { ReactComponent as IconCalculator } from "bootstrap-icons/icons/calculator.svg";
import { ReactComponent as IconCart3 } from "bootstrap-icons/icons/cart3.svg";

class SupportView extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <div className="container pt-3 mb-3">
          <div className="row gx-3">
            <div className="col-md-6 card mb-3">
              <div className="text-center py-2">
                <IconPersonSquare className="i-va display-6 text-info" width={40} height={40} />
                <div className="fw-bold py-2">My Account</div>
              </div>
              <div class="accordion">
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#c11" aria-expanded="false" aria-controls="c11">
                      Profile Management
                    </button>
                  </h2>
                  <div id="c11" class="accordion-collapse collapse " aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      Learn how to update and manage your account profile, including personal information, contact details, and notification preferences.
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#c12" aria-expanded="false" aria-controls="c12">
                      Password Recovery and Security
                    </button>
                  </h2>
                  <div id="c12" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      Find instructions on how to recover a forgotten password, set up strong account security measures, and protect your account from unauthorized access.
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" >
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#c13" aria-expanded="false" aria-controls="c13">
                      Closure and Data Removal
                    </button>
                  </h2>
                  <div id="c13" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      Understand the process of closing your account, including the permanent deletion of associated data and the implications of this action on your access to our services.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 card mb-3">

              <div className="text-center py-2">
                <IconCalculator className="i-va display-6 text-danger" width={40} height={40} />
                <div className="fw-bold py-2">
                  Accounting & Taxes
                </div>
              </div>
              <div class="accordion">
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#c21" aria-expanded="false" aria-controls="c21">
                      Tax Documentation
                    </button>
                  </h2>
                  <div id="c21" class="accordion-collapse collapse " aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      Learn about the tax documentation and reporting requirements related to your account, including accessing invoices, tax receipts, and other financial records needed for accounting or tax filing purposes.                      </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" >
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#c22" aria-expanded="false" aria-controls="c22">
                      Tax Exemptions and Exceptions
                    </button>
                  </h2>
                  <div id="c22" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      Find information on how to apply for tax exemptions or exceptions if applicable, including the necessary forms, eligibility criteria, and the process involved.                      </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" >
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#c23" aria-expanded="false" aria-controls="c23">
                      Account Statement Reconciliation
                    </button>
                  </h2>
                  <div id="c23" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      Understand the process of reconciling your account statements with your financial records, ensuring accuracy and enabling easier accounting practices for your business or personal finances.                      </div>
                  </div>
                </div>
              </div>

            </div>
            <div className="col-md-6 card">

              <div className="text-center py-2">
                <IconReceiptCutoff className="i-va display-6 text-warning" width={40} height={40} />
                <div className="fw-bold py-2">
                  Charges & Refunds
                </div>
              </div>
              <div class="accordion">
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#c31" aria-expanded="false" aria-controls="c31">
                      Refund Request Process
                    </button>
                  </h2>
                  <div id="c31" class="accordion-collapse collapse " aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      Understand the steps and requirements for submitting a refund request, including the necessary documentation, timelines, and the process of refund issuance.                      </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" >
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#c32" aria-expanded="false" aria-controls="c32">
                      Payment Methods
                    </button>
                  </h2>
                  <div id="c32" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      Discover how to update your payment methods, add or remove credit cards, and modify your billing information to ensure smooth and uninterrupted payment processes.                      </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" >
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#c33" aria-expanded="false" aria-controls="c33">
                      Payment Receipts
                    </button>
                  </h2>
                  <div id="c33" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      Find guidance on accessing and understanding your billing statements, as well as how to obtain payment receipts for your records or reimbursement purposes.                      </div>
                  </div>
                </div>
              </div>

            </div>
            <div className="col-md-6 card">

              <div className="text-center py-2">
                <IconCart3 className="i-va display-6 text-success" width={40} height={40} />
                <div className="fw-bold py-2">Cart</div>
              </div>
              <div class="accordion">
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#c41" aria-expanded="false" aria-controls="c41">
                      Adding Items to Your Cart
                    </button>
                  </h2>
                  <div id="c41" class="accordion-collapse collapse " aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      Learn how to add desired items to your cart for easy and convenient online shopping, including tips on saving items for later or creating wish lists.                      </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" >
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#c42" aria-expanded="false" aria-controls="c42">
                      Managing Items in Your Cart
                    </button>
                  </h2>
                  <div id="c42" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      Discover how to review and modify the items in your cart, including updating quantities, removing unwanted items, or applying promotional codes for discounts.                      </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" >
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#c43" aria-expanded="false" aria-controls="c43">
                      Cart Checkout and Payment
                    </button>
                  </h2>
                  <div id="c43" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      Get step-by-step instructions on how to proceed to the cart checkout process, including selecting preferred shipping options, entering payment details, and confirming your purchase.                      </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </React.Fragment>
    );
  }
}

export default SupportView;
