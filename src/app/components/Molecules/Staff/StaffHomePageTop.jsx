
'use client'
import Link from 'next/link'
import routeHelper from '@/helpers/routeHelper'

export default function StaffHomePageTop() {
  return (
    <>
        <div className="tiny-slider-one-wrapper">
      <div className="tiny-slider-one">
        {/*-- Single Hero Slide */}
        <div>
          <div className="single-hero-slide bg-overlay"  style={{
        backgroundImage: "url('/img/bg-img/hero1.jpg')"
      }}>
            <div className="h-100 d-flex align-items-center text-center">
              <div className="container">
                <h3 className="text-white mb-1">Welcome to Medicare Pro</h3>
                <p className="text-white mb-4">Staff Home Page</p>
                <div className="d-flex align-items-center justify-content-center gap-2">
                  
                {/* <Link href={routeHelper.doctors} className="p-2 bg-orange-400 text-white rounded font-bold">Doctor List</Link>
                <Link href={routeHelper.home} className="p-2 bg-blue-400 text-white rounded font-bold">Appointments</Link><Link href={routeHelper.home} className="p-2 bg-green-400 text-white rounded font-bold">Serial</Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>

      
      </div>
    </div>

    </>
  )
}
