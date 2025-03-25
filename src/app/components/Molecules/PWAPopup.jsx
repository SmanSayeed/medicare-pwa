import React from 'react'

export default function PWAPopup({close}) {
  return (
    <>
   {/*-- Welcome Toast */}
   <div className="toast toast-autohide custom-toast-1 toast-primary home-page-toast shadow" role="alert" aria-live="assertive" aria-atomic="true"
    data-bs-delay="60000" data-bs-autohide="true" id="installWrap">
      <div className="toast-body p-4">
        <div className="toast-text me-2">
          <h6 className="text-white">Welcome to Medicar Pro!</h6>
          <span className="d-block mb-2">Click the <strong>Install Now</strong> button & enjoy it just like an
            app.</span>
          <button id="installAffan" className="btn btn-sm btn-warning">Install Now</button>
        </div>
      </div>
      <button className="btn btn-close btn-close-white position-absolute p-2" type="button" data-bs-dismiss="toast"
        aria-label="Close" onClick={close}></button>
    </div>
    </>
  )
}
