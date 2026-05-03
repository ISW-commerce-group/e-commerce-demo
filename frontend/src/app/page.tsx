import Image from "next/image"
import CategoryCard from "@/components/CategoryCard"
import ReviewSlider from "@/components/ReviewSlider"
import { categories } from "@/data/categories"
export default function Home() {
  return (
  <div>
    
        <div>
            <div data-w-id="2be7e308-98c8-825a-0843-b2a20f7ca9e7" className="container grid">
                <div className="grid-wrapper-left">
                    <div className="content sticky-up_80px">
                        <div id="w-node-_2be7e308-98c8-825a-0843-b2a20f7ca9ea-d3d1eb7f" className="hero-row1">
                            <div className="margin-botton-16">
                                <div className="wrapper-overflow_hidden">
                                    <h1 data-w-id="2be7e308-98c8-825a-0843-b2a20f7ca9ed">Kyiv</h1>
                                </div>
                                <div className="layout-children_wrap">
                                    <h1 data-w-id="2be7e308-98c8-825a-0843-b2a20f7ca9f0">Luxe</h1>
                                    <h1 data-w-id="2be7e308-98c8-825a-0843-b2a20f7ca9f2">
                                        Bouquets<sup className="superscript">®</sup>
                                    </h1>
                                </div>
                            </div>
                            <div data-w-id="2be7e308-98c8-825a-0843-b2a20f7ca9f6" className="subtitle weight-regular">
                                Discover Uniquely Crafted Bouquets and Gifts for Any Occasion: Spread Joy with Our <span className="italic">Online Flower Delivery Service</span>
                            </div>
                        </div>
                        <div data-w-id="2be7e308-98c8-825a-0843-b2a20f7ca9f8" className="hero-row2">
                            <div data-w-id="2be7e308-98c8-825a-0843-b2a20f7ca9f9" className="column_decor">
                                <Image src="https://cdn.prod.website-files.com/6400d82951450021c2d1eb7b/64a03d676a877d080695084a_ewddewd%201.webp" loading="lazy" width={200} height={200} alt="" className="img_height-200px"/>
                                <div data-w-id="2be7e308-98c8-825a-0843-b2a20f7ca9fb" className="background_white-absolute"></div>
                            </div>
                            <div className="column_decor2">
                                <div data-w-id="2be7e308-98c8-825a-0843-b2a20f7ca9fd" className="caption-small">Experience the joy of giving with our modern floral studio. Order online and send fresh flowers, plants and gifts today.</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid-wrapper-right">
                    <section className="shop_category">
                        {categories.map((category, index) => (
                            <div
                            key={category.id}
                            className={
                                index % 2 === 0
                                ? "grid-wrapper-right"
                                : "grid-wrapper-left"
                            }
                            >
                            <CategoryCard
                                category={category}
                                invert={index % 2 !== 0}
                            />
                            </div>
                        ))}
                    </section>
                </div>
            </div>
        </div>
        <div>
            <div className="container grid">
                <div className="grid-wrapper-left white">
                    <div className="content sticky-up_80px">
                        <div className="wrapper-overflow_hidden">
                            <h2 className="h2-scroll_animat">About us</h2>
                        </div>
                    </div>
                </div>
                <div className="grid-wrapper-right white">
                    <div className="content">
                        <div className="wrapper-overflow_hidden margin-bottom-24px">
                            <div data-w-id="56a9b6ec-a780-a3e9-f83a-81986785e658" className="overline-scroll_animat overline">our story</div>
                        </div>
                        <div className="wrapper-overflow_hidden margin-botton-16">
                            <h3 className="h3-scroll_animat">Kyiv LuxeBouquets
                            
                            </h3>
                        </div>
                        <div className="wrapper-overflow_hidden margin-botton-64">
                            <p className="scroll_anim-text black-90">We are a modern local floral studio, which specializes in the design and delivery of unique bouquets. We have the best florists who carefully select each look, our studio cooperates directly with farms for growing different flowers, so we always have fresh flowers, which are collected by our florists in exquisite bouquets. We have a collection of fresh bouquets, collections of dried bouquets, house plants, as well as fragrant candles from luxury brands to create the perfect atmosphere. Make someone &#x27;s day amazing by sending flowers, plants and gifts the same or next day. Ordering flowers online has never been easier.</p>
                        </div>
                        <div className="control-width-of-the-button">
                            <a data-w-id="488af526-2c8f-73c1-1e83-9c0bac31e46b" href="/about-us" className="second_button w-inline-block">
                                <div className="wrap-button_text">
                                    <div className="button_text">Learn More</div>
                                    <div className="button_text hide-mobile">Learn More</div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div className="container grid">
                <div className="grid-wrapper-left">
                    <div className="content sticky-up_80px">
                        <div className="wrapper-overflow_hidden">
                            <h2 className="h2-scroll_animat">Why choose us ?</h2>
                        </div>
                    </div>
                </div>
                <div className="grid-wrapper-right">
                    <div className="grid-row">
                        <div className="content white">
                            <div className="wrapper-overflow_hidden margin-botton-16">
                                <h3 className="h3-scroll_animat">Stylish bouquets by florists</h3>
                            </div>
                            <div className="wrapper-overflow_hidden">
                                <p className="scroll_anim-text black-90">At our floral studio, our professional florists craft the most elegant and stylish bouquets using only the freshest and highest quality materials available. We stay up-to-date with the latest floral design trends and offer unique arrangements that are sure to impress. Let us brighten up your day with our stunning bouquets and same-day delivery service.</p>
                            </div>
                        </div>
                        <div className="content white">
                            <div className="wrapper-overflow_hidden margin-botton-16">
                                <h3 className="h3-scroll_animat">On-time delivery</h3>
                            </div>
                            <div className="wrapper-overflow_hidden">
                                <p className="scroll_anim-text black-90">Never miss a moment with our on-time flower delivery service. Our couriers will deliver your bouquet personally, without boxes, to ensure it arrives in perfect condition. Trust us to deliver your thoughtful gift reliably.</p>
                            </div>
                        </div>
                        <div className="content white">
                            <div className="wrapper-overflow_hidden margin-botton-16">
                                <h3 className="h3-scroll_animat">Safe payment</h3>
                            </div>
                            <div className="wrapper-overflow_hidden">
                                <p className="scroll_anim-text black-90">You can feel secure when placing an order with us, as we use industry-standard security measures to protect your payment information. Your transaction will be safe and hassle-free, so you can shop with confidence.</p>
                            </div>
                        </div>
                        <div className="content white">
                            <div className="wrapper-overflow_hidden margin-botton-16">
                                <h3 className="h3-scroll_animat">Subscription by your needs</h3>
                            </div>
                            <div className="wrapper-overflow_hidden">
                                <p className="scroll_anim-text black-90">With our subscription service tailored to your specific needs, you can enjoy the convenience of having beautiful bouquets delivered straight to your door at regular intervals. Our flexible service is perfect for busy individuals or those who want to ensure they always have fresh flowers on hand. You &#x27;ll save time and money with this hassle-free solution to your floral needs.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <section id="contacts-SECTION" data-w-id="33cac0cd-d791-6a2e-bc7e-eb57269fa35f">
            <div className="container grid">
                <div id="w-node-_33cac0cd-d791-6a2e-bc7e-eb57269fa361-d3d1eb7f" className="grid-wrapper-left">
                    <div className="content border-b">
                        <div className="wrapper-overflow_hidden margin-bottom-24px">
                            <h2 className="h2-scroll_animat">Let &#x27;s Talk</h2>
                        </div>
                        <div className="wrapper-overflow_hidden">
                            <div className="subtitle weight-regular scroll_anim-text">Enter your number and we &#x27;ll call you back ASAP to help you with any questions or to place an order</div>
                        </div>
                        <div id="call-you-back" className="form-block w-form">
                            <form id="email-form-2" name="email-form-2" data-name="Email Form 2" method="get" className="flex" data-wf-page-id="6400d829514500b4d3d1eb7f" data-wf-element-id="33cac0cd-d791-6a2e-bc7e-eb57269fa36a">
                                <input className="text-field w-input" name="Phone-number-2" data-name="Phone Number 2" placeholder="+380 XX XXX XX XX" type="tel" id="Phone-number-2"/>
                                <a data-w-id="33cac0cd-d791-6a2e-bc7e-eb57269fa36c" href="#" className="primary_button w-inline-block">
                                    <div className="wrap-button_text">
                                        <div className="button_text">Reach us</div>
                                        <div className="button_text hide-mobile">Reach us</div>
                                    </div>
                                </a>
                            </form>
                            <div className="w-form-done">
                                <div>Thank you! Your submission has been received!</div>
                            </div>
                            <div className="w-form-fail">
                                <div>Oops! Something went wrong while submitting the form.</div>
                            </div>
                        </div>
                    </div>
                    <div className="grid">
                        <div className="grid-wrapper-left">
                            <div className="wrap-label-center border-b">
                                <h3 className="align-center">Phone</h3>
                            </div>
                            <div className="wrap-links-fixheight">
                                <a href="#" className="link-icon margin-bottom-24px w-inline-block">
                                    <Image src="https://cdn.prod.website-files.com/6400d82951450021c2d1eb7b/64a2b419cf29328d429a83a1_phone.svg" loading="lazy" width={24} height={24} alt="icon phone" className="icon24 margin-right-4px"/>
                                    <div>+380980099777</div>
                                </a>
                                <a href="#" className="link-icon w-inline-block">
                                    <Image src="https://cdn.prod.website-files.com/6400d82951450021c2d1eb7b/64a2b419cf29328d429a83a1_phone.svg" loading="lazy" width={24} height={24} alt="icon phone" className="icon24 margin-right-4px"/>
                                    <div>+380980099111</div>
                                </a>
                            </div>
                        </div>
                        <div className="grid-wrapper-right">
                            <div className="wrap-label-center border-b">
                                <h3 className="align-center">Address</h3>
                            </div>
                            <div className="wrap-links-fixheight">
                                <div className="overline margin-bottom-24px">opening hours: 8 to 11 p.m.</div>
                                <a href="#" className="link-icon w-inline-block">
                                    <Image src="https://cdn.prod.website-files.com/6400d82951450021c2d1eb7b/64a2b4fa542dd3a61c5e2cf7_pin-bottom.svg" loading="lazy" width={24} height={24} alt="icon map pin" className="icon24 margin-right-4px"/>
                                    <div>15/4 Khreshchatyk Street, Kyiv</div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="w-node-_33cac0cd-d791-6a2e-bc7e-eb57269fa38c-d3d1eb7f" className="grid-wrapper-right">
                    <div className="relative-copy" style={{position:"relative",minHeight:400}}>
                        <Image src="https://cdn.prod.website-files.com/6400d82951450021c2d1eb7b/64a03b42882782a8aa1f0e26_KYIV%20LB%202%20720.webp" loading="lazy" alt="store photo" fill style={{objectFit:"cover"}} sizes="(max-width: 991px) 100vw, 50vw"/>
                        <div className="wrap-position_absolute">
                            <div className="wrap-label-center border-r">
                                <h3>Follow us</h3>
                            </div>
                            <div className="wrap-label-center gap_32px">
                                <a href="#" className="w-inline-block">
                                    <Image src="https://cdn.prod.website-files.com/6400d82951450021c2d1eb7b/6433f820e186e144ecf86c56_Instagram.svg" loading="lazy" width={24} height={24} alt="store photo" className="icon24"/>
                                </a>
                                <a href="#" className="w-inline-block">
                                    <Image src="https://cdn.prod.website-files.com/6400d82951450021c2d1eb7b/6433f753d4f655c8f2bf247e_Pinterest.svg" loading="lazy" width={24} height={24} alt="pinterest icon" className="icon24"/>
                                </a>
                                <a href="#" className="w-inline-block">
                                    <Image src="https://cdn.prod.website-files.com/6400d82951450021c2d1eb7b/6433f753d4f655b80fbf247f_Facebook.svg" loading="lazy" width={24} height={24} alt="facebook icon" className="icon24"/>
                                </a>
                                <a href="#" className="w-inline-block">
                                    <Image src="https://cdn.prod.website-files.com/6400d82951450021c2d1eb7b/6433f814197ec75b715f8e48_Twitter.svg" loading="lazy" width={24} height={24} alt="twitter icon" className="icon24"/>
                                </a>
                                <a href="#" className="w-inline-block">
                                    <Image src="https://cdn.prod.website-files.com/6400d82951450021c2d1eb7b/6433f814197ec7092c5f8e4b_Telegram.svg" loading="lazy" width={24} height={24} alt="telegram icon" className="icon24"/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div>
            <div className="container">
                <div className="content flex-vertical-center-mobile-start">
                    <h2>Our Service</h2>
                </div>
            </div>
        </div>
        <div data-w-id="bcfc3543-bad6-7f34-af16-943bc8578d6a">
            <div className="container grid">
                <div className="grid-wrapper-left">
                    <div className="fix-height">
                        <div className="img_w-h-100-bg_black35"></div>
                    </div>
                </div>
                <div className="grid-wrapper-right">
                    <div className="content flex-vertical-center height-100">
                        <div className="wrapper-overflow_hidden margin-bottom-24px">
                            <div className="overline-scroll_animat overline">service</div>
                        </div>
                        <div className="wrapper-overflow_hidden margin-botton-16">
                            <h2 className="h3-scroll_animat">Flower Subcriptions</h2>
                        </div>
                        <div className="wrapper-overflow_hidden margin-botton-64">
                            <p className="scroll_anim-text text-dark-gray">Experience the convenience and savings of regular flower deliveries with our flexible subscription service - up to 30% more profitable than one-time purchases.</p>
                        </div>
                        <div className="control-width-of-the-button">
                            <a data-w-id="bc3a1376-4e11-981c-0177-a6f5ca405b4d" href="/subscriptions" className="second_button w-inline-block">
                                <div className="wrap-button_text">
                                    <div className="button_text">Subscribe Now</div>
                                    <div className="button_text hide-mobile">Subscribe Now</div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div className="content bg-image">
                <div className="wrapper-spacing_center">
                    <div className="wrapper-overflow_hidden margin-bottom-24px">
                        <div data-w-id="21174a71-d1ea-be38-7929-26d1278e2d20" className="overline text-white scroll_anim-overline">service</div>
                    </div>
                    <div className="wrapper-overflow_hidden margin-botton-16">
                        <h2 data-w-id="21174a71-d1ea-be38-7929-26d1278e2d23" className="text-white scroll_anim-h3">Wedding &amp;Event Decor</h2>
                    </div>
                    <div className="wrapper-overflow_hidden margin-botton-64">
                        <p className="scroll_anim-text text-white">Let our team of expert florists and designers create stunning, on-trend floral décor for your special day. Trust us to bring your vision to life.</p>
                    </div>
                    <div className="control-width-of-the-button">
                        <a data-w-id="1641fd32-4974-df5d-1bd0-9b646ef0907f" href="#" className="tertiary_button w-inline-block">
                            <div className="wrap-button_text">
                                <div className="button_text">Inquire Now</div>
                                <div className="button_text hide-mobile">Inquire Now</div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <ReviewSlider />
        </div>
        
    );
}