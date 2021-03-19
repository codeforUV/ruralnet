<style>
  h1,
  figure,
  p {
    text-align: center;
    margin: 0 auto;
  }

  h1 {
    font-size: 2.8em;
    text-transform: uppercase;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  figure {
    margin: 0 0 1em 0;
  }

  img {
    width: 100%;
    max-width: 400px;
    margin: 0 0 1em 0;
  }

  p {
    margin: 1em auto;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
</style>

<svelte:head>
  <title>Sapper project template</title>
</svelte:head>

<!-- BEGIN OF TEMPLATE INSERT-->

<section id="header">
  <div class="container">
    <div class="row">
      <div class="col-md-8 col-md-offset-2 text-center">
        <h1 class="wow fadeInUp">How fast is your internet?</h1>
        <p class="wow fadeInUp" data-wow-delay=".2s">Test your internet speed and compare it to that of other Vermont residents.</p>
        <button class="btn btn-lg video-btn wow fadeInUp lightbox m><i class="fa fa-play"></i> Test Your Speed</button>
        <p class="wow fadeInUp" data-wow-delay=".2s">Learn more (links to about)</p>
      </div>

      <!-- iPhone -->  
      <!-- <img class="header_iphone wow fadeInUp" src="images/header_iphone.png" alt="" data-wow-delay=".4s"> -->
      <!-- //iPhone -->
    </div>
  </div>
</section><!-- //Header -->

<section id="features">
  <div class="container">
  <h2 class="header">Who We Are...What We Do...</h2>
  <p>More info about the project for a user. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores unde, nulla dolore a porro itaque illum omnis iusto recusandae. Ex cumque molestiae, harum reprehenderit animi impedit quam expedita temporibus. Facilis ab, iste quae recusandae exercitationem dignissimos adipisci voluptatibus deserunt corrupti.</p>
  <p>Short blurb and link for other organizations to get more info.</p>
    <div class="row">
      <div class="col-md-6 feature-item">
        <div class="feature wow fadeInUp">
          <div class="f-icon"><i class="lnr lnr-lock"></i></div>
          <div class="f-description">
            <h4>Thing A...if there is one</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum dignissimos voluptatem consequatur in quis provident alias a architecto, sequi, repudiandae, ex eius aperiam nesciunt. Debitis porro adipisci molestias enim natus.</p>
          </div>
        </div>
      </div>
      <div class="col-md-6 feature-item">
        <div class="feature wow fadeInUp" data-wow-delay=".1s">
          <div class="f-icon"><i class="lnr lnr-clock"></i></div>
          <div class="f-description">
            <h4>Thing B...if needed</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat itaque velit delectus accusantium dolor atque ab quidem possimus ut harum dolores suscipit sequi culpa quam, dolore pariatur.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section><!-- //Features -->

<section id="iphone-feature">
  <div class="container">
    <div class="row">
      <div class="col-md-5 col-md-offset-7">
        <h2>
          Test Your Internet Speed
        </h2>
        <p>
          What do we need here? Lorem ipsum dolor sit amet.
        </p>
        <!-- <div class="btns-container">
          <a href="#" class="btn btn-blue">Try to hack us <i class="fa fa-arrow-right"></i></a>
          <a href="#" class="btn">Learn More</a>
        </div> -->
        <button class="btn btn-lg video-btn wow fadeInUp lightbox m><i class="fa fa-play"></i> Test Your Speed</button>
     
      </div>

      <!-- <div class="iphone-showcase wow fadeInLeft">
        <div class="device">
          <img src="images/iphone-feature.png" alt="">
        </div>
      </div> -->
      <!-- //iPhone Showcase -->


    </div>
  </div>
</section><!-- //iPhone Feature -->

<section id="map-feature">
  <div class="container">
    <div class="row">
      <div class="col-md-5">
        <h2>Results</h2>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum, fuga. Nemo earum obcaecati eius expedita!
        </p>
        <!-- <div class="partners">
          <div class="title">Partners</div>
          <ul>
            <li><a href="#"><img src="images/dropbox.png" alt="Dropbox"></a></li>
            <li><a href="#"><img src="images/evernote.png" alt="Dropbox"></a></li>
          </ul>
        </div> -->
      </div>
      <div class="row">
        <div class="col-md-6 feature-item">
          <div class="feature wow fadeInUp">
            <div class="f-icon"><i class="lnr lnr-lock"></i></div>
            <div class="f-description">
              <h4>Term 1...if there is one</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum dignissimos voluptatem consequatur in quis provident alias a architecto, sequi, repudiandae, ex eius aperiam nesciunt. Debitis porro adipisci molestias enim natus.</p>
            </div>
          </div>
        </div>
        <div class="col-md-6 feature-item">
          <div class="feature wow fadeInUp" data-wow-delay=".1s">
            <div class="f-icon"><i class="lnr lnr-clock"></i></div>
            <div class="f-description">
              <h4>Term 2...if needed</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat itaque velit delectus accusantium dolor atque ab quidem possimus ut harum dolores suscipit sequi culpa quam, dolore pariatur.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

      <div class="map-showcase wow fadeInRight">
        <div class="map">
          <img src="images/map.png" alt="">
        </div>
      </div><!-- //Map Showcase -->

    </div>
  </div>
</section><!-- //Map Feature -->

<!-- <section id="iphone-screens">
  <div class="container">
    <div class="row">
      <div class="col-md-12 text-center">
        <h2>Beautiful Interface</h2>
        <hr>
        <p class="subtitle">Landing Screen</p>
      </div>
    </div>
  </div>

  <div class="images-showcase wow fadeIn">
    <ul class="images-list">
      <li>
        <img src="images/interface/img-1.png" alt="">
      </li>
      <li>
        <img src="images/interface/img-2.png" alt="">
      </li>
      <li class="main-img">
        <img src="images/interface/main-img.png" alt="">
      </li>
      <li>
        <img src="images/interface/img-3.png" alt="">
      </li>
      <li>
        <img src="images/interface/img-4.png" alt="">
      </li>
    </ul>
  </div>
  
</section> -->
<!-- //iPhone Screens -->

<!-- <section id="ready-to-buy">
  <div class="container">
    <div class="row">
      <div class="col-md-12 text-center">
        <p class="subtitle">New<span class="f-w-400">Providence</span></p>
        <h2>Get it to your smartphone</h2>
        <form action="">
          <div class="form-group">
            <input type="email" placeholder="Email here">
            <a href="#" class="btn btn-green">Send Invite <i class="fa fa-arrow-right"></i></a>
          </div>
        </form>
        <p class="subtitle">Or Download From</p>
        <div class="download-btn">
          <a href="#" class="btn btn-dark">
            <i class="fa fa-apple"></i>
            <span>
              Dowload on the <br>
              <b>App Store</b>
            </span>
          </a>
        </div>
      </div>
    </div>
  </div>
</section> -->
<!-- //Ready to Buy -->

<!-- <section id="customers">
  <div class="container">
    <div class="row">
      <div id="testimonials-slider">
        <div class="col-md-6 col-md-offset-3 text-center">

          <div class="carousel slide" data-ride="carousel" id="quote-carousel"-->
            <!-- Carousel Slides / Quotes -->
            <!-- <div class="carousel-inner text-center"> -->
              <!-- Bottom Carousel Indicators -->
              <!-- <ol class="carousel-indicators">
                  <li data-target="#quote-carousel" data-slide-to="0" class="active">
                    <img class="img-responsive " src="images/user1.jpg" alt="">
                  </li>
                  <li data-target="#quote-carousel" data-slide-to="1">
                    <img class="img-responsive" src="images/user2.jpg" alt="">
                    <div class="shadow"></div>
                  </li>
                  <li data-target="#quote-carousel" data-slide-to="2">
                    <img class="img-responsive" src="images/user3.jpg" alt="">
                  </li>
              </ol> -->
              

                <!-- Quote 1 -->
                <!-- <div class="item active">
                  <div class="testimonial">
                    <h3>New Providence is the great UI kit</h3>
                    <p>“Just then her head struck against the roof of the hall: in fact she was now more than nine feet high, and she at once took up the little golden key and hurried off to the garden door.”</p>
                    <div class="star-rating">
                      <i class="fa fa-star gold-star"></i>
                      <i class="fa fa-star gold-star"></i>
                      <i class="fa fa-star gold-star"></i>
                      <i class="fa fa-star gold-star"></i>
                      <i class="fa fa-star"></i>
                    </div>
                    <p class="customer-name">Cameron Downman</p>
                  </div>
                </div> -->
                <!-- Quote 2 -->
                <!-- <div class="item">
                  <div class="testimonial">
                    <h3>New Providence is the great UI kit</h3>
                    <p>“Just then her head struck against the roof of the hall: in fact she was now more than nine feet high, and she at once took up the little golden key and hurried off to the garden door.”</p>
                    <div class="star-rating">
                      <i class="fa fa-star gold-star"></i>
                      <i class="fa fa-star gold-star"></i>
                      <i class="fa fa-star gold-star"></i>
                      <i class="fa fa-star gold-star"></i>
                      <i class="fa fa-star"></i>
                    </div>
                    <p class="customer-name">Cameron Downman</p>
                  </div>
                </div> -->
                <!-- Quote 3 -->
                <!-- <div class="item">
                  <div class="testimonial">
                    <h3>New Providence is the great UI kit</h3>
                    <p>“Just then her head struck against the roof of the hall: in fact she was now more than nine feet high, and she at once took up the little golden key and hurried off to the garden door.”</p>
                    <div class="star-rating">
                      <i class="fa fa-star gold-star"></i>
                      <i class="fa fa-star gold-star"></i>
                      <i class="fa fa-star gold-star"></i>
                      <i class="fa fa-star gold-star"></i>
                      <i class="fa fa-star"></i>
                    </div>
                    <p class="customer-name">Cameron Downman</p>
                  </div>
                </div>
            </div> -->

            <!-- Carousel Buttons Next/Prev -->
            <!-- <a data-slide="prev" href="#quote-carousel" class="left carousel-control"><i class="fa fa-chevron-left"></i></a>
            <a data-slide="next" href="#quote-carousel" class="right carousel-control"><i class="fa fa-chevron-right"></i></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section> -->
<!-- //Customers -->
<!-- 
<section id="plan">
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <h2>Choose your perfect plan</h2>
        <p class="subtitle">You are</p>
        <div class="toggle-container cf">
          <div class="switch-toggles">
            <div class="individual">Individual</div>  -->
            <!-- active -->
            <!-- <div class="company">Company</div>
          </div>
        </div>
        <p>
          Thus much I thought proper to tell you in relation to yourself, and to the trust I reposed in you.
        </p>
        <p class="info">Have a bigger team? <a href="#">Let‘s talk</a></p>
      </div>
      <div id="price_tables" class="col-md-7 col-md-offset-1">
        <div class="individual cf">
          <div class="price-table highlighted">
            <div class="table-inner text-center">
              <h3>Starter</h3>
              <span class="price">Free</span>
              <p class="phrase">Build your schedule<br> every day</p>
              <ul class="feature-list">
                <li><i class="fa fa-check"></i> Unlimeted events</li>
                <li><i class="fa fa-check"></i> Connect Dropbox & Evernote</li>
                <li>&nbsp;</li>
              </ul>
              <a href="" class="btn btn-blue">Get Started</a>                
            </div>
          </div>
          <div class="price-table">
            <div class="table-inner text-center">
              <h3>Pro</h3>
              <span class="price">$4.99</span>
              <p class="phrase">Make your life<br> better</p>
              <ul class="feature-list">
                <li><i class="fa fa-check"></i> Unlimeted events</li>
                <li><i class="fa fa-check"></i> Connect Dropbox & Evernote</li>
                <li><i class="fa fa-check"></i> Personal assistant</li>
              </ul>
              <a href="" class="btn btn-blue">Make me a pro</a>                
            </div>
          </div>
        </div> -->
        <!-- /Individual -->

        <!-- <div class="company cf">
          <div class="price-table highlighted">
            <div class="table-inner text-center">
              <h3>Starter</h3>
              <span class="price">Free</span>
              <p class="phrase">Build your schedule<br> every day</p>
              <ul class="feature-list">
                <li><i class="fa fa-check"></i> Unlimeted events</li>
                <li><i class="fa fa-check"></i> Connect Dropbox & Evernote</li>
                <li>&nbsp;</li>
              </ul>
              <a href="" class="btn btn-blue">Get Started</a>                
            </div>
          </div>
          <div class="price-table">
            <div class="table-inner text-center">
              <h3>Pro</h3>
              <span class="price">$4.99</span>
              <p class="phrase">Make your life<br> better</p>
              <ul class="feature-list">
                <li><i class="fa fa-check"></i> Unlimeted events</li>
                <li><i class="fa fa-check"></i> Connect Dropbox & Evernote</li>
                <li><i class="fa fa-check"></i> Personal assistant</li>
              </ul>
              <a href="" class="btn btn-blue">Make me a pro</a>                
            </div>
          </div>
        </div> -->
        <!-- /Company -->
      <!-- </div>
    </div>
  </div>
</section> -->
<!-- //Plan -->

<!-- <section id="subscribe">
  <div class="container">
    <div class="row">
      <div class="col-md-12 text-center">
        <p class="subtitle"></p>
        <h2>Subscribe our newsletters</h2>
        <form action="">
          <div class="form-group">
            <input type="email" placeholder="Email here">
            <a href="#" class="btn btn-green">Subscribe</a>
          </div>
        </form>
        <p class="promise">We promise to never spam you.</p>
      </div>
    </div>
    </div>
  </div>
</section> -->
<!-- //Subscribe -->
<section id="features">
  <div class="container">
  <h2 class="header">What's Next?</h2>
  <p>More info about the project for a user. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores unde, nulla dolore a porro itaque illum omnis iusto recusandae. Ex cumque molestiae, harum reprehenderit animi impedit quam expedita temporibus. Facilis ab, iste quae recusandae exercitationem dignissimos adipisci voluptatibus deserunt corrupti.</p>
  <p>Short blurb and link for other organizations to get more info.</p>
    <div class="row">
      <div class="col-md-6 feature-item">
        <div class="feature wow fadeInUp">
          <div class="f-icon"><i class="lnr lnr-lock"></i></div>
          <div class="f-description">
            <h4>Thing A...if there is one</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum dignissimos voluptatem consequatur in quis provident alias a architecto, sequi, repudiandae, ex eius aperiam nesciunt. Debitis porro adipisci molestias enim natus.</p>
          </div>
        </div>
      </div>
      <div class="col-md-6 feature-item">
        <div class="feature wow fadeInUp" data-wow-delay=".1s">
          <div class="f-icon"><i class="lnr lnr-clock"></i></div>
          <div class="f-description">
            <h4>Thing B...if needed</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat itaque velit delectus accusantium dolor atque ab quidem possimus ut harum dolores suscipit sequi culpa quam, dolore pariatur.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section><!-- //Features -->
<footer id="footer">
  <div class="container footer-container">
    <div class="row">
      <div class="col-md-3">
        <!-- <img class="logo" src="images/logo.png" alt=""> -->
        <p>Little blurby thing?</p>
        <!-- <a href="#" class="app_download"><img src="images/app-store-download.png" alt=""></a> -->
        <ul class="socials">
          <li><a href="#"><i class="fa fa-twitter"></i></a></li>
          <li><a href="#"><i class="fa fa-facebook"></i></a></li>
        </ul>
      </div>
      <div class="col-md-2 col-md-offset-3 col-sm-4 col-xs-6 footer-links">
        <ul>
          <li><p class="title">Learn More</p></li>
          <li><a href="#">How it works?</a></li>
          <li><a href="#">Meeting tools</a></li>
          <li><a href="#">Live striming</a></li>
          <li><a href="#">Contat method</a></li>
        </ul>
      </div>
      <div class="col-md-2 col-sm-4 col-xs-6 footer-links">
        <ul>
          <li><p class="title">About Us</p></li>
          <li><a href="#">About us</a></li>
          <li><a href="#">Features</a></li>
          <li><a href="#">Privacy police</a></li>
          <li><a href="#">Terms & Conditions</a></li>
        </ul>
      </div>
      <div class="col-md-2 col-sm-4 col-xs-6 footer-links">
        <ul>
          <li><p class="title">Support</p></li>
          <li><a href="#">F.A.Q.</a></li>
          <li><a href="#">Contact us</a></li>
          <li><a href="#">Live chat</a></li>
          <li><a href="#">Phone call</a></li>
        </ul>
      </div>
    </div>
  </div>

</footer>

<!-- END OF TEMPLATE INSERT-->