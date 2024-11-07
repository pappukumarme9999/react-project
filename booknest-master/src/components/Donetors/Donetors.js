import { useEffect, useState } from "react";
import "../Donetors.css"
import axios from "../../Interceptor.js";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import { apiEndPoint } from "../../WebApi/WebApi.js";
function Donetors() {
    const [donetors, setDonetors] = useState(null);
    const findDonetors = async () => {
        try {
            let response = await axios.get(apiEndPoint.DONETORS);
            setDonetors(response.data.donetors);
        }
        catch (err) {
        }
    }

    useEffect(() => {
        findDonetors();
    }, [])
    return <div className="team-boxed">
        <Header />
        <div
            className="container">
            <div className="intro">
                <h2 className="text-center">TOP DONETORS </h2>
                <p className="text-center aboutDonetors">
                    Donating books is a great way to help others. You can donate books
                    through many organizations that support literacy and education. Whether
                    you’re looking for a way to help your local library
                </p>
            </div>
            <div className="row">
                {donetors?.map((donetor, index) =>
                    <section key={index} className="mx-auto my-5" style={{ maxWidth: "20rem" }}>
                        <div className="card testimonial-card mt-2 mb-3">
                            <div className="card-up aqua-gradient" />
                            <div className="avatar mx-auto white circle">

                                <img
                                    src={
                                        donetor.user.photo.startsWith("data:image")
                                            ? donetor.user.photo
                                            : `data:image/jpeg;base64,${apiEndPoint.DISK_STORAGE}${donetor.user.photo.split("@")[1] || donetor.user.photo}`
                                    }
                                    className="rounded-circle img-fluid"
                                    alt="user avatar"
                                />

                            </div>
                            <div className="card-body text-center">
                                <h4 className="card-title font-weight-bold">{donetor.user.name}</h4>
                                <hr />
                                <p>
                                    <i className="fas fa-quote-left" /> Lorem ipsum dolor sit amet,
                                    consectetur adipisicing elit. Eos, adipisci
                                </p>
                            </div>
                        </div>
                    </section>)}
            </div >
        </div >
        <Footer />
    </div >
}

export default Donetors;
