import React, { useEffect } from 'react';


function Page() {
    
  return (
    <div>
            {/* Add the favicon */}
        <link rel="icon" href="img/favicon.ico" />

           
      {/* Spinner Start */}
      <div id="spinner" className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}></div>
      </div>
      {/* Spinner End */}

      {/* Navbar Start */}
      <div className="container-fluid bg-white sticky-top">
        <div className="container">
          <nav className="navbar navbar-expand-lg bg-white navbar-light py-2 py-lg-0">
            <a href="index.html" className="navbar-brand">
              <img className="img-fluid" src="img/logo.png" alt="Logo" />
            </a>
            <button type="button" className="navbar-toggler ms-auto me-0" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <div className="navbar-nav ms-auto">
                <a href="index.html" className="nav-item nav-link active">Home</a>
                <a href="about.html" className="nav-item nav-link">About</a>
                <a href="product.html" className="nav-item nav-link">Products</a>
                <a href="store.html" className="nav-item nav-link">Store</a>
                <div className="nav-item dropdown">
                  <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                  <div className="dropdown-menu bg-light rounded-0 m-0">
                    <a href="feature.html" className="dropdown-item">Features</a>
                    <a href="blog.html" className="dropdown-item">Blog Article</a>
                    <a href="testimonial.html" className="dropdown-item">Testimonial</a>
                    <a href="404.html" className="dropdown-item">404 Page</a>
                  </div>
                </div>
                <a href="contact.html" className="nav-item nav-link">Contact</a>
              </div>
              <div className="border-start ps-4 d-none d-lg-block">
                <button type="button" className="btn btn-sm p-0"><i className="fa fa-search"></i></button>
              </div>
            </div>
          </nav>
        </div>
      </div>
      {/* Navbar End */}

      {/* Carousel Start */}
      <div className="container-fluid px-0 mb-5">
        <div id="header-carousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="w-100" src="img/carousel-1.jpg" alt="Image" />
              <div className="carousel-caption">
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-lg-7 text-center">
                      <p className="fs-4 text-white animated zoomIn">Welcome to <strong className="text-dark">TEA House</strong></p>
                      <h1 className="display-1 text-dark mb-4 animated zoomIn">Organic & Quality Tea Production</h1>
                      <a href="" className="btn btn-light rounded-pill py-3 px-5 animated zoomIn">Explore More</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img className="w-100" src="img/carousel-2.jpg" alt="Image" />
              <div className="carousel-caption">
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-lg-7 text-center">
                      <p className="fs-4 text-white animated zoomIn">Welcome to <strong className="text-dark">TEA House</strong></p>
                      <h1 className="display-1 text-dark mb-4 animated zoomIn">Organic & Quality Tea Production</h1>
                      <a href="" className="btn btn-light rounded-pill py-3 px-5 animated zoomIn">Explore More</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#header-carousel"
            data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#header-carousel"
            data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      {/* Carousel End */}

      {/* Article Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-5 wow fadeIn" data-wow-delay="0.1s">
              <img className="img-fluid" src="img/article.jpg" alt="" />
            </div>
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
              <div className="section-title">
                <p className="fs-5 fw-medium fst-italic text-primary">Featured Acticle</p>
                <h1 className="display-6">The history of tea leaf in the world</h1>
              </div>
              <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
              <p className="mb-4">Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna. Tempor erat elitr rebum at clita.</p>
              <a href="" className="btn btn-primary rounded-pill py-3 px-5">Read More</a>
            </div>
          </div>
        </div>
      </div>
      {/* Article End */}

      {/* Video Start */}
      <div className="container-fluid video my-5">
        <div className="container">
          <div className="row g-0">
            <div className="col-lg-6 py-5 wow fadeIn" data-wow-delay="0.1s">
              <div className="py-5">
                <h1 className="display-6 mb-4">Tea is a drink of <span className="text-white">health</span> and <span className="text-white">taste</span>.</h1>
                <a href="https://www.youtube.com/watch?v=0zvKc9eEJ20" className="btn btn-lg btn-primary rounded-pill py-3 px-5" target="_blank">Play Video</a>
              </div>
            </div>
            <div className="col-lg-6 video-bg wow fadeIn" data-wow-delay="0.5s">
              <img src="img/video.jpg" className="img-fluid" alt="Video" />
            </div>
          </div>
        </div>
      </div>
      {/* Video End */}

      {/* Blog Start */}
      <div className="container py-5">
        <div className="section-title text-center mb-5">
          <p className="fs-5 fw-medium text-primary">Latest Articles</p>
          <h2 className="display-6">From Our Blog</h2>
        </div>
        <div className="row g-5">
          <div className="col-lg-4 wow fadeIn" data-wow-delay="0.1s">
            <div className="card border-0">
              <img src="img/blog-1.jpg" className="card-img-top" alt="..." />
              <div className="card-body">
                <a href="" className="text-primary">Article</a>
                <h5 className="card-title mt-2"><a href="" className="text-dark">The most delicious tea you can find in the market</a></h5>
                <p className="card-text">Amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
                <a href="" className="btn btn-link">Read More</a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 wow fadeIn" data-wow-delay="0.3s">
            <div className="card border-0">
              <img src="img/blog-2.jpg" className="card-img-top" alt="..." />
              <div className="card-body">
                <a href="" className="text-primary">Article</a>
                <h5 className="card-title mt-2"><a href="" className="text-dark">Discovering the best tea leaves in the world</a></h5>
                <p className="card-text">Amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
                <a href="" className="btn btn-link">Read More</a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 wow fadeIn" data-wow-delay="0.5s">
            <div className="card border-0">
              <img src="img/blog-3.jpg" className="card-img-top" alt="..." />
              <div className="card-body">
                <a href="" className="text-primary">Article</a>
                <h5 className="card-title mt-2"><a href="" className="text-dark">The art of brewing the perfect cup of tea</a></h5>
                <p className="card-text">Amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
                <a href="" className="btn btn-link">Read More</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Blog End */}

      {/* Footer Start */}
      <div className="container-fluid bg-primary">
        <div className="container">
          <div className="row py-5">
            <div className="col-lg-3">
              <h5 className="mb-4 text-white">Contact Info</h5>
              <p className="text-white">123, New Lenox, Chicago, IL - 60606</p>
              <p className="text-white">info@example.com</p>
              <p className="text-white">+1 123-456-7890</p>
            </div>
            <div className="col-lg-3">
              <h5 className="mb-4 text-white">Quick Links</h5>
              <ul className="list-unstyled">
                <li><a href="" className="text-white">Home</a></li>
                <li><a href="" className="text-white">About</a></li>
                <li><a href="" className="text-white">Products</a></li>
                <li><a href="" className="text-white">Store</a></li>
                <li><a href="" className="text-white">Contact</a></li>
              </ul>
            </div>
            <div className="col-lg-3">
              <h5 className="mb-4 text-white">About</h5>
              <p className="text-white">Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
            </div>
            <div className="col-lg-3">
              <h5 className="mb-4 text-white">Subscribe</h5>
              <form action="">
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Email" />
                </div>
                <div className="mb-3">
                  <button type="submit" className="btn btn-light rounded-pill py-2 px-4">Subscribe</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Footer End */}

      {/* Back to Top */}
      <a href="#" className="btn btn-lg btn-primary rounded-circle back-to-top"><i className="fa fa-angle-up"></i></a>
    </div>
  );
}

export default Page;
