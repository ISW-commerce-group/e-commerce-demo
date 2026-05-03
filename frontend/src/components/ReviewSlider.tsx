"use client";

import { useState } from "react";

const reviews = [
    {
        id: 1,
        text: "Ordered flowers online and they were the best bouquet! Impressed everyone around. Highly recommend this flower shop!",
        author: "Ronald Richards",
    },
    {
        id: 2,
        text: "Flower subscriptions revolutionized my Kiev hotel! Conveniently customize and receive fresh bouquets regularly. Highly recommended for hassle-free floral arrangements!",
        author: "Leonid Yurushev",
    },
    {
        id: 3,
        text: "The bouquet arrived fresh and beautifully arranged. The attention to detail and quality of the flowers exceeded my expectations. Will order again!",
        author: "Maria Kovalenko",
    },
];

export default function ReviewSlider() {
    const [current, setCurrent] = useState(0);

    const prev = () =>
        setCurrent((c) => (c === 0 ? reviews.length - 1 : c - 1));
    const next = () =>
        setCurrent((c) => (c === reviews.length - 1 ? 0 : c + 1));

    return (
        <div>
            <div className="container">
                <div className="content">
                    <div className="slider_reviews w-slider">

                        {/* Google logo + label */}
                        <div className="margin-bottom-8px">
                            <img
                                alt="google logo"
                                loading="lazy"
                                src="https://cdn.prod.website-files.com/6400d82951450021c2d1eb7b/644c14578243042ce032ac85_google%20logo.png"
                            />
                        </div>
                        <div className="overline margin-bottom-24px">Reviews</div>
                        <h2 className="margin-botton-16">Our Clients say</h2>

                        {/* Active review */}
                        <div className="slider_mask-reviws w-slider-mask">
                            <div className="w-slide">
                                <div className="flex-vertical-center">
                                    <div className="margin-botton-40">
                                        <p className="h3-className italic black90">
                                            "{reviews[current].text}"
                                        </p>
                                        <div className="subtitle black90">
                                            – {reviews[current].author}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Arrows */}
                        <button
                            onClick={prev}
                            className="left-arrow-hide-low-desktop w-slider-arrow-left"
                            aria-label="Previous review"
                            style={{ background: "none", border: "none", cursor: "pointer" }}
                        >
                            <img
                                alt="arrow left"
                                loading="lazy"
                                src="https://cdn.prod.website-files.com/6400d82951450021c2d1eb7b/6434481dccb1e1252385d9bb_arrow_back_ios_FILL0_wght300_GRAD0_opsz40.svg"
                                className="icon-32x32"
                            />
                        </button>
                        <button
                            onClick={next}
                            className="right-arrow-hide-low-desktop w-slider-arrow-right"
                            aria-label="Next review"
                            style={{ background: "none", border: "none", cursor: "pointer" }}
                        >
                            <img
                                alt="arrow right"
                                loading="lazy"
                                src="https://cdn.prod.website-files.com/6400d82951450021c2d1eb7b/6434481dccb1e17ec585d9ba_arrow_forward_ios_FILL0_wght300_GRAD0_opsz40.svg"
                                className="icon-32x32"
                            />
                        </button>

                        {/* Dot navigation */}
                        <div
                            className="slide-nav-visible-low-desktop margin-botton-40 w-slider-nav w-slider-nav-invert w-round"
                            style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 16 }}
                        >
                            {reviews.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrent(i)}
                                    aria-label={`Go to review ${i + 1}`}
                                    style={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: "50%",
                                        border: "none",
                                        cursor: "pointer",
                                        background: i === current ? "#000" : "#ccc",
                                        padding: 0,
                                        transition: "background 0.2s",
                                    }}
                                />
                            ))}
                        </div>

                        {/* Read reviews button */}
                        <div className="control-width-of-the-button-copy">
                            <a href="#" className="second_button w-inline-block">
                                <div className="wrap-button_text">
                                    <div className="button_text">Read reviews</div>
                                    <div className="button_text hide-mobile">Read reviews</div>
                                </div>
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}