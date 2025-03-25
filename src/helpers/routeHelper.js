 const routeHelper = {
    home: "/",
    login: "/login",
    register: "/register",
    doctors:'/doctors',
    staff:'/staff',
    appointments:'/appointments',
    serial:(doctorId,appointment_date,doctor_name,department_name)=>'/serial/'+doctorId+'?appointment_date='+appointment_date+'&doctor_name='+doctor_name+'&department_name='+department_name,
};

export default routeHelper;