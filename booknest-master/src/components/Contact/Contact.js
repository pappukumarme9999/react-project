// import TopBar from "../Topbar/topbar";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Contact() {
  return (
    <>
      <Header />

      <div className="breadcrumbs-area mb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumbs-menu">
                <ul>
                  <li>
                    <a href="#">Home</a>
                  </li>
                  <li>
                    {" "}
                    <a href="#" className="active">
                      contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="contact-area mb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-12">
              <div className="contact-info">
                <h3>Contact info</h3>
                <ul>
                  <li>
                    <i className="fa fa-map-marker"></i>
                    <span>Address: </span> Your address goes here.
                  </li>
                  <li>
                    <i className="fa fa-envelope"></i>
                    <span>Phone: </span> (800) 0123 4567 890
                  </li>
                  <li>
                    <i className="fa fa-mobile"></i>
                    <span>Email: </span>
                    <a href="#">demo@example.com</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <div className="contact-form">
                <h3>
                  <i className="fa fa-envelope-o"></i>Leave a Message
                </h3>
                <form id="contact-form" action="mail.php" method="post">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="single-form-3">
                        <input name="name" type="text" placeholder="Name" />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="single-form-3">
                        <input name="email" type="email" placeholder="Email" />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="single-form-3">
                        <input
                          name="subject"
                          type="text"
                          placeholder="Subject"
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="single-form-3">
                        <textarea
                          name="message"
                          placeholder="Message"
                        ></textarea>
                        <button className="submit" type="submit">
                          SEND MESSAGE
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                <p className="form-messege"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
<div className="map-area mb-70">
<div className="container">
  <div className="row">
    <div className="col-lg-12">
      <div id="googleMap">

      </div>
    </div>
  </div>
</div>
</div>
