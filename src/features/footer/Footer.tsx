import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const cards = [
    "/images/payment_icons/american-express-curved-32px.png",
    "/images/payment_icons/discover-curved-32px.png",
    "/images/payment_icons/maestro-curved-32px.png",
    "/images/payment_icons/visa-curved-32px.png",
    "/images/payment_icons/western-union-curved-32px.png",
    "/images/payment_icons/sagepay-curved-32px.png",
    "/images/payment_icons/paypal-curved-32px.png",
  ];
  return (
    <div className="flex flex-col justify-center gap-12 bg-black text-neutral-200 h-[50vh] p-12">
      <div className="flex">
        <div className="flex flex-col w-full gap-8">
          <div className="flex flex-col gap-4">
            <h5 className="text-lg tracking-widest font">
              PRODUCT RELEASE NEWS
            </h5>
            <p className="w-85">
              Subscrube to get the latest new on upcoming products from BBC
            </p>
            <form action="" className="flex border-b-2 w-fit pb-2">
              <input type="text" placeholder="Enter your email" />
              <button>Subscribe</button>
            </form>
          </div>
          <div>
            <span>socials</span>
          </div>
        </div>

        <ul className="flex flex-col gap-2 w-full">
          <li>
            <Link href="/policies/shipping-policy">Terms of Service</Link>
          </li>
          <li>
            <Link href="/returns">Privacy Policy</Link>
          </li>
          <li>
            <Link href="/policies/refund-policy">
              Do not sell my personal information
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex">
        <ul className="flex flex-col gap-2 w-full">
          <li>
            <Link href="/policies/shipping-policy">Shippings Policy</Link>
          </li>
          <li>
            <Link href="/returns">Returns Portal</Link>
          </li>
          <li>
            <Link href="/policies/refund-policy">
              Returns and Exchanges Policy
            </Link>
          </li>
        </ul>
        <ul className="flex flex-col gap-2 w-full">
          <li>
            <Link href="/careers">Careers</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </div>
      <div className="flex justify-center gap-2">
        {cards.map((card) => (
          <Image key={card} src={card} width={34} height={0} alt="card" />
        ))}
      </div>
      <span className="text-center block text-sm">2025 BBC Apparel USA</span>
    </div>
  );
};

export default Footer;
