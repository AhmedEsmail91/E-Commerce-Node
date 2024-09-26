export function orderEmail(customerName,products){
    return `<section class="vh-100" style="background-color: #35558a;">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100 text-center">
      <div class="col">
        <!-- Button trigger modal -->
        <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-light btn-lg" data-mdb-modal-init
          data-mdb-target="#exampleModal">
          <i class="fas fa-info me-2"></i> Get information
        </button>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
          aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header border-bottom-0">
                <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body text-start p-4">
                <h5 class="modal-title text-uppercase mb-5" id="exampleModalLabel">${customerName}</h5>
                <h4 class="mb-5">Thanks for your order</h4>
                <p class="mb-0">Payment summary</p>
                <hr class="mt-2 mb-4"
                  style="height: 0; background-color: transparent; opacity: .75; border-top: 2px dashed #9e9e9e;">

                <div class="d-flex justify-content-between">
                  
            ${products.map(product=>`
                <div class="d-flex justify-content-between">
                  <p class="fw-bold mb-0">${product.title}(Qty:${product.quantity})</p>
                  <p class="text-muted mb-0">$${product.price}</p>
                </div>
                `)}
              </div>
              <div class="modal-footer d-flex justify-content-center border-top-0 py-4">
                <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-lg mb-1" style="background-color: #35558a;">
                  Track your order
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>`;
}