import Link from "next/link";

export default function ThankYouPage() {
    return (
        <div className="container">
            <div className="content">

                <div className="wrapper-overflow_hidden margin-bottom-24px">
                    <div className="overline">order confirmed</div>
                </div>

                <div className="wrapper-overflow_hidden margin-botton-16">
                    <h1>Thank you for your order!</h1>
                </div>

                <div className="wrapper-overflow_hidden margin-botton-64">
                    <p className="subtitle weight-regular black-90">
                        We&apos;ve received your order and are already preparing your bouquet
                        with care. You&apos;ll receive a confirmation shortly.
                    </p>
                </div>

                <div className="border-b margin-botton-64" />

                <div className="wrapper-overflow_hidden margin-bottom-24px">
                    <p className="black-90">
                        Questions? Reach us at{" "}
                        <a href="mailto:hello@kyivluxebouquets.com" className="text-gray">
                            hello@kyivluxebouquets.com
                        </a>
                    </p>
                </div>

                <div className="control-width-of-the-button">
                    <Link href="/" className="primary_button w-inline-block">
                        <div className="wrap-button_text">
                            <div className="button_text">Back to home</div>
                            <div className="button_text hide-mobile">Back to home</div>
                        </div>
                    </Link>
                </div>

            </div>
        </div>
    );
}